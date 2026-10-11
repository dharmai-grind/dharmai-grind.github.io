// The app shell: onboarding, accounts, home (course map), courses, Ask, Debate, profile.

DH.app = {
  tab: "learn",

  init: function () {
    var self = this;
    DH.store.load();
    DH.i18n.loadCache();
    DH.voice.init();
    this.applyDir();
    if (!DH.store.state.prefs) this.onboard(0, {});
    else this.go(this.tab);
    // If logged in, pick up progress made on another device.
    DH.account.pull().then(function (changed) {
      if (!changed) return;
      self.applyDir();
      if (DH.store.state.prefs && !document.querySelector(".lesson")) self.go(self.tab);
    });
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      navigator.serviceWorker.register("sw.js").catch(function () { });
    }
  },

  toast: function (msg) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3500);
  },

  applyDir: function () {
    var info = DH.langInfo(DH.lang());
    document.documentElement.lang = info.code;
    document.documentElement.dir = info.rtl ? "rtl" : "ltr";
  },

  // Render with translation: if some text isn't translated yet, fetch it and redraw.
  paint: function (html, rerender) {
    document.getElementById("app").innerHTML = html;
    DH.i18n.flush(rerender);
  },

  festivalOn: function () {
    var t = DH.today();
    return (DH.config.NAVARATRI || []).some(function (r) { return t >= r.start && t <= r.end; });
  },

  // ---------- Onboarding ----------
  onboard: function (step, draft) {
    var self = this;
    var steps = ["welcome", "school", "tradition", "language", "length", "focus", "debate"];
    var name = steps[step];
    var pct = Math.round((step / steps.length) * 100);
    var t = DH.t;
    var body = "";
    var back = step > 0 ? '<button class="icon-btn" id="back" aria-label="Back"><i class="ti ti-arrow-left"></i></button>' : "<span></span>";

    var choice = function (key, value, label, sub, extra) {
      return '<button class="opt big ' + (draft[key] === value ? "sel" : "") + '" data-k="' + key + '" data-v="' + value + '"' + (extra || "") + ">" +
        "<b>" + t(label) + "</b>" + (sub ? "<small>" + t(sub) + "</small>" : "") + "</button>";
    };

    if (name === "welcome") {
      body = '<div class="center-screen">' + DH.angada(170, "cheer") +
        '<h1 class="brand">DHARM<span>Ai</span></h1>' +
        '<div class="bubble">' + t("Namaste! I'm Angada. In the Rāmāyaṇa I carried Rāma's message into Rāvaṇa's court and stood my ground. Let's explore big ideas together, a few minutes at a time.") + "</div>" +
        '<button class="btn primary wide" id="next">' + t("Get started") + "</button>" +
        (DH.ai.configured() ? '<button class="btn wide" id="haveAcc">' + t("I already have an account") + "</button>" : "") + "</div>";
    }
    if (name === "school") {
      // One pick to start: a school OR a festival. More can be added later.
      var group = function (kind) {
        return DH.CATALOG.filter(function (c) { return c.kind === kind; }).map(function (c) {
          if (c.status === "soon") {
            return '<button class="opt big soon" disabled><b>' + t(c.title) + ' <span class="pill soon-pill">' + t("Coming soon") + "</span></b><small>" + t(c.blurb) + "</small></button>";
          }
          var badge = kind === "festival" && self.festivalOn() ? ' <span class="pill pink">' + t("Happening now") + "</span>" : "";
          return '<button class="opt big ' + (draft.start === c.id ? "sel" : "") + '" data-k="start" data-v="' + c.id + '"><b>' + t(c.title) + badge + "</b><small>" + t(c.blurb) + "</small></button>";
        }).join("");
      };
      body = "<h1>" + t("What would you like to learn first?") + "</h1>" +
        '<div class="note"><i class="ti ti-info-circle"></i> ' + t("You can take several courses at the same time. Choose one to start; you can add more anytime from Courses.") + "</div>" +
        "<h2>" + t("A philosophical school") + "</h2>" +
        '<p class="small">' + t("Not sure? Each school's first unit compares all three, so any is a good start.") + "</p>" +
        '<div class="opts">' + group("school") + "</div>" +
        '<div class="or"><span>' + t("or") + "</span></div>" +
        "<h2>" + t("A festival") + "</h2>" +
        '<div class="opts">' + group("festival") + "</div>" +
        '<div class="or"><span>' + t("or") + "</span></div>" +
        "<h2>" + t("A work of literature") + "</h2>" +
        '<div class="opts">' + group("literature") + "</div>" +
        '<div class="or"><span>' + t("or") + "</span></div>" +
        "<h2>" + t("A miscellaneous topic") + "</h2>" +
        '<div class="opts">' + group("topic") + "</div>";
    }
    if (name === "tradition") {
      body = "<h1>" + t("Any particular tradition or background?") + "</h1>" +
        "<p>" + t("Optional. Type a tradition, sampradāya, region or family practice, and DHARMAi will look for relevant texts and commentaries. You can also leave this blank.") + "</p>" +
        '<input id="trad" maxlength="120" placeholder="' + DH.esc(DH.tr("Vadakalai Śrīvaiṣṇava, Smārta, Tamil family traditions...")) + '" value="' + DH.esc(draft.tradition || "") + '">' +
        '<p class="small">' + t("Don't include your name or other personal details.") + "</p>";
    }
    if (name === "language") {
      var cur = draft.lang || "en";
      body = "<h1>" + t("Which language would you like?") + "</h1>" +
        "<p>" + t("Lessons and answers will be machine translated. Sanskrit verses always stay in the original too.") + "</p>" +
        '<input id="lsearch" placeholder="' + DH.esc(DH.tr("Search languages")) + '">' +
        '<div class="langs" id="langs">' + DH.LANGUAGES.map(function (l) {
          return '<button class="opt lang ' + (cur === l.code ? "sel" : "") + '" data-code="' + l.code + '" data-n="' + DH.esc((l.name + " " + l.native).toLowerCase()) + '">' +
            '<b dir="auto">' + DH.esc(l.native) + "</b><small>" + DH.esc(l.name) + "</small></button>";
        }).join("") + "</div>" +
        (DH.ai.configured() ? "" : '<p class="small warn">' + t("Translation switches on once DHARMAi's AI is connected. Until then, everything shows in English.") + "</p>");
    }
    if (name === "length") {
      body = "<h1>" + t("How long should lessons be?") + "</h1><p>" + t("DHARMAi shapes every lesson to fit.") + '</p><div class="opts">' +
        choice("length", "short", "About 2 minutes", "Key ideas, a few quick questions") +
        choice("length", "medium", "About 5 minutes", "The full lesson") +
        choice("length", "long", "10 minutes or more", "Extra deep-dive cards and every question") +
        "</div>";
    }
    if (name === "focus") {
      body = "<h1>" + t("What do you want more of?") + '</h1><div class="opts">' +
        choice("focus", "think", "Critical thinking", "Arguments, objections, comparing views") +
        choice("focus", "trivia", "Trivia", "Names, texts, dates, stories") +
        choice("focus", "both", "Both", "A mix of the two") +
        "</div>";
    }
    if (name === "debate") {
      body = "<h1>" + t("Mini debates with Angada?") + "</h1><p>" + t("Some lessons end with a short debate. Angada challenges your arguments respectfully and never tells you your beliefs are wrong.") + '</p><div class="opts">' +
        choice("debate", "choose", "Yes, I pick my side") +
        choice("debate", "assign", "Yes, assign me a side", "Great for challenging your own assumptions") +
        choice("debate", "both", "Yes, let me argue both sides") +
        choice("debate", "none", "No debates, just lessons") +
        "</div>";
    }

    var isLast = step === steps.length - 1;
    var html = '<div class="onboard">' +
      (step > 0 ? '<div class="lesson-top">' + back + '<div class="bar"><div style="width:' + pct + '%"></div></div></div>' : "") +
      '<div class="ob-body">' + body + "</div>" +
      (step > 0 ? '<div class="lesson-foot"><div class="err" id="err"></div><button class="btn primary" id="next">' + t(isLast ? "Start learning" : "Continue") + "</button></div>" : "") +
      "</div>";
    var rerender = function () { self.onboard(step, draft); };
    self.paint(html, rerender);

    var err = function (m) { document.getElementById("err").textContent = DH.tr(m); };
    document.querySelectorAll("[data-k]").forEach(function (b) {
      b.onclick = function () {
        draft[b.dataset.k] = b.dataset.v;
        document.querySelectorAll('[data-k="' + b.dataset.k + '"]').forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
        var e = document.getElementById("err"); if (e) e.textContent = "";
      };
    });
    if (document.getElementById("back")) document.getElementById("back").onclick = function () { self.onboard(step - 1, draft); };
    if (document.getElementById("haveAcc")) document.getElementById("haveAcc").onclick = function () { self.auth("login"); };
    if (name === "language") {
      document.getElementById("lsearch").oninput = function (e) {
        var q = e.target.value.toLowerCase().trim();
        document.querySelectorAll(".lang").forEach(function (b) { b.hidden = q && b.dataset.n.indexOf(q) < 0; });
      };
      document.querySelectorAll(".lang").forEach(function (b) {
        b.onclick = function () {
          draft.lang = b.dataset.code;
          document.querySelectorAll(".lang").forEach(function (x) { x.classList.remove("sel"); });
          b.classList.add("sel");
        };
      });
    }
    document.getElementById("next").onclick = function () {
      if (name === "school" && !draft.start) return err("Pick something to start with");
      if (name === "tradition") draft.tradition = document.getElementById("trad").value.trim();
      if (name === "language") draft.lang = draft.lang || "en";
      if (name === "length" && !draft.length) return err("Pick a lesson length");
      if (name === "focus" && !draft.focus) return err("Pick one to continue");
      if (name === "debate" && !draft.debate) return err("Pick one to continue");
      if (name === "language") {
        DH.store.state.prefs = Object.assign({}, DH.store.state.prefs || {}, { lang: draft.lang });
        self.applyDir();
      }
      if (!isLast) return self.onboard(step + 1, draft);
      self.finishOnboarding(draft);
    };
  },

  finishOnboarding: function (draft) {
    var st = DH.store.state;
    var start = DH.COURSES[draft.start] ? draft.start : "vishishtadvaita";
    var isSchool = DH.isSchool(DH.COURSES[start]);
    st.prefs = {
      // "school" tells the AI which school the learner is studying (if any).
      school: isSchool ? start : "",
      tradition: draft.tradition || "", lang: draft.lang || "en",
      length: draft.length, focus: draft.focus, debate: draft.debate
    };
    if (st.courses.indexOf(start) < 0) st.courses.push(start);
    st.active = start;
    DH.store.save();
    this.applyDir();
    this.go("learn");
  },

  // ---------- Accounts: log in, sign up, recover ----------
  // mode: "login" | "signup" | "recover"
  auth: function (mode) {
    var self = this, t = DH.t;
    var title = { login: "Log in", signup: "Create an account", recover: "Reset your password" }[mode];
    var html = '<div class="onboard"><div class="lesson-top"><button class="icon-btn" id="back" aria-label="Back"><i class="ti ti-arrow-left"></i></button></div>' +
      '<div class="ob-body"><div class="auth-head">' + DH.angada(80, mode === "recover" ? "think" : "happy") + "<h1>" + t(title) + "</h1></div>" +
      (mode === "signup" ? '<p class="small">' + t("Save your progress and use it on any device. No email needed. Don't use your real name as your username.") + "</p>" : "") +
      '<form id="authForm" class="auth-form" autocomplete="on">' +
      '<label class="field"><span>' + t("Username") + '</span><input id="aUser" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20"></label>' +
      (mode === "recover"
        ? '<label class="field"><span>' + t("Recovery code") + '</span><input id="aCode" autocapitalize="characters" spellcheck="false" placeholder="ABCD-EFGH-JKLM"></label>' +
          '<label class="field"><span>' + t("New password") + '</span><input id="aPass" type="password" autocomplete="new-password"></label>'
        : '<label class="field"><span>' + t("Password") + '</span><input id="aPass" type="password" autocomplete="' + (mode === "signup" ? "new-password" : "current-password") + '"></label>') +
      (mode === "signup" ? '<label class="field"><span>' + t("Password again") + '</span><input id="aPass2" type="password" autocomplete="new-password"></label>' : "") +
      '<div class="err" id="err"></div>' +
      '<button class="btn primary wide" id="aGo">' + t(mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Reset password") + "</button></form>" +
      '<div class="auth-links">' +
      (mode === "login" ? '<button class="link" data-auth="signup">' + t("Create an account") + '</button><button class="link" data-auth="recover">' + t("Forgot password?") + "</button>" : "") +
      (mode !== "login" ? '<button class="link" data-auth="login">' + t("I already have an account") + "</button>" : "") +
      "</div></div></div>";
    self.paint(html, function () { self.auth(mode); });

    document.getElementById("back").onclick = function () {
      if (DH.store.state.prefs) self.go("me"); else self.onboard(0, {});
    };
    document.querySelectorAll("[data-auth]").forEach(function (b) { b.onclick = function () { self.auth(b.dataset.auth); }; });
    var err = function (m) { document.getElementById("err").textContent = m; };
    document.querySelectorAll("#authForm input").forEach(function (i) { i.oninput = function () { err(""); }; });

    document.getElementById("authForm").onsubmit = function (e) {
      e.preventDefault();
      var user = document.getElementById("aUser").value.trim().toLowerCase();
      var pass = document.getElementById("aPass").value;
      if (!/^[a-z0-9_]{3,20}$/.test(user)) return err(DH.tr("Usernames are 3–20 characters: letters, numbers and _ only."));
      if (pass.length < 8) return err(DH.tr("Passwords need at least 8 characters."));
      var body = { username: user };
      if (mode === "signup") {
        if (pass !== document.getElementById("aPass2").value) return err(DH.tr("The two passwords don't match."));
        body.password = pass;
      } else if (mode === "recover") {
        var code = document.getElementById("aCode").value.trim();
        if (code.replace(/[^A-Za-z0-9]/g, "").length < 12) return err(DH.tr("Enter your 12-character recovery code."));
        body.recoveryCode = code;
        body.newPassword = pass;
      } else body.password = pass;

      var btn = document.getElementById("aGo");
      btn.disabled = true;
      btn.textContent = DH.tr("One moment...");
      DH.account.call("/" + mode, body).then(function (res) {
        return DH.account.start(res).then(function () { return res; });
      }).then(function (res) {
        self.applyDir();
        if (res.recoveryCode) return self.showRecovery(res.recoveryCode);
        self.afterAuth();
      }).catch(function (ex) {
        btn.disabled = false;
        btn.textContent = DH.tr(mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Reset password");
        err(DH.tr(ex.message === "Failed to fetch" ? "Couldn't reach DHARMAi. Check your internet and try again." : ex.message));
      });
    };
  },

  afterAuth: function () {
    if (DH.store.state.prefs) this.go("learn");
    else this.onboard(1, {});
  },

  // Shown once after sign-up or a password reset.
  showRecovery: function (code) {
    var self = this, t = DH.t;
    var html = '<div class="center-screen">' + DH.angada(110, "think") +
      "<h1>" + t("Save your recovery code") + "</h1>" +
      "<p>" + t("If you ever forget your password, this code is the only way back into your account. Write it down or screenshot it. You won't see it again.") + "</p>" +
      '<div class="rec-code" id="code">' + DH.esc(code) + "</div>" +
      '<button class="btn" id="copy"><i class="ti ti-copy"></i> ' + t("Copy") + "</button>" +
      '<label class="check"><input type="checkbox" id="saved"> ' + t("I've saved my recovery code") + "</label>" +
      '<div class="err" id="err"></div>' +
      '<button class="btn primary wide" id="cont">' + t("Continue") + "</button></div>";
    self.paint(html, function () { self.showRecovery(code); });
    document.getElementById("copy").onclick = function () {
      try { navigator.clipboard.writeText(code); self.toast(DH.tr("Copied")); } catch (e) { }
    };
    document.getElementById("saved").onchange = function () { document.getElementById("err").textContent = ""; };
    document.getElementById("cont").onclick = function () {
      if (!document.getElementById("saved").checked) {
        document.getElementById("err").textContent = DH.tr("Tick the box once you've saved your code");
        return;
      }
      self.afterAuth();
    };
  },

  // ---------- Shell ----------
  go: function (tab) {
    if (this.tab !== tab) DH.voice.stop();
    this.tab = tab;
    var self = this, rerender = function () { self.go(tab); };
    var content = this["screen_" + tab]();
    var nav = [["learn", "ti-home", "Learn"], ["courses", "ti-books", "Courses"], ["ask", "ti-message-circle", "Ask"], ["debate", "ti-swords", "Debate"], ["me", "ti-user", "Profile"]];
    var st = DH.store.state;
    var html = '<div class="shell"><header class="topbar">' +
      '<span class="brand small">DHARM<span>Ai</span></span>' +
      '<span class="pill saffron"><i class="ti ti-flame"></i> ' + DH.streakNow() + "</span>" +
      '<span class="pill purple"><i class="ti ti-bolt"></i> ' + st.xp + " " + DH.t("XP") + "</span></header>" +
      '<main class="screen">' + content + "</main>" +
      '<nav class="tabbar">' + nav.map(function (n) {
        return '<button class="tab ' + (tab === n[0] ? "on" : "") + '" data-tab="' + n[0] + '"><i class="ti ' + n[1] + '"></i><span>' + DH.t(n[2]) + "</span></button>";
      }).join("") + "</nav></div>";
    self.paint(html, rerender);
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { self.go(b.dataset.tab); }; });
    var bind = this["bind_" + tab];
    if (bind) bind.call(this);
    DH.app.bindCites();
  },

  bindCites: function () {
    document.querySelectorAll("[data-src]").forEach(function (b) {
      b.onclick = function () { DH.app.showSource(b.dataset.src); };
    });
  },

  showSource: function (id) {
    var s = DH.SOURCES[id];
    if (!s) return;
    var wrap = document.createElement("div");
    wrap.className = "modal";
    wrap.innerHTML = '<div class="sheet"><button class="icon-btn close" aria-label="Close"><i class="ti ti-x"></i></button>' +
      "<h2>" + DH.esc(DH.cite(id)) + "</h2>" +
      DH.sourceBox(id).replace(/<button[\s\S]*<\/button>/, "") +
      '<p class="small">' + DH.t(s.kind === "verse" ? "Original text with a DHARMAi translation." : s.kind === "summary" ? "This is a summary of the work's position, not a direct quote." : "This describes a living tradition; practice varies by region and family.") + "</p></div>";
    document.body.appendChild(wrap);
    var close = function () { wrap.remove(); };
    wrap.onclick = function (e) { if (e.target === wrap) close(); };
    wrap.querySelector(".close").onclick = close;
  },

  // ---------- Learn: course map ----------
  lessonState: function (course, lessonId) {
    var done = (DH.store.state.progress[course.id] || { done: [] }).done;
    if (done.indexOf(lessonId) >= 0) return "done";
    var flat = [];
    course.units.forEach(function (u) { u.lessons.forEach(function (l) { flat.push(l.id); }); });
    var firstOpen = flat.find(function (id) { return done.indexOf(id) < 0; });
    return firstOpen === lessonId ? "current" : "locked";
  },

  screen_learn: function () {
    var st = DH.store.state, self = this;
    if (!st.active || !DH.COURSES[st.active]) st.active = st.courses[0];
    var course = DH.COURSES[st.active];
    var chips = '<div class="course-chips">' + st.courses.map(function (id) {
      var c = DH.COURSES[id];
      return '<button class="chip ' + (id === st.active ? "on " + c.color : "") + '" data-course="' + id + '"><i class="ti ' + c.icon + '"></i> ' + DH.t(c.title) + "</button>";
    }).join("") + '<button class="chip dashed" data-tab="courses"><i class="ti ti-plus"></i> ' + DH.t("Add course") + "</button></div>";

    var fest = self.festivalOn() && st.courses.indexOf("navaratri") < 0
      ? '<button class="banner pink" data-add="navaratri"><i class="ti ti-sparkles"></i> ' + DH.t("Navaratri is happening now! Add the festival course") + "</button>" : "";

    var n = 0;
    var map = course.units.map(function (u, ui) {
      return '<section class="unit"><div class="unit-head ' + course.color + '"><small>' + DH.t("Unit") + " " + (ui + 1) + "</small><b>" + DH.t(u.title) + "</b><span>" + DH.t(u.desc) + "</span></div>" +
        '<div class="path">' + u.lessons.map(function (l) {
          var s = self.lessonState(course, l.id);
          var off = [0, 60, 90, 60, 0, -60, -90, -60][n++ % 8];
          var icon = s === "done" ? "ti-check" : s === "current" ? "ti-star" : "ti-lock";
          return '<div class="node-wrap" style="transform:translateX(' + off + 'px)">' +
            (s === "current" ? '<div class="start-tag">' + DH.t("Start") + "</div>" : "") +
            '<button class="node ' + s + " " + course.color + '" data-lesson="' + l.id + '" aria-label="' + DH.esc(DH.tr(l.title)) + '"><i class="ti ' + icon + '"></i></button>' +
            '<div class="node-label">' + DH.t(l.title) + "</div></div>";
        }).join("") + "</div></section>";
    }).join("");

    return chips + fest + '<div class="course-title"><h1>' + DH.t(course.title) + "</h1><p>" + DH.t(course.subtitle) + "</p></div>" + map +
      '<button class="fab" data-tab="ask" aria-label="Ask DHARMAi"><i class="ti ti-message-circle"></i></button>';
  },

  bind_learn: function () {
    var self = this, st = DH.store.state;
    document.querySelectorAll("[data-course]").forEach(function (b) {
      b.onclick = function () { st.active = b.dataset.course; DH.store.save(); self.go("learn"); };
    });
    document.querySelectorAll("[data-add]").forEach(function (b) {
      b.onclick = function () { self.addCourse(b.dataset.add); };
    });
    document.querySelectorAll("[data-lesson]").forEach(function (b) {
      b.onclick = function () {
        var course = DH.COURSES[st.active];
        var s = self.lessonState(course, b.dataset.lesson);
        if (s === "locked") {
          b.classList.add("shake");
          setTimeout(function () { b.classList.remove("shake"); }, 450);
          return;
        }
        var lesson;
        course.units.forEach(function (u) { u.lessons.forEach(function (l) { if (l.id === b.dataset.lesson) lesson = l; }); });
        var start = function () { new DH.Lesson(course, lesson, function () { self.go("learn"); }).start(); };
        var unit = DH.unitOf(course, lesson.id);
        // First lesson in a unit with a topic: ask how well they know it.
        if (unit.topic && !(st.levels || {})[unit.topic]) self.askLevel(unit, start);
        else start();
      };
    });
  },

  // "How well do you know calculus?" Shown before a unit's first lesson.
  askLevel: function (unit, then) {
    var self = this, t = DH.t, chosen = null;
    var html = '<div class="onboard"><div class="lesson-top"><button class="icon-btn" id="back" aria-label="Back"><i class="ti ti-x"></i></button></div>' +
      '<div class="ob-body"><div class="auth-head">' + DH.angada(80, "think") + "<h1>" + t("How well do you know " + unit.topicLabel + "?") + "</h1></div>" +
      "<p>" + t("This shapes the lessons in this unit. New learners get the story and ideas in plain words; if you know more, you'll also see the technical details. You can change it anytime in Profile.") + "</p>" +
      '<div class="opts">' + DH.LEVELS.map(function (l) {
        return '<button class="opt big" data-lv="' + l[0] + '"><b>' + t(l[1]) + "</b><small>" + t(l[2]) + "</small></button>";
      }).join("") + "</div></div>" +
      '<div class="lesson-foot"><div class="err" id="err"></div><button class="btn primary" id="next">' + t("Start lesson") + "</button></div></div>";
    self.paint(html, function () { self.askLevel(unit, then); });
    document.getElementById("back").onclick = function () { self.go("learn"); };
    document.querySelectorAll("[data-lv]").forEach(function (b) {
      b.onclick = function () {
        chosen = b.dataset.lv;
        document.querySelectorAll("[data-lv]").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
        document.getElementById("err").textContent = "";
      };
    });
    document.getElementById("next").onclick = function () {
      if (!chosen) { document.getElementById("err").textContent = DH.tr("Pick one to continue"); return; }
      var st = DH.store.state;
      st.levels = st.levels || {};
      st.levels[unit.topic] = chosen;
      DH.store.save();
      then();
    };
  },

  // Every unit topic across all courses, for the Profile screen.
  allTopics: function () {
    var out = [];
    Object.keys(DH.COURSES).forEach(function (cid) {
      DH.COURSES[cid].units.forEach(function (u) {
        if (u.topic && !out.some(function (x) { return x.topic === u.topic; })) out.push({ topic: u.topic, label: u.topicLabel, course: cid });
      });
    });
    return out;
  },

  addCourse: function (id) {
    var st = DH.store.state;
    if (st.courses.indexOf(id) < 0) st.courses.push(id);
    st.active = id;
    DH.store.save();
    this.go("learn");
  },

  // ---------- Courses ----------
  screen_courses: function () {
    var st = DH.store.state, self = this;
    var card = function (c) {
      var mine = st.courses.indexOf(c.id) >= 0;
      var badge = c.status === "soon" ? '<span class="pill soon-pill">' + DH.t("Coming soon") + "</span>"
        : c.kind === "festival" && self.festivalOn() ? '<span class="pill pink">' + DH.t("Happening now") + "</span>"
        : c.kind === "festival" ? '<span class="pill">' + DH.t("Festival") + "</span>" : "";
      var done = 0, total = 0;
      if (DH.COURSES[c.id]) {
        DH.COURSES[c.id].units.forEach(function (u) { total += u.lessons.length; });
        done = (st.progress[c.id] || { done: [] }).done.length;
      }
      var action = c.status === "soon" ? ""
        : mine ? '<button class="btn small" data-open="' + c.id + '">' + DH.t("Continue") + " · " + done + "/" + total + "</button>"
        : '<button class="btn primary small" data-add="' + c.id + '">' + DH.t("Start course") + "</button>";
      return '<div class="course-card ' + (c.status === "soon" ? "soon" : "") + '"><div class="cc-icon ' + c.color + '"><i class="ti ' + c.icon + '"></i></div>' +
        '<div class="cc-main"><b>' + DH.t(c.title) + " " + badge + "</b><span>" + DH.t(c.blurb) + "</span>" + action + "</div></div>";
    };
    return "<h1>" + DH.t("Courses") + "</h1><p>" + DH.t("Take as many as you like at the same time.") + "</p>" +
      "<h2>" + DH.t("Philosophical schools") + "</h2>" + DH.CATALOG.filter(function (c) { return c.kind === "school"; }).map(card).join("") +
      "<h2>" + DH.t("Festivals") + "</h2>" + DH.CATALOG.filter(function (c) { return c.kind === "festival"; }).map(card).join("") +
      "<h2>" + DH.t("Literature") + "</h2>" + DH.CATALOG.filter(function (c) { return c.kind === "literature"; }).map(card).join("") +
      "<h2>" + DH.t("Miscellaneous topics") + "</h2>" + DH.CATALOG.filter(function (c) { return c.kind === "topic"; }).map(card).join("");
  },

  bind_courses: function () {
    var self = this;
    document.querySelectorAll("[data-add]").forEach(function (b) { b.onclick = function () { self.addCourse(b.dataset.add); }; });
    document.querySelectorAll("[data-open]").forEach(function (b) {
      b.onclick = function () { DH.store.state.active = b.dataset.open; DH.store.save(); self.go("learn"); };
    });
  },

  // ---------- Ask and Debate ----------
  // From the end of a lesson: a saved question goes to Ask, a saved debate starts a Debate.
  openAsk: function (item) {
    if (item.mode === "debate") {
      this.startDebate(item.q, item.side);
      return;
    }
    this.pendingQuestion = item.q;
    this.go("ask");
  },

  // One chat bubble (shared by Ask and Debate).
  bubble: function (m) {
    if (m.role === "user") return '<div class="msg user" dir="auto">' + DH.esc(m.text).replace(/\n/g, "<br>") + "</div>";
    var body = m.offline
      ? "<p>" + DH.t("DHARMAi's AI isn't connected yet, so here are the passages in our library that best match:") + "</p>" +
        (m.ids.length ? m.ids.map(function (id) { return '<button class="chip cite" data-src="' + id + '"><i class="ti ti-book"></i> ' + DH.esc(DH.cite(id)) + "</button>"; }).join(" ")
          : "<p>" + DH.t("Nothing in the library matched. Try other words.") + "</p>")
      : m.error ? '<p class="err">' + DH.esc(m.text) + "</p>" : '<div dir="auto">' + this.renderAnswer(m.text) + "</div>";
    var say = !m.offline && !m.error ? DH.voice.button([{ text: this.delatex(m.text) }], "Read this answer aloud") : "";
    return '<div class="msg bot">' + DH.angada(34, m.mood || "happy") + '<div class="bot-body">' + say + body + "</div></div>";
  },

  typing: function () {
    return '<div id="typing" hidden class="msg bot">' + DH.angada(34, "think") + '<div class="bot-body dots"><span></span><span></span><span></span></div></div>';
  },

  showTyping: function () {
    document.getElementById("typing").hidden = false;
    var m = document.getElementById("msgs");
    if (m) m.scrollIntoView({ block: "end" });
    window.scrollTo(0, document.body.scrollHeight);
  },

  aiError: function () {
    return DH.tr("DHARMAi couldn't answer right now (the free AI may be busy). Try again in a minute.");
  },

  // The AI sometimes writes math in LaTeX ($\pi/4$). Turn it into plain symbols.
  delatex: function (text) {
    var sym = { pi: "π", theta: "θ", alpha: "α", beta: "β", infty: "∞", times: "×", cdot: "·", dots: "…", ldots: "…", cdots: "…",
      pm: "±", leq: "≤", geq: "≥", neq: "≠", approx: "≈", sqrt: "√", sum: "Σ", int: "∫", to: "→", rightarrow: "→", degree: "°" };
    var sup = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "n": "ⁿ", "-": "⁻", "+": "⁺" };
    var sub = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
    return String(text).replace(/\$\$?([^$]+?)\$\$?/g, function (m, math) {
      if (!/[\\^_=\/]/.test(math)) return m; // "$5 and $10" is money, not math
      return math
        .replace(/_\{?(\d)\}?/g, function (m4, d) { return sub[d]; })
        .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "($1)/($2)")
        .replace(/\\sqrt\{([^}]*)\}/g, "√($1)")
        .replace(/\\([a-zA-Z]+)/g, function (m2, name) { return sym[name] !== undefined ? sym[name] : name; })
        .replace(/\^\{([^}]*)\}|\^(\S)/g, function (m3, a, b) {
          var s = a || b;
          return s.split("").every(function (ch) { return sup[ch]; }) ? s.split("").map(function (ch) { return sup[ch]; }).join("") : "^" + s;
        })
        .replace(/[{}]/g, "")
        .replace(/\(([a-zA-Z0-9.]+)\)\/\(([a-zA-Z0-9.]+)\)/g, "$1/$2");
    });
  },

  renderAnswer: function (text) {
    var html = DH.esc(this.delatex(text)).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\n]+?)\*/g, "$1<i>$2</i>").replace(/\n/g, "<br>");
    // Citations become tiny numbers in the text, listed as small links at the end.
    var order = [];
    html = html.replace(/\s*\[\[([\w.\-]+)\]\]/g, function (m, id) {
      if (!DH.SOURCES[id]) return "";
      if (order.indexOf(id) < 0) order.push(id);
      return '<sup><button class="cite-num" data-src="' + id + '" aria-label="' + DH.esc(DH.cite(id)) + '">' + (order.indexOf(id) + 1) + "</button></sup>";
    });
    if (order.length) {
      html += '<div class="srcs">' + DH.t("Sources") + ": " + order.map(function (id, i) {
        var s = DH.SOURCES[id];
        var name = s.kind === "verse" ? DH.cite(id) : s.work;
        return '<button class="src-link" data-src="' + id + '">' + (i + 1) + ". " + DH.esc(name) + "</button>";
      }).join(" · ") + "</div>";
    }
    return html;
  },

  screen_ask: function () {
    var st = DH.store.state, self = this;
    var msgs = st.ask.map(function (m) { return self.bubble(m); }).join("");
    var empty = !st.ask.length
      ? '<div class="ask-empty">' + DH.angada(110, "happy") + '<h1 class="ask-title">' + DH.t("AI and Dharma") + "</h1><p>" + DH.t("Ask me anything about Hindu dharma: philosophy, history, texts, festivals, or ancient Indian science. I'll point you to the sources.") + "</p>" +
        '<div class="suggest">' + ["What is the difference between Advaita and Vishishtadvaita?", "Why do we keep Golu?", "What does tat tvam asi mean?", "Who were the Āḻvārs?"].map(function (q) {
          return '<button class="chip" data-q="' + DH.esc(DH.tr(q)) + '">' + DH.t(q) + "</button>";
        }).join("") + "</div></div>" : "";
    return '<div class="ask">' +
      '<div class="msgs" id="msgs">' + empty + msgs + self.typing() + "</div>" +
      '<div class="notice"><i class="ti ti-info-circle"></i> ' + DH.t("Answers can be wrong. Check the cited sources, and don't share personal information.") +
      (st.ask.length ? ' <button class="link" id="clear">' + DH.t("Clear chat") + "</button>" : "") + "</div>" +
      '<form class="composer" id="composer"><textarea id="q" rows="1" maxlength="1000" placeholder="' + DH.esc(DH.tr("Ask anything...")) + '" dir="auto"></textarea>' +
      '<button class="send" aria-label="Send"><i class="ti ti-send"></i></button></form><div class="err" id="err"></div></div>';
  },

  bindComposer: function (onSend, emptyMsg) {
    var box = document.getElementById("q");
    box.oninput = function () { document.getElementById("err").textContent = ""; };
    box.onkeydown = function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); document.getElementById("composer").requestSubmit(); }
    };
    document.getElementById("composer").onsubmit = function (e) {
      e.preventDefault();
      var q = box.value.trim();
      if (!q) { document.getElementById("err").textContent = DH.tr(emptyMsg); return; }
      onSend(q);
    };
    return box;
  },

  bind_ask: function () {
    var self = this, st = DH.store.state;
    window.scrollTo(0, document.body.scrollHeight);
    var box = self.bindComposer(function (q) {
      var history = st.ask.filter(function (m) { return !m.offline && !m.error; }).map(function (m) { return { role: m.role, text: m.text }; });
      st.ask.push({ role: "user", text: q });
      DH.store.save();
      self.go("ask");
      self.showTyping();
      DH.ai.ask({ question: q, history: history }).then(function (r) {
        st.ask.push(r.offline ? { role: "bot", offline: true, ids: r.ids } : { role: "bot", text: r.text });
      }).catch(function () {
        st.ask.push({ role: "bot", error: true, text: self.aiError() });
      }).then(function () {
        st.ask = st.ask.slice(-40);
        DH.store.save();
        if (self.tab === "ask") self.go("ask");
      });
    }, "Type a question first");
    if (self.pendingQuestion) { box.value = self.pendingQuestion; self.pendingQuestion = null; }
    document.querySelectorAll("[data-q]").forEach(function (b) {
      b.onclick = function () { box.value = b.dataset.q; box.focus(); };
    });
    if (document.getElementById("clear")) document.getElementById("clear").onclick = function () { st.ask = []; DH.store.save(); self.go("ask"); };
  },

  // ---------- Debate ----------
  // Start a debate; if it was in "Saved debates", take it off the list.
  startDebate: function (topic, side) {
    var st = DH.store.state;
    st.savedDebates = (st.savedDebates || []).filter(function (d) { return !(d.topic === topic && d.side === side); });
    st.debate = { topic: topic, side: side, msgs: [], summary: null };
    this.debateDraft = null;
    DH.store.save();
    this.go("debate");
  },
  // Debate topics from lessons the learner has finished (plus a few starters).
  debateTopics: function () {
    var st = DH.store.state, out = [];
    st.courses.forEach(function (cid) {
      var c = DH.COURSES[cid], done = (st.progress[cid] || { done: [] }).done;
      c.units.forEach(function (u) {
        u.lessons.forEach(function (l) {
          if (done.indexOf(l.id) < 0) return;
          l.cards.forEach(function (card) { if (card.t === "debate") out.push({ q: card.q, sides: card.sides }); });
        });
      });
    });
    var starters = [
      { q: "Is it better to say the self is identical to God, different from God, or part of God?", sides: ["Identical (Advaita)", "Part of, like a body (Vishishtadvaita)", "Different (Dvaita)"] },
      { q: "Should a festival keep one 'official' story, or is it richer with many?", sides: ["One shared story", "Many stories"] },
      { q: "Should Golu stick to traditional dolls, or is it great when people add new themes (space, Lego, cricket)?", sides: ["Keep it traditional", "New themes keep it alive"] }
    ];
    starters.forEach(function (s) {
      if (out.length < 4 && !out.some(function (x) { return x.q === s.q; })) out.push(s);
    });
    return out;
  },

  screen_debate: function () {
    var st = DH.store.state, self = this, d = st.debate, t = DH.t;
    var p = st.prefs || {};

    // Setup: pick a topic and a side.
    if (!d || !d.side) {
      var draft = self.debateDraft || {};
      var topics = self.debateTopics();
      var picked = topics.find(function (x) { return x.q === draft.topic; });
      var sidesHtml = "";
      if (picked) {
        sidesHtml = p.debate === "assign"
          ? "<p>" + t("Angada will assign you a side. You don't have to agree with it!") + "</p>"
          : '<div class="opts">' + picked.sides.map(function (s) {
              return '<button class="opt ' + (draft.side === s ? "sel" : "") + '" data-side="' + DH.esc(s) + '">' + t(s) + "</button>";
            }).join("") + "</div>";
      } else if (draft.custom) {
        sidesHtml = '<label class="field"><span>' + t("Your position") + '</span><input id="dSide" maxlength="200" value="' + DH.esc(draft.side || "") + '" placeholder="' + DH.esc(DH.tr("The self is truly distinct from God")) + '"></label>';
      }
      var saved = st.savedDebates || [];
      var savedHtml = saved.length
        ? "<h2>" + t("Saved debates") + ' <span class="pill">' + saved.length + "</span></h2>" +
          '<div class="saved-list">' + saved.map(function (s, i) {
            return '<div class="saved-row"><div class="saved-main"><b>' + DH.esc(s.topic) + "</b><span>" + t("Your side:") + " " + DH.esc(s.side) +
              (s.from ? " · " + t("from") + " " + DH.esc(s.from) : "") + "</span></div>" +
              '<button class="btn primary small" data-saved-start="' + i + '">' + t("Start") + "</button>" +
              '<button class="icon-btn" data-saved-del="' + i + '" aria-label="' + DH.esc(DH.tr("Remove")) + '"><i class="ti ti-x"></i></button></div>';
          }).join("") + '</div><div class="or"><span>' + t("or start a new one") + "</span></div>"
        : "";
      return '<div class="debate-setup">' +
        '<div class="ask-empty">' + DH.angada(100, "cheer") + '<h1 class="ask-title">' + t("Debate Angada") + "</h1><p>" +
        t("Pick a question and a side. Angada argues the other side, one point at a time. He challenges arguments, never you.") + "</p></div>" +
        savedHtml +
        (p.debate === "none" ? '<p class="small">' + t("You chose 'no debates' for lessons, but you can still debate here any time.") + "</p>" : "") +
        "<h2>" + t("1. Pick a question") + '</h2><div class="opts">' +
        topics.map(function (x) { return '<button class="opt ' + (draft.topic === x.q ? "sel" : "") + '" data-topic="' + DH.esc(x.q) + '">' + t(x.q) + "</button>"; }).join("") +
        '<button class="opt ' + (draft.custom ? "sel" : "") + '" id="custom"><i class="ti ti-pencil"></i> ' + t("My own question") + "</button></div>" +
        (draft.custom ? '<label class="field"><span>' + t("Your question") + '</span><input id="dTopic" maxlength="300" value="' + DH.esc(draft.topic || "") + '" placeholder="' + DH.esc(DH.tr("Is the world real?")) + '"></label>' : "") +
        (picked || draft.custom ? "<h2>" + t("2. Your side") + "</h2>" + sidesHtml : "") +
        '<div class="err" id="err"></div>' +
        '<button class="btn primary wide" id="startDeb"><i class="ti ti-swords"></i> ' + t("Start debate") + "</button></div>";
    }

    // Active or finished debate.
    var msgs = d.msgs.map(function (m) { return self.bubble(Object.assign({ mood: "cheer" }, m)); }).join("");
    var start = !d.msgs.length
      ? '<div class="debate-note">' + t("Make your opening argument for your side, or let Angada go first.") + ' <button class="link" id="angFirst">' + t("Angada goes first") + "</button></div>" : "";
    var summary = d.summary
      ? '<div class="summary-card"><div class="sum-head">' + DH.angada(44, "happy") + "<b>" + t("Debate summary") + "</b>" + DH.voice.button([{ text: self.delatex(d.summary) }], "Read the summary aloud") + '</div><div dir="auto">' + self.renderAnswer(d.summary) + "</div></div>" : "";
    return '<div class="ask">' +
      '<div class="debate-head"><div><small>' + t("Debate") + "</small><b>" + DH.esc(d.topic) + '</b><span class="pill saffron">' + t("Your side:") + " " + DH.esc(d.side) + "</span></div></div>" +
      '<div class="msgs" id="msgs">' + start + msgs + summary + self.typing() + "</div>" +
      (d.summary
        ? '<button class="btn primary wide" id="newDeb"><i class="ti ti-plus"></i> ' + t("New debate") + "</button>"
        : '<div class="notice"><i class="ti ti-info-circle"></i> ' + t("Answers can be wrong. Check the cited sources.") +
          (d.msgs.length >= 2 ? ' <button class="link" id="endDeb">' + t("End debate and see summary") + "</button>" : "") +
          ' <button class="link" id="quitDeb">' + t("Change topic") +
          ((st.savedDebates || []).length ? " (" + st.savedDebates.length + " " + t("saved") + ")" : "") + "</button></div>" +
          '<form class="composer" id="composer"><textarea id="q" rows="1" maxlength="1000" placeholder="' + DH.esc(DH.tr(d.msgs.length ? "Your reply..." : "Your opening argument...")) + '" dir="auto"></textarea>' +
          '<button class="send" aria-label="Send"><i class="ti ti-send"></i></button></form><div class="err" id="err"></div>') +
      "</div>";
  },

  bind_debate: function () {
    var self = this, st = DH.store.state, d = st.debate, p = st.prefs || {};
    var err = function (m) { var e = document.getElementById("err"); if (e) e.textContent = DH.tr(m); };

    if (!d || !d.side) {
      self.debateDraft = self.debateDraft || {};
      var draft = self.debateDraft;
      var topics = self.debateTopics();
      document.querySelectorAll("[data-saved-start]").forEach(function (b) {
        b.onclick = function () {
          var s = st.savedDebates[+b.dataset.savedStart];
          if (s) self.startDebate(s.topic, s.side);
        };
      });
      document.querySelectorAll("[data-saved-del]").forEach(function (b) {
        b.onclick = function () {
          st.savedDebates.splice(+b.dataset.savedDel, 1);
          DH.store.save();
          self.go("debate");
        };
      });
      document.querySelectorAll("[data-topic]").forEach(function (b) {
        b.onclick = function () { self.debateDraft = { topic: b.dataset.topic }; self.go("debate"); };
      });
      document.getElementById("custom").onclick = function () { self.debateDraft = { custom: true }; self.go("debate"); };
      document.querySelectorAll("[data-side]").forEach(function (b) {
        b.onclick = function () {
          draft.side = b.dataset.side;
          document.querySelectorAll("[data-side]").forEach(function (x) { x.classList.remove("sel"); });
          b.classList.add("sel");
          err("");
        };
      });
      document.getElementById("startDeb").onclick = function () {
        if (draft.custom) {
          draft.topic = (document.getElementById("dTopic") || {}).value || "";
          draft.side = (document.getElementById("dSide") || {}).value || draft.side || "";
          draft.topic = draft.topic.trim(); draft.side = draft.side.trim();
          if (!draft.topic) return err("Type your question first");
          if (!draft.side) return err("Type the position you'll defend");
        } else {
          var picked = topics.find(function (x) { return x.q === draft.topic; });
          if (!picked) return err("Pick a question first");
          if (p.debate === "assign") draft.side = picked.sides[Math.floor(Math.random() * picked.sides.length)];
          if (!draft.side) return err("Pick a side first");
        }
        self.startDebate(draft.topic, draft.side);
      };
      return;
    }

    var history = function () {
      return d.msgs.filter(function (m) { return !m.offline && !m.error; }).map(function (m) { return { role: m.role, text: m.text }; });
    };
    var turn = function (message) {
      var h = history();
      if (message) d.msgs.push({ role: "user", text: message });
      DH.store.save();
      self.go("debate");
      self.showTyping();
      DH.ai.debate({ topic: d.topic, side: d.side, message: message, history: h }).then(function (r) {
        d.msgs.push(r.offline ? { role: "bot", offline: true, ids: r.ids } : { role: "bot", text: r.text });
      }).catch(function () {
        d.msgs.push({ role: "bot", error: true, text: self.aiError() });
      }).then(function () {
        d.msgs = d.msgs.slice(-30);
        DH.store.save();
        if (self.tab === "debate") self.go("debate");
      });
    };

    if (document.getElementById("composer")) self.bindComposer(turn, "Type your argument first");
    if (document.getElementById("angFirst")) document.getElementById("angFirst").onclick = function () { turn(""); };
    if (document.getElementById("quitDeb")) document.getElementById("quitDeb").onclick = function () {
      st.debate = null; DH.store.save(); self.go("debate");
    };
    if (document.getElementById("newDeb")) document.getElementById("newDeb").onclick = function () {
      st.debate = null; DH.store.save(); self.go("debate");
    };
    if (document.getElementById("endDeb")) document.getElementById("endDeb").onclick = function () {
      self.go("debate");
      self.showTyping();
      DH.ai.debate({ topic: d.topic, side: d.side, history: history(), action: "summary" }).then(function (r) {
        d.summary = r.offline ? DH.tr("Summaries need DHARMAi's AI to be connected.") : r.text;
      }).catch(function () {
        d.msgs.push({ role: "bot", error: true, text: self.aiError() });
      }).then(function () {
        DH.store.save();
        if (self.tab === "debate") self.go("debate");
      });
    };
    window.scrollTo(0, document.body.scrollHeight);
  },

  // ---------- Profile ----------
  screen_me: function () {
    var st = DH.store.state, p = st.prefs, t = DH.t;
    if (!p.rate) p.rate = "1"; // so the speed menu shows "Normal" by default
    var sel = function (key, options) {
      return '<select data-pref="' + key + '">' + options.map(function (o) {
        return '<option value="' + o[0] + '"' + (p[key] === o[0] ? " selected" : "") + ">" + t(o[1]) + "</option>";
      }).join("") + "</select>";
    };
    var lessons = 0;
    Object.keys(st.progress).forEach(function (k) { lessons += st.progress[k].done.length; });
    var acc = st.account;
    var accountCard = acc
      ? '<div class="acc-card"><i class="ti ti-user-check"></i><div><b>' + DH.esc(acc.username) + "</b><span>" + t("Signed in. Your progress syncs to any device you log in on.") + "</span></div></div>" +
        '<div class="acc-actions"><button class="btn small" id="logout"><i class="ti ti-logout"></i> ' + t("Log out") + "</button></div>"
      : DH.ai.configured()
        ? '<div class="acc-card guest"><i class="ti ti-cloud-upload"></i><div><b>' + t("Playing as a guest") + "</b><span>" + t("Your progress is only on this device. Create a free account to keep it safe and use it anywhere. No email needed.") + "</span></div></div>" +
          '<div class="acc-actions"><button class="btn primary small" id="signup">' + t("Create account") + '</button><button class="btn small" id="login">' + t("Log in") + "</button></div>"
        : "";
    return '<div class="me-head">' + DH.angada(90, "happy") + "<div><h1>" + (acc ? DH.esc(acc.username) : t("Your profile")) + "</h1></div></div>" +
      accountCard +
      '<div class="stats"><div class="stat fire"><span>' + t("Day streak") + "</span><b>" + DH.streakNow() + '</b></div><div class="stat xp"><span>' + t("Total XP") + "</span><b>" + st.xp + '</b></div><div class="stat acc"><span>' + t("Lessons") + "</span><b>" + lessons + "</b></div></div>" +
      "<h2>" + t("Preferences") + "</h2>" +
      '<label class="field"><span>' + t("Language") + '</span><select data-pref="lang">' + DH.LANGUAGES.map(function (l) {
        return '<option value="' + l.code + '"' + (p.lang === l.code ? " selected" : "") + ">" + DH.esc(l.native + " · " + l.name) + "</option>";
      }).join("") + "</select></label>" +
      '<label class="field"><span>' + t("Tradition or background") + '</span><input data-pref="tradition" maxlength="120" value="' + DH.esc(p.tradition) + '"></label>' +
      '<label class="field"><span>' + t("Lesson length") + "</span>" + sel("length", [["short", "About 2 minutes"], ["medium", "About 5 minutes"], ["long", "10 minutes or more"]]) + "</label>" +
      '<label class="field"><span>' + t("More of") + "</span>" + sel("focus", [["think", "Critical thinking"], ["trivia", "Trivia"], ["both", "Both"]]) + "</label>" +
      '<label class="field"><span>' + t("Debates") + "</span>" + sel("debate", [["choose", "Yes, I pick my side"], ["assign", "Yes, assign me a side"], ["both", "Yes, let me argue both sides"], ["none", "No debates, just lessons"]]) + "</label>" +
      (function () {
        if (!DH.voice.supported) return "";
        var voices = DH.voice.forLang(DH.lang());
        var cur = p.voice || "auto";
        return '<label class="field"><span>' + t("Read-aloud voice") + '</span><select data-pref="voice">' +
          '<option value="auto"' + (cur === "auto" ? " selected" : "") + ">" + t("Automatic (best on this device)") + (voices[0] ? ": " + DH.esc(voices[0].name) : "") + "</option>" +
          voices.map(function (v) { return '<option value="' + DH.esc(v.voiceURI) + '"' + (cur === v.voiceURI ? " selected" : "") + ">" + DH.esc(v.name + " (" + v.lang + ")") + "</option>"; }).join("") +
          "</select></label>" +
          (voices.length ? "" : '<p class="small warn">' + t("Your device has no voice for this language yet. You can add one in your device's language or speech settings.") + "</p>") +
          (function () {
            var nv = DH.voice.nameVoice(DH.voice.pick(DH.lang()), false);
            var cur2 = p.nameVoice || "one-main";
            var opt = function (v, label) { return '<option value="' + v + '"' + (cur2 === v ? " selected" : "") + ">" + t(label) + "</option>"; };
            var one = cur2 === "one-main";
            var cur3 = p.stressStyle || "caps";
            var opt3 = function (v, label) { return '<option value="' + v + '"' + (cur3 === v ? " selected" : "") + ">" + t(label) + "</option>"; };
            return '<label class="field"><span>' + t("Voice for Sanskrit and Indian names") + '</span><select data-pref="nameVoice">' +
              opt("one-main", "One American voice for everything (recommended)") +
              opt("auto", "Switch to an Indian voice for names (same gender)") +
              opt("one-enin", "One Indian English voice for everything") +
              opt("te", "Switch to a Telugu voice for names") + opt("kn", "Switch to a Kannada voice for names") +
              opt("enin", "Switch to an Indian English voice for names") + opt("hi", "Switch to a Hindi voice for names (drops the final 'a')") +
              "</select></label>" +
              '<p class="small">' + (one ? t("Indian words are spelled out by their sounds for your main voice, with the stressed syllable worked out (Navarātri → nuhvuhRAHtree).")
                : nv ? t("In use on this device:") + " " + DH.esc(nv.voice.name) : t("That voice isn't on this device, so names are respelled for your main voice.")) + "</p>" +
              (one ? '<div class="voice-row"><label class="field"><span>' + t("How to show stress to the voice") + '</span><select data-pref="stressStyle">' +
                opt3("caps", "Style 1: capitals (nuhvuhRAHtree)") + opt3("split", "Style 2: a gap (nuhvuh rahtree)") + opt3("plain", "Style 3: plain (nuhvuhrahtree)") +
                '</select></label><button class="btn small" id="compareStress"><i class="ti ti-volume"></i> ' + t("Compare") + "</button></div>" +
                '<p class="small">' + t("Voices differ in how they react to these. Press Compare, listen, and pick the style that sounds most natural on your device.") + "</p>" : "");
          })() +
          '<div class="voice-row"><label class="field"><span>' + t("Reading speed") + "</span>" + sel("rate", [["0.85", "Slower"], ["1", "Normal"], ["1.15", "Faster"]]) + "</label>" +
          '<button class="btn small" id="testVoice"><i class="ti ti-volume"></i> ' + t("Test") + "</button></div>";
      })() +
      // Special settings: folded away; one fold per course that has unit levels.
      (function () {
        var topics = DH.app.allTopics().filter(function (x) { return st.courses.indexOf(x.course) >= 0; });
        if (!topics.length) return "";
        var lv = st.levels || {};
        var courses = topics.map(function (x) { return x.course; }).filter(function (c, i, a) { return a.indexOf(c) === i; });
        return '<details class="fold special"><summary><span class="sec-title">' + t("Special settings") + '</span><span class="sec-sub">' + t("Extra options for specific courses") + "</span></summary>" +
          courses.map(function (cid) {
            return '<details class="fold inner"><summary>' + t(DH.COURSES[cid].title) + "</summary>" +
              '<p class="small">' + t("Your level in each unit. It sets how technical that unit's lessons get.") + "</p>" +
              topics.filter(function (x) { return x.course === cid; }).map(function (x) {
                return '<label class="field"><span>' + t(x.label.charAt(0).toUpperCase() + x.label.slice(1)) + '</span><select data-level="' + x.topic + '">' +
                  '<option value=""' + (lv[x.topic] ? "" : " selected") + ">" + t("Not set yet (asked at the first lesson)") + "</option>" +
                  DH.LEVELS.map(function (l) { return '<option value="' + l[0] + '"' + (lv[x.topic] === l[0] ? " selected" : "") + ">" + t(l[1]) + "</option>"; }).join("") +
                  "</select></label>";
              }).join("") + "</details>";
          }).join("") + "</details>";
      })() +
      '<p class="small" id="saved"></p>' +
      "<h2>" + t("About DHARMAi") + "</h2><p>" + t("DHARMAi teaches from primary texts, quoted in Sanskrit with our own translations, and marks summaries and regional traditions separately. It is a learning tool, not a religious authority. For questions about your own practice, ask your family, teacher or ācārya.") + "</p>" +
      "<h2>" + t("Privacy") + "</h2><p class=\"small\">" + t("Accounts need only a username and password. Passwords are stored scrambled, so nobody can read them. Your progress and chats are stored to sync your account; don't put personal information in them.") + "</p>" +
      '<div class="danger-zone"><button class="btn danger small" id="reset"><i class="ti ti-refresh"></i> ' + t("Reset all progress") + "</button>" +
      (acc ? '<button class="btn danger small" id="delAcc"><i class="ti ti-trash"></i> ' + t("Delete my account") + "</button>" : "") + "</div>";
  },

  bind_me: function () {
    var self = this, st = DH.store.state;
    document.querySelectorAll("[data-pref]").forEach(function (el) {
      el.onchange = function () {
        st.prefs[el.dataset.pref] = el.value.trim();
        DH.store.save();
        if (el.dataset.pref === "lang") { self.applyDir(); self.go("me"); return; }
        if (el.dataset.pref === "nameVoice" || el.dataset.pref === "voice") { self.go("me"); return; } // refresh "In use"
        document.getElementById("saved").textContent = DH.tr("Saved");
      };
    });
    document.querySelectorAll("[data-level]").forEach(function (el) {
      el.onchange = function () {
        st.levels = st.levels || {};
        if (el.value) st.levels[el.dataset.level] = el.value; else delete st.levels[el.dataset.level];
        DH.store.save();
        document.getElementById("saved").textContent = DH.tr("Saved");
      };
    });
    var on = function (id, fn) { var el = document.getElementById(id); if (el) el.onclick = fn; };
    on("compareStress", function () {
      var V = DH.voice, words = ["navarātri", "rāmāyaṇa", "śaṅkara"];
      var line = function (style, label) {
        return { text: label + ". " + words.map(function (w) { return V.usSyllables(w, style); }).join(", ") + "." };
      };
      // Speak the respelled words as-is (they're already respelled; don't respell again).
      V.say([line("caps", "Style 1"), line("split", "Style 2"), line("plain", "Style 3")], document.getElementById("compareStress"), true);
    });
    on("testVoice", function () {
      DH.voice.say([{ text: DH.tr("Namaste! I'm Angada. This is how I'll read your lessons, like the names Rāmānuja, Śaṅkara and Mahiṣāsura.") },
        { text: "सत्यं ज्ञानमनन्तं ब्रह्म", lang: "sa", iast: "satyaṃ jñānam anantaṃ brahma" }], document.getElementById("testVoice"));
    });
    on("signup", function () { self.auth("signup"); });
    on("login", function () { self.auth("login"); });
    on("logout", function () {
      if (!confirm(DH.tr("Log out? Your progress stays saved in your account."))) return;
      DH.account.logout().then(function () { self.onboard(0, {}); });
    });
    on("delAcc", function () {
      var pw = prompt(DH.tr("This permanently deletes your account and all its progress. Type your password to confirm."));
      if (!pw) return;
      DH.account.call("/account/delete", { password: pw }).then(function () {
        DH.store.reset();
        self.toast(DH.tr("Account deleted"));
        self.onboard(0, {});
      }).catch(function (e) { alert(DH.tr(e.message)); });
    });
    on("reset", function () {
      var msg = st.account
        ? "Reset your progress? Your XP, streak, lessons and preferences will be erased from your account."
        : "Reset everything? Your XP, streak, progress and preferences will be erased from this device.";
      if (!confirm(DH.tr(msg))) return;
      var account = st.account;
      DH.store.reset();
      if (account) { DH.store.state.account = account; DH.store.save(); }
      self.onboard(account ? 1 : 0, {});
    });
  }
};

document.addEventListener("DOMContentLoaded", function () { DH.app.init(); });
