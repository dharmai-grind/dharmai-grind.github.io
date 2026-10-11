// The app shell: onboarding, home (course map), courses, Ask dharmAI, profile.

DH.app = {
  tab: "learn",
  askState: { mode: "ask", side: "", topic: "" },

  init: function () {
    DH.store.load();
    DH.i18n.loadCache();
    this.applyDir();
    if (!DH.store.state.prefs) this.onboard(0, {});
    else this.go(this.tab);
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      navigator.serviceWorker.register("sw.js").catch(function () { });
    }
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
        '<h1 class="brand">dharm<span>AI</span></h1>' +
        '<div class="bubble">' + t("Namaste! I'm Angada. In the Rāmāyaṇa I carried Rāma's message into Rāvaṇa's court and stood my ground. Let's explore big ideas together, a few minutes at a time.") + "</div>" +
        '<button class="btn primary wide" id="next">' + t("Get started") + "</button></div>";
    }
    if (name === "school") {
      body = "<h1>" + t("Which school would you like to explore?") + "</h1>" +
        '<div class="opts">' +
        choice("school", "vishishtadvaita", "Vishishtadvaita Vedanta", "Rāmānuja: one reality, with real selves and world as its body") +
        choice("school", "explore", "I'm new. Help me explore!", "Starts with Vishishtadvaita, whose first unit compares all three schools") +
        DH.CATALOG.filter(function (c) { return c.kind === "school" && c.status === "soon"; }).map(function (c) {
          return '<button class="opt big soon" data-soon="1" disabled><b>' + t(c.title) + ' <span class="pill soon-pill">' + t("Coming soon") + "</span></b><small>" + t(c.blurb) + "</small></button>";
        }).join("") +
        "</div>";
    }
    if (name === "tradition") {
      body = "<h1>" + t("Any particular tradition or background?") + "</h1>" +
        "<p>" + t("Optional. Type a tradition, sampradāya, region or family practice, and dharmAI will look for relevant texts and commentaries. You can also leave this blank.") + "</p>" +
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
        (DH.ai.configured() ? "" : '<p class="small warn">' + t("Translation switches on once dharmAI's AI is connected. Until then, everything shows in English.") + "</p>");
    }
    if (name === "length") {
      body = "<h1>" + t("How long should lessons be?") + "</h1><p>" + t("dharmAI shapes every lesson to fit.") + '</p><div class="opts">' +
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
      if (name === "school" && !draft.school) return err("Pick a school to continue");
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
    st.prefs = {
      school: "vishishtadvaita", explore: draft.school === "explore",
      tradition: draft.tradition || "", lang: draft.lang || "en",
      length: draft.length, focus: draft.focus, debate: draft.debate
    };
    if (st.courses.indexOf("vishishtadvaita") < 0) st.courses.push("vishishtadvaita");
    if (this.festivalOn() && st.courses.indexOf("navaratri") < 0) st.courses.push("navaratri");
    st.active = "vishishtadvaita";
    DH.store.save();
    this.applyDir();
    this.go("learn");
  },

  // ---------- Shell ----------
  go: function (tab) {
    this.tab = tab;
    var self = this, rerender = function () { self.go(tab); };
    var content = this["screen_" + tab]();
    var nav = [["learn", "ti-home", "Learn"], ["courses", "ti-books", "Courses"], ["ask", "ti-message-circle", "Ask"], ["me", "ti-user", "Profile"]];
    var st = DH.store.state;
    var html = '<div class="shell"><header class="topbar">' +
      '<span class="brand small">dharm<span>AI</span></span>' +
      '<span class="pill saffron"><i class="ti ti-flame"></i> ' + st.streak + "</span>" +
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
      '<p class="small">' + DH.t(s.kind === "verse" ? "Original text with a dharmAI translation." : s.kind === "summary" ? "This is a summary of the work's position, not a direct quote." : "This describes a living tradition; practice varies by region and family.") + "</p></div>";
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

    var soon = course.id === "vishishtadvaita"
      ? '<div class="soon-card"><i class="ti ti-hourglass"></i><div><b>' + DH.t("Advaita and Dvaita are coming soon") + "</b><span>" + DH.t("Full courses for Śaṅkara's and Madhva's schools are on the way.") + "</span></div></div>" : "";

    return chips + fest + '<div class="course-title"><h1>' + DH.t(course.title) + "</h1><p>" + DH.t(course.subtitle) + "</p></div>" + map + soon +
      '<button class="fab" data-tab="ask" aria-label="Ask dharmAI"><i class="ti ti-message-circle"></i></button>';
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
        new DH.Lesson(course, lesson, function () { self.go("learn"); }).start();
      };
    });
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
      "<h2>" + DH.t("Festivals") + "</h2>" + DH.CATALOG.filter(function (c) { return c.kind === "festival"; }).map(card).join("");
  },

  bind_courses: function () {
    var self = this;
    document.querySelectorAll("[data-add]").forEach(function (b) { b.onclick = function () { self.addCourse(b.dataset.add); }; });
    document.querySelectorAll("[data-open]").forEach(function (b) {
      b.onclick = function () { DH.store.state.active = b.dataset.open; DH.store.save(); self.go("learn"); };
    });
  },

  // ---------- Ask dharmAI ----------
  openAsk: function (item) {
    this.askState = { mode: item.mode, side: item.side || "", topic: item.mode === "debate" ? item.q : "" };
    this.pendingQuestion = item.mode === "debate"
      ? DH.tr("Let's debate:") + " " + item.q + "\n" + DH.tr("My side:") + " " + item.side
      : item.q;
    this.go("ask");
  },

  renderAnswer: function (text) {
    var html = DH.esc(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
    return html.replace(/\[\[([\w.\-]+)\]\]/g, function (m, id) {
      return DH.SOURCES[id] ? '<button class="chip cite" data-src="' + id + '"><i class="ti ti-book"></i> ' + DH.esc(DH.cite(id)) + "</button>" : "";
    });
  },

  screen_ask: function () {
    var st = DH.store.state, self = this, a = this.askState;
    var msgs = st.chat.map(function (m) {
      if (m.role === "user") return '<div class="msg user" dir="auto">' + DH.esc(m.text).replace(/\n/g, "<br>") + "</div>";
      var body = m.offline
        ? "<p>" + DH.t("dharmAI's AI isn't connected yet, so here are the passages in our library that best match your question:") + "</p>" +
          (m.ids.length ? m.ids.map(function (id) { return '<button class="chip cite" data-src="' + id + '"><i class="ti ti-book"></i> ' + DH.esc(DH.cite(id)) + "</button>"; }).join(" ")
            : "<p>" + DH.t("Nothing in the library matched. Try other words.") + "</p>")
        : m.error ? '<p class="err">' + DH.esc(m.text) + "</p>" : '<div dir="auto">' + self.renderAnswer(m.text) + "</div>";
      return '<div class="msg bot">' + DH.angada(34, m.mode === "debate" ? "cheer" : "happy") + '<div class="bot-body">' + body + "</div></div>";
    }).join("");
    var empty = !st.chat.length
      ? '<div class="ask-empty">' + DH.angada(110, "happy") + '<h1 class="ask-title">' + DH.t("AI and Dharma") + "</h1><p>" + DH.t("Ask me anything about Hindu philosophy, history, texts or festivals. I'll point you to the sources.") + "</p>" +
        '<div class="suggest">' + ["What is the difference between Advaita and Vishishtadvaita?", "Why do we keep Golu?", "What does tat tvam asi mean?", "Who were the Āḻvārs?"].map(function (q) {
          return '<button class="chip" data-q="' + DH.esc(DH.tr(q)) + '">' + DH.t(q) + "</button>";
        }).join("") + "</div></div>" : "";
    return '<div class="ask">' +
      '<div class="mode-switch"><button class="' + (a.mode === "ask" ? "on" : "") + '" data-mode="ask"><i class="ti ti-message-circle"></i> ' + DH.t("Ask") + "</button>" +
      '<button class="' + (a.mode === "debate" ? "on" : "") + '" data-mode="debate"><i class="ti ti-swords"></i> ' + DH.t("Debate") + "</button></div>" +
      (a.mode === "debate" ? '<div class="debate-note">' + DH.t("Debate mode: state a position and Angada will raise respectful objections. He'll challenge arguments, not you.") + "</div>" : "") +
      '<div class="msgs" id="msgs">' + empty + msgs + '<div id="typing" hidden class="msg bot">' + DH.angada(34, "think") + '<div class="bot-body dots"><span></span><span></span><span></span></div></div></div>' +
      '<div class="notice"><i class="ti ti-info-circle"></i> ' + DH.t("Answers can be wrong. Check the cited sources, and don't share personal information.") +
      (st.chat.length ? ' <button class="link" id="clear">' + DH.t("Clear chat") + "</button>" : "") + "</div>" +
      '<form class="composer" id="composer"><textarea id="q" rows="1" maxlength="1000" placeholder="' + DH.esc(DH.tr(a.mode === "debate" ? "State your position..." : "Ask anything...")) + '" dir="auto"></textarea>' +
      '<button class="send" aria-label="Send"><i class="ti ti-send"></i></button></form><div class="err" id="err"></div></div>';
  },

  bind_ask: function () {
    var self = this, st = DH.store.state;
    var box = document.getElementById("q");
    var msgs = document.getElementById("msgs");
    msgs.scrollTop = msgs.scrollHeight;
    if (self.pendingQuestion) { box.value = self.pendingQuestion; self.pendingQuestion = null; }
    document.querySelectorAll("[data-mode]").forEach(function (b) {
      b.onclick = function () { self.askState.mode = b.dataset.mode; self.go("ask"); };
    });
    document.querySelectorAll("[data-q]").forEach(function (b) {
      b.onclick = function () { box.value = b.dataset.q; box.focus(); };
    });
    if (document.getElementById("clear")) document.getElementById("clear").onclick = function () { st.chat = []; DH.store.save(); self.go("ask"); };
    box.oninput = function () { document.getElementById("err").textContent = ""; };
    box.onkeydown = function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); document.getElementById("composer").requestSubmit(); }
    };
    document.getElementById("composer").onsubmit = function (e) {
      e.preventDefault();
      var q = box.value.trim();
      if (!q) { document.getElementById("err").textContent = DH.tr("Type a question first"); return; }
      var mode = self.askState.mode;
      var history = st.chat.filter(function (m) { return !m.offline && !m.error; }).map(function (m) { return { role: m.role, text: m.text }; });
      st.chat.push({ role: "user", text: q, mode: mode });
      DH.store.save();
      self.go("ask");
      document.getElementById("typing").hidden = false;
      var m2 = document.getElementById("msgs"); m2.scrollTop = m2.scrollHeight;
      DH.ai.ask({ question: q, history: history, mode: mode, side: self.askState.side }).then(function (r) {
        if (r.offline) st.chat.push({ role: "bot", offline: true, ids: r.ids, mode: mode });
        else st.chat.push({ role: "bot", text: r.text, mode: mode });
      }).catch(function (err) {
        st.chat.push({ role: "bot", error: true, text: DH.tr("dharmAI couldn't answer right now (the free AI may be busy). Try again in a minute."), mode: mode });
      }).then(function () {
        st.chat = st.chat.slice(-40);
        DH.store.save();
        if (self.tab === "ask") self.go("ask");
      });
    };
  },

  // ---------- Profile ----------
  screen_me: function () {
    var st = DH.store.state, p = st.prefs, t = DH.t;
    var sel = function (key, options) {
      return '<select data-pref="' + key + '">' + options.map(function (o) {
        return '<option value="' + o[0] + '"' + (p[key] === o[0] ? " selected" : "") + ">" + t(o[1]) + "</option>";
      }).join("") + "</select>";
    };
    var lessons = 0;
    Object.keys(st.progress).forEach(function (k) { lessons += st.progress[k].done.length; });
    return '<div class="me-head">' + DH.angada(90, "happy") + "<div><h1>" + t("Your profile") + "</h1><p>" + t("Everything is saved only on this device. No account needed.") + "</p></div></div>" +
      '<div class="stats"><div class="stat fire"><span>' + t("Day streak") + "</span><b>" + st.streak + '</b></div><div class="stat xp"><span>' + t("Total XP") + "</span><b>" + st.xp + '</b></div><div class="stat acc"><span>' + t("Lessons") + "</span><b>" + lessons + "</b></div></div>" +
      "<h2>" + t("Preferences") + "</h2>" +
      '<label class="field"><span>' + t("Language") + '</span><select data-pref="lang">' + DH.LANGUAGES.map(function (l) {
        return '<option value="' + l.code + '"' + (p.lang === l.code ? " selected" : "") + ">" + DH.esc(l.native + " · " + l.name) + "</option>";
      }).join("") + "</select></label>" +
      '<label class="field"><span>' + t("Tradition or background") + '</span><input data-pref="tradition" maxlength="120" value="' + DH.esc(p.tradition) + '"></label>' +
      '<label class="field"><span>' + t("Lesson length") + "</span>" + sel("length", [["short", "About 2 minutes"], ["medium", "About 5 minutes"], ["long", "10 minutes or more"]]) + "</label>" +
      '<label class="field"><span>' + t("More of") + "</span>" + sel("focus", [["think", "Critical thinking"], ["trivia", "Trivia"], ["both", "Both"]]) + "</label>" +
      '<label class="field"><span>' + t("Debates") + "</span>" + sel("debate", [["choose", "Yes, I pick my side"], ["assign", "Yes, assign me a side"], ["both", "Yes, let me argue both sides"], ["none", "No debates, just lessons"]]) + "</label>" +
      '<p class="small" id="saved"></p>' +
      "<h2>" + t("About dharmAI") + "</h2><p>" + t("dharmAI teaches from primary texts, quoted in Sanskrit with our own translations, and marks summaries and regional traditions separately. It is a learning tool, not a religious authority. For questions about your own practice, ask your family, teacher or ācārya.") + "</p>" +
      '<button class="btn danger" id="reset"><i class="ti ti-trash"></i> ' + t("Reset all progress") + "</button>";
  },

  bind_me: function () {
    var self = this, st = DH.store.state;
    document.querySelectorAll("[data-pref]").forEach(function (el) {
      el.onchange = function () {
        st.prefs[el.dataset.pref] = el.value.trim();
        DH.store.save();
        if (el.dataset.pref === "lang") { self.applyDir(); self.go("me"); return; }
        document.getElementById("saved").textContent = DH.tr("Saved");
      };
    });
    document.getElementById("reset").onclick = function () {
      if (confirm(DH.tr("Reset everything? Your XP, streak, progress and preferences will be erased from this device."))) {
        DH.store.reset();
        self.onboard(0, {});
      }
    };
  }
};

document.addEventListener("DOMContentLoaded", function () { DH.app.init(); });
