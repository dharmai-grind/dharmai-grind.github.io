// The lesson player: builds a lesson to fit the learner's preferences, then
// plays it card by card, Duolingo-style.

DH.shuffle = function (arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};

// ---------- Fitting a lesson to the learner ----------
// Lesson length decides how many questions and whether deep-dive cards show.
// Focus (critical thinking / trivia / both) decides which questions are picked.
// Topic level (for units with a "topic", like calculus): "new" | "basics" | "well".
// Cards marked lv: "new" are only for beginners (plain-words history);
// cards marked lv: "adv" are only for people who know the basics or more (the math).
DH.LEVELS = [
  ["new", "New to it", "Keep it to the story and ideas, no jargon"],
  ["basics", "Know the basics", "Show me some of the math"],
  ["well", "Know it well", "Go into the details"]
];
DH.levelFits = function (card, level) {
  if (!card.lv) return true;
  if (card.lv === "new") return level === "new";
  if (card.lv === "adv") return level === "basics" || level === "well";
  return true;
};
DH.unitOf = function (course, lessonId) {
  return course.units.find(function (u) { return u.lessons.some(function (l) { return l.id === lessonId; }); });
};

DH.buildLesson = function (lesson, prefs, level) {
  prefs = prefs || {};
  lesson = Object.assign({}, lesson, { cards: lesson.cards.filter(function (c) { return DH.levelFits(c, level); }) });
  var len = prefs.length || "medium";
  var quota = { short: 3, medium: 5, long: 99 }[len];
  var focus = prefs.focus || "both";
  var isQ = function (c) { return ["mcq", "tf", "match", "order"].indexOf(c.t) >= 0; };

  var questions = lesson.cards.filter(isQ).map(function (c, i) {
    var rank = c.tag === "core" ? 0 : (focus === "both" || c.tag === focus) ? 1 : 2;
    return { c: c, rank: rank, i: i };
  });
  questions.sort(function (a, b) { return a.rank - b.rank || a.i - b.i; });
  var keep = new Set(questions.slice(0, quota).map(function (x) { return x.c; }));

  return lesson.cards.filter(function (c) {
    if (c.t === "teach") return !c.deep || len === "long";
    if (c.t === "reflect") return len !== "short" || focus !== "trivia";
    if (c.t === "debate") return prefs.debate && prefs.debate !== "none";
    return keep.has(c);
  });
};

// Every piece of text in a lesson, for translating up front.
DH.LESSON_UI = ["Continue", "Check", "True", "False", "Try again", "Not quite", "Nice!", "Great job!", "Correct!",
  "Well reasoned!", "You'll see this one again at the end.", "Pick an answer first", "Tap a pair to match them",
  "Place every item first", "Correct order:", "Think about it", "Ask dharmAI after the lesson", "My thoughts:",
  "Write your thoughts (optional, stays on your device)", "Mini debate", "Skip", "Save to my debates",
  "Pick a side first", "Pick the side you want to defend.", "Pick a side to start with. You'll argue both.",
  "Angada assigned you a side. You don't have to agree with it!", "Lesson complete!", "XP", "Accuracy", "Streak",
  "You saved these for dharmAI:", "Machine translated", "Summary, not a quote", "Tradition",
  "Quit this lesson? Your progress in it won't be saved."];
DH.lessonStrings = function (cards) {
  var out = DH.LESSON_UI.slice();
  cards.forEach(function (c) {
    [c.title, c.body, c.q, c.why].forEach(function (s) { if (s) out.push(s); });
    (c.opts || []).forEach(function (s) { out.push(s); });
    (c.items || []).forEach(function (s) { out.push(s); });
    (c.sides || []).forEach(function (s) { out.push(s); });
    (c.pairs || []).forEach(function (p) { out.push(p[0], p[1]); });
    if (c.src && DH.SOURCES[c.src]) out.push(DH.SOURCES[c.src].en);
  });
  return out;
};

DH.prefetchTr = function (strings) {
  if (DH.lang() === "en" || !DH.ai.configured()) return Promise.resolve();
  strings.forEach(function (s) { DH.tr(s); });
  return new Promise(function (resolve) {
    var step = function () {
      if (!DH.i18n.want.size) return resolve();
      DH.i18n.flush(step);
    };
    step();
  });
};

// ---------- Sounds ----------
DH.sound = function (kind) {
  try {
    var ctx = DH._audio || (DH._audio = new (window.AudioContext || window.webkitAudioContext)());
    var notes = { right: [660, 880], wrong: [220, 180], done: [523, 659, 784, 1047] }[kind];
    notes.forEach(function (f, i) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = kind === "wrong" ? "sawtooth" : "sine";
      o.frequency.value = f;
      var t = ctx.currentTime + i * 0.11;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.22);
    });
  } catch (e) { }
};

// ---------- Verse / source box ----------
DH.sourceBox = function (id) {
  var s = DH.SOURCES[id];
  if (!s) return "";
  var label = s.kind === "summary" ? "Summary, not a quote" : s.kind === "tradition" ? "Tradition" : "";
  return '<div class="verse">' +
    (s.sa ? '<div class="sa" lang="' + (s.olang || "sa") + '">' + DH.esc(s.sa) + '</div><div class="iast">' + DH.esc(s.iast) + "</div>" : "") +
    '<div class="vtr">' + DH.t(s.en) + "</div>" +
    '<button class="chip cite" data-src="' + id + '"><i class="ti ti-book"></i> ' + DH.esc(DH.cite(id)) +
    (label ? ' · ' + DH.t(label) : "") + "</button></div>";
};

DH.paras = function (text) {
  return DH.tr(text).split("\n").map(function (line) {
    return line.trim().indexOf("•") === 0
      ? '<div class="bullet">' + DH.esc(line.trim().slice(1).trim()) + "</div>"
      : "<p>" + DH.esc(line) + "</p>";
  }).join("");
};

// ---------- Player ----------
DH.Lesson = function (course, lesson, onExit) {
  this.course = course;
  this.lesson = lesson;
  this.onExit = onExit;
  var unit = DH.unitOf(course, lesson.id);
  var level = unit && unit.topic ? (DH.store.state.levels || {})[unit.topic] || "new" : null;
  this.queue = DH.buildLesson(lesson, DH.store.state.prefs, level).map(function (c) { return Object.assign({}, c); });
  this.total = this.queue.length;
  this.i = 0;
  this.xp = 0;
  this.asked = 0;
  this.firstTry = 0;
  this.later = []; // reflect/debate prompts saved for after the lesson
  this.root = document.getElementById("app");
};

DH.Lesson.prototype.start = function () {
  var self = this;
  self.root.innerHTML = '<div class="center-screen">' + DH.angada(110, "think") + "<p>" + DH.t("Getting your lesson ready...") + "</p></div>";
  DH.prefetchTr(DH.lessonStrings(self.queue)).then(function () { self.render(); });
};

DH.Lesson.prototype.render = function () {
  var self = this, c = self.queue[self.i];
  if (!c) return self.finish();
  var pct = Math.round((self.i / self.queue.length) * 100);
  var html = '<div class="lesson">' +
    '<div class="lesson-top"><button class="icon-btn" id="quit" aria-label="Quit lesson"><i class="ti ti-x"></i></button>' +
    '<div class="bar"><div style="width:' + pct + '%"></div></div></div>' +
    (DH.lang() !== "en" && DH.ai.configured() ? '<div class="mt-note">' + DH.t("Machine translated") + "</div>" : "") +
    '<div class="card-body" id="cardBody">' + self["view_" + c.t](c) + "</div>" +
    '<div class="lesson-foot" id="foot"></div></div>';
  self.root.innerHTML = html;
  document.getElementById("quit").onclick = function () {
    if (confirm(DH.tr("Quit this lesson? Your progress in it won't be saved."))) self.onExit();
  };
  self["bind_" + c.t](c);
};

DH.Lesson.prototype.foot = function (html) {
  document.getElementById("foot").innerHTML = html;
};

DH.Lesson.prototype.next = function () {
  this.i++;
  this.render();
};

// Shows the green/red result bar, then Continue.
DH.Lesson.prototype.result = function (c, ok) {
  var self = this;
  if (!c.retry) {
    self.asked++;
    if (ok) { self.firstTry++; self.xp += 10; }
  }
  if (!ok && !c.retry) {
    var again = Object.assign({}, c, { retry: true });
    self.queue.push(again);
  }
  DH.sound(ok ? "right" : "wrong");
  var why = c.why ? "<p>" + DH.t(c.why) + "</p>" : "";
  self.foot('<div class="feedback ' + (ok ? "good" : "bad") + '">' +
    '<div class="fb-head">' + DH.angada(44, ok ? "cheer" : "oops") +
    "<strong>" + DH.t(ok ? DH.pick(["Nice!", "Great job!", "Correct!", "Well reasoned!"]) : "Not quite") + "</strong></div>" +
    why + (!ok && !c.retry ? '<p class="small">' + DH.t("You'll see this one again at the end.") + "</p>" : "") +
    '<button class="btn ' + (ok ? "primary" : "danger") + '" id="cont">' + DH.t("Continue") + "</button></div>");
  document.getElementById("cont").onclick = function () { self.next(); };
  document.getElementById("cont").focus();
};

DH.pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

// --- teach ---
DH.Lesson.prototype.view_teach = function (c) {
  return '<h2 class="card-title">' + DH.t(c.title) + "</h2>" + DH.paras(c.body) + (c.src ? DH.sourceBox(c.src) : "");
};
DH.Lesson.prototype.bind_teach = function () {
  var self = this;
  self.foot('<button class="btn primary" id="cont">' + DH.t("Continue") + "</button>");
  document.getElementById("cont").onclick = function () { self.next(); };
};

// --- mcq / tf ---
DH.Lesson.prototype.view_mcq = function (c) {
  if (!c.order) c.order = DH.shuffle(c.opts.map(function (_, i) { return i; }));
  return (c.retry ? '<div class="tag-retry">' + DH.t("Try again") + "</div>" : "") +
    (c.src ? DH.sourceBox(c.src) : "") +
    '<h2 class="card-title">' + DH.t(c.q) + "</h2>" +
    '<div class="opts">' + c.order.map(function (i) {
      return '<button class="opt" data-i="' + i + '">' + DH.t(c.opts[i]) + "</button>";
    }).join("") + "</div>";
};
DH.Lesson.prototype.bind_mcq = function (c, answer) {
  var self = this, chosen = null;
  var A = answer === undefined ? c.a : answer;
  self.foot('<div class="err" id="err"></div><button class="btn primary" id="check">' + DH.t("Check") + "</button>");
  var opts = document.querySelectorAll(".opt");
  opts.forEach(function (b) {
    b.onclick = function () {
      opts.forEach(function (x) { x.classList.remove("sel"); });
      b.classList.add("sel");
      chosen = +b.dataset.i;
      document.getElementById("err").textContent = "";
    };
  });
  document.getElementById("check").onclick = function () {
    if (chosen === null) {
      document.getElementById("err").textContent = DH.tr("Pick an answer first");
      return;
    }
    var ok = chosen === A;
    opts.forEach(function (x) {
      x.disabled = true;
      if (+x.dataset.i === A) x.classList.add("right");
      else if (+x.dataset.i === chosen) x.classList.add("wrong");
    });
    self.result(c, ok);
  };
};
DH.Lesson.prototype.view_tf = function (c) {
  c.opts = ["True", "False"];
  c.order = [0, 1];
  return this.view_mcq(c);
};
DH.Lesson.prototype.bind_tf = function (c) {
  this.bind_mcq(c, c.a ? 0 : 1);
};

// --- match ---
DH.Lesson.prototype.view_match = function (c) {
  var left = DH.shuffle(c.pairs.map(function (p, i) { return i; }));
  var right = DH.shuffle(c.pairs.map(function (p, i) { return i; }));
  return '<h2 class="card-title">' + DH.t(c.q) + "</h2>" +
    '<div class="match"><div>' + left.map(function (i) {
      return '<button class="opt m" data-side="l" data-i="' + i + '">' + DH.t(c.pairs[i][0]) + "</button>";
    }).join("") + "</div><div>" + right.map(function (i) {
      return '<button class="opt m" data-side="r" data-i="' + i + '">' + DH.t(c.pairs[i][1]) + "</button>";
    }).join("") + "</div></div>";
};
DH.Lesson.prototype.bind_match = function (c) {
  var self = this, picked = { l: null, r: null }, done = 0, mistakes = 0;
  self.foot('<p class="hint">' + DH.t("Tap a pair to match them") + "</p>");
  document.querySelectorAll(".m").forEach(function (b) {
    b.onclick = function () {
      if (b.disabled) return;
      var side = b.dataset.side;
      if (picked[side]) picked[side].classList.remove("sel");
      picked[side] = b;
      b.classList.add("sel");
      if (picked.l && picked.r) {
        var L = picked.l, R = picked.r;
        if (L.dataset.i === R.dataset.i) {
          [L, R].forEach(function (x) { x.classList.remove("sel"); x.classList.add("right"); x.disabled = true; });
          DH.sound("right");
          done++;
          if (done === c.pairs.length) self.result(c, mistakes === 0);
        } else {
          mistakes++;
          DH.sound("wrong");
          [L, R].forEach(function (x) { x.classList.add("shake"); });
          setTimeout(function () { [L, R].forEach(function (x) { x.classList.remove("shake", "sel"); }); }, 450);
        }
        picked = { l: null, r: null };
      }
    };
  });
};

// --- order ---
DH.Lesson.prototype.view_order = function (c) {
  if (!c.bank) {
    do { c.bank = DH.shuffle(c.items.map(function (_, i) { return i; })); }
    while (c.items.length > 1 && c.bank.every(function (v, i) { return v === i; }));
  }
  return '<h2 class="card-title">' + DH.t(c.q) + "</h2>" +
    '<div class="answer-row" id="ans"></div>' +
    '<div class="bank" id="bank">' + c.bank.map(function (i) {
      return '<button class="opt tile" data-i="' + i + '">' + DH.t(c.items[i]) + "</button>";
    }).join("") + "</div>";
};
DH.Lesson.prototype.bind_order = function (c) {
  var self = this;
  var ans = document.getElementById("ans"), bank = document.getElementById("bank");
  self.foot('<div class="err" id="err"></div><button class="btn primary" id="check">' + DH.t("Check") + "</button>");
  var move = function (b) {
    (b.parentNode === bank ? ans : bank).appendChild(b);
    document.getElementById("err").textContent = "";
  };
  document.querySelectorAll(".tile").forEach(function (b) { b.onclick = function () { if (!b.disabled) move(b); }; });
  document.getElementById("check").onclick = function () {
    var got = Array.from(ans.children).map(function (b) { return +b.dataset.i; });
    if (got.length !== c.items.length) {
      document.getElementById("err").textContent = DH.tr("Place every item first");
      return;
    }
    var ok = got.every(function (v, i) { return v === i; });
    Array.from(ans.children).forEach(function (b, i) {
      b.disabled = true;
      b.classList.add(+b.dataset.i === i ? "right" : "wrong");
    });
    if (!ok) c.why = DH.tr("Correct order:") + " " + c.items.map(DH.tr).join(" → ");
    self.result(c, ok);
  };
};

// --- reflect ---
DH.Lesson.prototype.view_reflect = function (c) {
  return '<div class="think-head">' + DH.angada(70, "think") + '<span class="pill">' + DH.t("Think about it") + "</span></div>" +
    '<h2 class="card-title">' + DH.t(c.q) + "</h2>" +
    '<textarea id="refl" rows="4" placeholder="' + DH.esc(DH.tr("Write your thoughts (optional, stays on your device)")) + '"></textarea>';
};
DH.Lesson.prototype.bind_reflect = function (c) {
  var self = this;
  self.foot('<button class="btn" id="later"><i class="ti ti-message-circle"></i> ' + DH.t("Ask dharmAI after the lesson") + "</button>" +
    '<button class="btn primary" id="cont">' + DH.t("Continue") + "</button>");
  document.getElementById("later").onclick = function () {
    var mine = document.getElementById("refl").value.trim();
    self.later.push({ mode: "ask", q: DH.tr(c.q) + (mine ? "\n\n" + DH.tr("My thoughts:") + " " + mine : ""), label: DH.tr(c.q) });
    self.next();
  };
  document.getElementById("cont").onclick = function () { self.next(); };
};

// --- debate ---
DH.Lesson.prototype.view_debate = function (c) {
  var p = DH.store.state.prefs || {};
  var sides = c.sides.slice();
  var assigned = p.debate === "assign" ? sides[Math.floor(Math.random() * sides.length)] : null;
  c.assigned = assigned;
  return '<div class="think-head">' + DH.angada(70, "cheer") + '<span class="pill saffron">' + DH.t("Mini debate") + "</span></div>" +
    '<h2 class="card-title">' + DH.t(c.q) + "</h2>" +
    (assigned
      ? "<p>" + DH.t("Angada assigned you a side. You don't have to agree with it!") + '</p><div class="opts"><button class="opt sel" data-side="' + DH.esc(assigned) + '">' + DH.t(assigned) + "</button></div>"
      : "<p>" + DH.t(p.debate === "both" ? "Pick a side to start with. You'll argue both." : "Pick the side you want to defend.") + '</p><div class="opts">' +
        sides.map(function (s) { return '<button class="opt" data-side="' + DH.esc(s) + '">' + DH.t(s) + "</button>"; }).join("") + "</div>");
};
DH.Lesson.prototype.bind_debate = function (c) {
  var self = this, side = c.assigned;
  self.foot('<div class="err" id="err"></div><button class="btn" id="skip">' + DH.t("Skip") + "</button>" +
    '<button class="btn primary" id="go">' + DH.t("Save to my debates") + "</button>");
  document.querySelectorAll(".opt").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("sel"); });
      b.classList.add("sel");
      side = b.dataset.side;
      document.getElementById("err").textContent = "";
    };
  });
  document.getElementById("skip").onclick = function () { self.next(); };
  document.getElementById("go").onclick = function () {
    if (!side) { document.getElementById("err").textContent = DH.tr("Pick a side first"); return; }
    self.later.push({ mode: "debate", q: DH.tr(c.q), side: DH.tr(side), label: DH.tr(c.q) });
    // Also keep it in the Debate tab's "Saved debates" list until you start or remove it.
    var st = DH.store.state;
    st.savedDebates = st.savedDebates || [];
    var dup = st.savedDebates.some(function (d) { return d.topic === DH.tr(c.q) && d.side === DH.tr(side); });
    if (!dup) st.savedDebates.push({ topic: DH.tr(c.q), side: DH.tr(side), from: DH.tr(self.lesson.title) });
    DH.store.save();
    self.next();
  };
};

// ---------- Finish ----------
DH.Lesson.prototype.finish = function () {
  var self = this, st = DH.store.state;
  var prog = st.progress[self.course.id] = st.progress[self.course.id] || { done: [] };
  var firstTime = prog.done.indexOf(self.lesson.id) < 0;
  if (firstTime) prog.done.push(self.lesson.id);
  var bonus = firstTime ? 15 : 5;
  self.xp += bonus;
  st.xp += self.xp;

  var today = DH.today();
  if (st.lastDay !== today) {
    var y = new Date(); y.setDate(y.getDate() - 1);
    var yest = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
    st.streak = st.lastDay === yest ? st.streak + 1 : 1;
    st.lastDay = today;
  }
  DH.store.save();
  DH.sound("done");

  var acc = self.asked ? Math.round((self.firstTry / self.asked) * 100) : 100;
  self.root.innerHTML = '<div class="center-screen done">' + DH.angada(150, "cheer") +
    "<h1>" + DH.t("Lesson complete!") + "</h1>" +
    '<div class="stats"><div class="stat xp"><span>' + DH.t("XP") + "</span><b>+" + self.xp + "</b></div>" +
    '<div class="stat acc"><span>' + DH.t("Accuracy") + "</span><b>" + acc + "%</b></div>" +
    '<div class="stat fire"><span>' + DH.t("Streak") + '</span><b><i class="ti ti-flame"></i> ' + st.streak + "</b></div></div>" +
    (self.later.length ? '<div class="later"><p>' + DH.t("You saved these for dharmAI:") + "</p>" +
      self.later.map(function (l, i) {
        return '<button class="btn" data-l="' + i + '"><i class="ti ti-' + (l.mode === "debate" ? "swords" : "message-circle") + '"></i> ' + DH.esc(l.label) + "</button>";
      }).join("") + "</div>" : "") +
    '<button class="btn primary" id="cont">' + DH.t("Continue") + "</button></div>";
  document.getElementById("cont").onclick = function () { self.onExit(); };
  document.querySelectorAll("[data-l]").forEach(function (b) {
    b.onclick = function () { DH.app.openAsk(self.later[+b.dataset.l]); };
  });
};
