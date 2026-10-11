// Core helpers: saved state, translation, source search, AI calls.

DH.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

DH.today = function (offsetDays) {
  var d = new Date();
  if (offsetDays) d.setDate(d.getDate() + offsetDays);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

// The streak to show: if the last lesson was before yesterday, the streak is broken.
DH.streakNow = function () {
  var st = DH.store.state;
  if (!st.lastDay || st.lastDay < DH.today(-1)) return 0;
  return st.streak || 0;
};

// ---------- Saved state ----------
// Always kept on this device. If you're logged in, it's also synced to your
// account so it follows you to other devices.
DH.store = {
  KEY: "dharmai-state-v1",
  state: null,
  fresh: function () {
    return {
      prefs: null, courses: [], active: null, progress: {}, xp: 0, streak: 0, lastDay: null,
      ask: [],          // Ask chat
      debate: null,     // current debate: { topic, side, sides, msgs, summary }
      savedDebates: [], // debates saved from lessons for later: { topic, side, from }
      levels: {},       // how well you know each topic, e.g. { calculus: "new" }
      account: null,    // { username, token } when logged in
      updatedAt: 0
    };
  },
  load: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.KEY)); } catch (e) { s = null; }
    this.state = Object.assign(this.fresh(), s || {});
    // Older versions kept one shared chat.
    if (this.state.chat) {
      this.state.ask = this.state.chat.filter(function (m) { return m.mode !== "debate"; });
      delete this.state.chat;
    }
    return this.state;
  },
  // quiet = save locally without syncing (used when the change came from the server).
  save: function (quiet) {
    if (!quiet) this.state.updatedAt = Date.now();
    try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch (e) { }
    if (!quiet) DH.account.pushSoon();
  },
  reset: function () {
    this.state = this.fresh();
    this.save(true);
  },
  // The part of the state that belongs to the account (not the login itself).
  portable: function () {
    var s = Object.assign({}, this.state);
    delete s.account;
    return s;
  }
};

// ---------- Accounts (username + password, no email) ----------
DH.account = {
  timer: null,
  call: function (path, body) {
    var acc = DH.store.state.account;
    var headers = { "Content-Type": "application/json" };
    if (acc && acc.token) headers.Authorization = "Bearer " + acc.token;
    return fetch(DH.config.WORKER_URL.replace(/\/$/, "") + path, { method: "POST", headers: headers, body: JSON.stringify(body || {}) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (r.status === 401 && acc && path.indexOf("/progress") === 0) DH.account.expired();
          if (!r.ok) throw new Error(j.error || ("Something went wrong (" + r.status + ")"));
          return j;
        });
      });
  },
  loggedIn: function () { return !!(DH.store.state.account && DH.store.state.account.token); },
  // After sign-up or login: keep whichever progress is newer and more complete.
  start: function (res) {
    var st = DH.store.state;
    st.account = { username: res.username, token: res.token };
    DH.store.save(true);
    return DH.account.call("/progress/get").then(function (j) {
      var local = DH.store.portable();
      var hasLocal = !!local.prefs;
      if (j.state && j.state.prefs && (!hasLocal || j.state.xp >= local.xp || j.updated > local.updatedAt)) {
        DH.store.state = Object.assign(DH.store.fresh(), j.state, { account: st.account });
        DH.store.save(true);
        return "server";
      }
      if (hasLocal) return DH.account.push().then(function () { return "local"; });
      return "empty";
    });
  },
  // On app start: pick up progress made on another device.
  pull: function () {
    if (!DH.account.loggedIn() || !DH.ai.configured()) return Promise.resolve(false);
    return DH.account.call("/progress/get").then(function (j) {
      if (j.state && j.updated > (DH.store.state.updatedAt || 0)) {
        DH.store.state = Object.assign(DH.store.fresh(), j.state, { account: DH.store.state.account });
        DH.store.save(true);
        return true;
      }
      if (!j.state || j.updated < DH.store.state.updatedAt) DH.account.push();
      return false;
    }).catch(function () { return false; });
  },
  push: function () {
    if (!DH.account.loggedIn()) return Promise.resolve();
    var s = DH.store.portable();
    return DH.account.call("/progress/save", { state: s, updated: s.updatedAt || Date.now() }).catch(function () { });
  },
  pushSoon: function () {
    if (!DH.account.loggedIn()) return;
    clearTimeout(DH.account.timer);
    DH.account.timer = setTimeout(DH.account.push, 1500);
  },
  logout: function () {
    var done = function () { DH.store.reset(); };
    return DH.account.call("/logout").then(done, done);
  },
  expired: function () {
    DH.store.state.account = null;
    DH.store.save(true);
    DH.app.toast(DH.tr("You've been logged out. Log in again to keep syncing."));
  }
};

// Philosophy school courses (not festivals or topics like science).
DH.isSchool = function (course) {
  return !!course && !course.festival && course.kind !== "topic";
};

DH.lang = function () {
  var p = DH.store.state && DH.store.state.prefs;
  return (p && p.lang) || "en";
};

DH.langInfo = function (code) {
  return DH.LANGUAGES.find(function (l) { return l.code === code; }) || DH.LANGUAGES[0];
};

// ---------- Translation ----------
// tr(text) returns the translated text if we have it, otherwise English, and
// remembers the text so flush() can fetch translations in one batch.
DH.i18n = {
  KEY: "dharmai-tr-v1",
  cache: {},
  want: new Set(),
  failed: new Set(),
  busy: false,
  loadCache: function () {
    try { this.cache = JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch (e) { this.cache = {}; }
  },
  saveCache: function () {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.cache)); } catch (e) { }
  },
  has: function (s) {
    var m = this.cache[DH.lang()];
    return !!(m && m[s]);
  },
  // Fetch missing translations, then call rerender once they arrive.
  flush: function (rerender) {
    var self = this, lang = DH.lang();
    if (lang === "en" || self.busy || !self.want.size || !DH.ai.configured()) return;
    var batch = Array.from(self.want).slice(0, 60);
    batch.forEach(function (s) { self.want.delete(s); });
    self.busy = true;
    DH.setTranslating(true);
    DH.ai.translate(lang, batch).then(function (out) {
      var m = self.cache[lang] = self.cache[lang] || {};
      batch.forEach(function (s, i) {
        if (out && typeof out[i] === "string" && out[i].trim()) m[s] = out[i];
        else self.failed.add(s);
      });
      self.saveCache();
    }).catch(function () {
      batch.forEach(function (s) { self.failed.add(s); });
    }).then(function () {
      self.busy = false;
      DH.setTranslating(false);
      rerender();
    });
  }
};

DH.tr = function (s) {
  if (!s || DH.lang() === "en") return s;
  var m = DH.i18n.cache[DH.lang()];
  if (m && m[s]) return m[s];
  if (!DH.i18n.failed.has(s)) DH.i18n.want.add(s);
  return s;
};
DH.t = function (s) { return DH.esc(DH.tr(s)); };

DH.setTranslating = function (on) {
  var el = document.getElementById("translating");
  if (el) el.hidden = !on;
};

// ---------- Source search (the "retrieval" in RAG) ----------
DH.norm = function (s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ");
};

DH.SYNONYMS = {
  soul: "self atman jiva", self: "atman jiva soul", god: "brahman ishvara vishnu narayana lord",
  lord: "ishvara narayana", vishnu: "narayana vasudeva", krishna: "vasudeva gita", surrender: "prapatti saranagati refuge",
  refuge: "prapatti saranagati", devotion: "bhakti", love: "bhakti", liberation: "moksha mukti", moksha: "liberation",
  golu: "kolu bommai navaratri", kolu: "golu", navratri: "navaratri", dussehra: "vijayadashami dasara ramlila",
  durga: "devi goddess mahishasura", goddess: "devi shakti", illusion: "maya avidya advaita", maya: "avidya illusion",
  shankara: "advaita", madhva: "dvaita", ramanuja: "vishishtadvaita sri bhashya", vadakalai: "desika markata monkey",
  tenkalai: "pillai lokacharya marjara cat", iyengar: "srivaishnava alvar tamil", tamil: "alvar tiruvaymoli tiruppavai",
  srivaishnava: "alvar ramanuja prapatti", angada: "tulsidas ramlila ravana", tulsidas: "ramcharitmanas ramlila", death: "die body eternal", rebirth: "body death self", world: "creation cause brahman"
};

DH.STOPWORDS = " the and for are was what why how who does did this that with from about mean means into your you our have has can will would should not but its it's tell explain ";
DH.searchWords = function (text) {
  var words = DH.norm(text).split(/\s+/).filter(function (w) { return w.length > 2 && DH.STOPWORDS.indexOf(" " + w + " ") < 0; });
  words = words.map(function (w) { return w.length > 4 ? w.replace(/s$/, "") : w; });
  var extra = [];
  words.forEach(function (w) { if (DH.SYNONYMS[w]) extra = extra.concat(DH.SYNONYMS[w].split(" ")); });
  return words.concat(extra);
};

// soft = the learner's tradition: it only reorders sources that already match the question.
DH.search = function (query, k, boostIds, soft) {
  var words = DH.searchWords(query);
  var softWords = DH.searchWords(soft || "");
  var scored = Object.keys(DH.SOURCES).map(function (id) {
    var s = DH.SOURCES[id];
    var hay = DH.norm([s.work, s.ref, s.en, s.iast, s.tags].join(" "));
    var tags = DH.norm(s.tags);
    var score = 0;
    words.forEach(function (w) {
      if (hay.indexOf(w) >= 0) score += (tags.indexOf(w) >= 0 ? 2 : 1);
    });
    if (boostIds && boostIds.indexOf(id) >= 0) score += 3;
    if (score > 0) softWords.forEach(function (w) { if (tags.indexOf(w) >= 0) score += 0.5; });
    return { id: id, score: score };
  }).filter(function (x) { return x.score > 0; });
  scored.sort(function (a, b) { return b.score - a.score; });
  return scored.slice(0, k || 6).map(function (x) { return x.id; });
};

DH.cite = function (id) {
  var s = DH.SOURCES[id];
  return s ? s.work + " " + s.ref : id;
};

// ---------- AI (through the Cloudflare Worker) ----------
DH.ai = {
  configured: function () { return !!(DH.config.WORKER_URL || "").trim(); },
  post: function (path, body) {
    var url = DH.config.WORKER_URL.replace(/\/$/, "") + path;
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok) throw new Error(j.error || ("HTTP " + r.status));
          return j;
        });
      });
  },
  translate: function (lang, strings) {
    return this.post("/translate", { lang: DH.langInfo(lang).name, strings: strings }).then(function (j) { return j.strings; });
  },
  // Finds the best passages for some text (the "retrieval" step).
  retrieve: function (text) {
    var p = DH.store.state.prefs || {};
    // The learner's tradition (e.g. "Vadakalai") nudges which sources come up.
    var ids = DH.search(text, 6, [], p.tradition || "");
    return {
      ids: ids,
      passages: ids.map(function (id) {
        var s = DH.SOURCES[id];
        return { id: id, kind: s.kind, title: DH.cite(id), sanskrit: s.iast || "", text: s.en };
      })
    };
  },
  profile: function () {
    var p = DH.store.state.prefs || {};
    // The school course you're currently in counts as what you're studying.
    var active = DH.COURSES[DH.store.state.active];
    var school = active && DH.isSchool(active) ? active.title : (p.school || "");
    // How well the learner knows each topic, so the AI can pitch its answers.
    var lv = DH.store.state.levels || {};
    var levels = Object.keys(lv).map(function (k) { return k + ": " + lv[k]; }).join(", ");
    return { levels: levels, school: school, tradition: p.tradition || "", language: DH.langInfo(p.lang || "en").name, focus: p.focus || "both" };
  },
  // Only keep citations that really are in the passages we sent.
  clean: function (answer, ids) {
    return String(answer || "").replace(/\[\[([\w.\-]+)\]\]/g, function (m, id) {
      return ids.indexOf(id) >= 0 ? "[[" + id + "]]" : "";
    });
  },
  // Tutor. opts: { question, history }
  ask: function (opts) {
    var self = this, r = this.retrieve(opts.question);
    if (!this.configured()) return Promise.resolve({ offline: true, ids: r.ids });
    return this.post("/ask", {
      question: opts.question, history: (opts.history || []).slice(-10),
      passages: r.passages, profile: this.profile()
    }).then(function (j) { return { text: self.clean(j.answer, r.ids) }; });
  },
  // Debate partner. opts: { topic, side, message, history, action }
  debate: function (opts) {
    var self = this;
    var last = (opts.history || []).slice(-2).map(function (m) { return m.text; }).join(" ");
    var r = this.retrieve(opts.topic + " " + opts.side + " " + (opts.message || "") + " " + last);
    if (!this.configured()) return Promise.resolve({ offline: true, ids: r.ids });
    return this.post("/debate", {
      topic: opts.topic, side: opts.side, message: opts.message || "", action: opts.action || "turn",
      style: (DH.store.state.prefs || {}).debate || "choose",
      history: (opts.history || []).slice(-10), passages: r.passages, profile: this.profile()
    }).then(function (j) { return { text: self.clean(j.answer, r.ids) }; });
  }
};
