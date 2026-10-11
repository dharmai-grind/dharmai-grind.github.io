// Core helpers: saved state, translation, source search, AI calls.

DH.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

DH.today = function () {
  var d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

// ---------- Saved state (only on this device) ----------
DH.store = {
  KEY: "dharmai-state-v1",
  state: null,
  fresh: function () {
    return { prefs: null, courses: [], active: null, progress: {}, xp: 0, streak: 0, lastDay: null, chat: [] };
  },
  load: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.KEY)); } catch (e) { s = null; }
    this.state = Object.assign(this.fresh(), s || {});
    return this.state;
  },
  save: function () {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch (e) { }
  },
  reset: function () {
    this.state = this.fresh();
    this.save();
  }
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
  // opts: { question, history, mode: "ask"|"debate", side, context }
  ask: function (opts) {
    var p = DH.store.state.prefs || {};
    // The learner's tradition (e.g. "Vadakalai") also steers which sources come up.
    var ids = DH.search(opts.question + " " + (opts.context || ""), 6, opts.boost || [], p.tradition || "");
    var passages = ids.map(function (id) {
      var s = DH.SOURCES[id];
      return { id: id, kind: s.kind, title: DH.cite(id), sanskrit: s.iast || "", text: s.en };
    });
    if (!this.configured()) {
      return Promise.resolve({ offline: true, ids: ids });
    }
    return this.post("/ask", {
      question: opts.question,
      history: (opts.history || []).slice(-8),
      mode: opts.mode || "ask",
      side: opts.side || "",
      passages: passages,
      profile: {
        school: p.school || "", tradition: p.tradition || "",
        language: DH.langInfo(p.lang || "en").name, focus: p.focus || "both"
      }
    }).then(function (j) {
      // Only keep citations that really are in the passages we sent.
      var text = String(j.answer || "").replace(/\[\[([\w.\-]+)\]\]/g, function (m, id) {
        return ids.indexOf(id) >= 0 ? "[[" + id + "]]" : "";
      });
      return { text: text, ids: ids };
    });
  }
};
