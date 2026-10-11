// Read-aloud (voiceover) using the voices built into the device (free, works
// offline, many languages). We pick the most natural-sounding voice available.

DH.voice = {
  voices: [],
  speakingBtn: null,
  supported: "speechSynthesis" in window,

  init: function () {
    if (!this.supported) return;
    var self = this;
    var load = function () {
      var had = self.voices.length;
      self.voices = window.speechSynthesis.getVoices() || [];
      // Voices often load a moment after the page; refresh the settings list if it's open.
      if (!had && self.voices.length && DH.app.tab === "me" && document.querySelector('[data-pref="voice"]')) DH.app.go("me");
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    // One click handler for every read-aloud button in the app.
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-say]");
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      if (self.speakingBtn === b) { self.stop(); return; }
      var parts = [];
      try { parts = JSON.parse(b.getAttribute("data-say")); } catch (err) { parts = [{ text: b.getAttribute("data-say") }]; }
      self.say(parts, b);
    }, true);
  },

  // Higher score = more natural-sounding.
  score: function (v, lang) {
    var n = v.name, s = 0;
    if (/natural|neural/i.test(n)) s += 50;
    if (/premium|enhanced|siri/i.test(n)) s += 40;
    if (/google/i.test(n)) s += 30;
    if (/online/i.test(n)) s += 15;
    if (/microsoft/i.test(n) && !/natural|online/i.test(n)) s -= 15; // old robotic desktop voices
    if (/espeak|compact|novelty|bad news|bells|whisper|zarvox|trinoids|bubbles|boing/i.test(n)) s -= 80;
    // English: American accent. Indian languages: their standard Indian voice (hi-IN, ta-IN...).
    if (lang === "en") s += /en[-_]US/i.test(v.lang) ? 60 : -10;
    if (lang !== "en" && /[-_]IN$/i.test(v.lang)) s += 20;
    if (v.default) s += 2;
    return s;
  },

  // Voices for a language code like "en", "ta", "zh-TW", best first.
  forLang: function (lang) {
    lang = (lang || "en").toLowerCase();
    var exact = this.voices.filter(function (v) { return v.lang.toLowerCase().replace("_", "-") === lang; });
    var base = lang.split("-")[0];
    var list = exact.length ? exact : this.voices.filter(function (v) { return v.lang.toLowerCase().split(/[-_]/)[0] === base; });
    var self = this;
    return list.slice().sort(function (a, b) { return self.score(b, base) - self.score(a, base); });
  },

  pick: function (lang) {
    var p = (DH.store.state && DH.store.state.prefs) || {};
    var list = this.forLang(lang);
    if (p.voice && p.voice !== "auto" && lang.split("-")[0] === DH.lang().split("-")[0]) {
      var chosen = list.find(function (v) { return v.voiceURI === p.voice; });
      if (chosen) return chosen;
    }
    return list[0] || null;
  },

  // Turn app text (markdown, citations, bullets) into something nice to hear.
  clean: function (text) {
    return String(text || "")
      .replace(/\[\[[^\]]+\]\]/g, "")
      .replace(/\*\*|__|`/g, "")
      .replace(/\*/g, "")
      .replace(/•/g, ".")
      .replace(/→/g, ", then ")
      .replace(/\s+/g, " ")
      .trim();
  },

  // Split long text so browsers don't cut off long speech.
  chunks: function (text) {
    var out = [], cur = "";
    String(text).split(/(?<=[.!?।॥])\s+/).forEach(function (s) {
      if ((cur + " " + s).length > 180 && cur) { out.push(cur); cur = s; }
      else cur = cur ? cur + " " + s : s;
    });
    if (cur) out.push(cur);
    return out;
  },

  // parts: [{ text, lang }]; lang defaults to the app language.
  say: function (parts, btn) {
    if (!this.supported) { DH.app.toast(DH.tr("Read-aloud isn't supported in this browser.")); return; }
    this.stop();
    var self = this, synth = window.speechSynthesis;
    var rate = parseFloat(((DH.store.state || {}).prefs || {}).rate) || 1;
    var queue = [], missing = false;
    parts.forEach(function (p) {
      var lang = p.lang || DH.lang();
      var voice = self.pick(lang);
      if (!voice) { missing = true; return; }
      self.chunks(self.clean(p.text)).forEach(function (c) {
        var u = new SpeechSynthesisUtterance(c);
        u.voice = voice;
        u.lang = voice.lang;
        u.rate = rate;
        queue.push(u);
      });
    });
    if (!queue.length) {
      DH.app.toast(DH.tr("No voice for this language on your device. You can add one in your device's language or speech settings."));
      return;
    }
    if (missing) DH.app.toast(DH.tr("Some parts were skipped: your device has no voice for that language."));
    this.speakingBtn = btn || null;
    if (btn) btn.classList.add("speaking");
    queue[queue.length - 1].onend = function () { self.done(); };
    queue[queue.length - 1].onerror = function () { self.done(); };
    queue.forEach(function (u) { synth.speak(u); });
  },

  done: function () {
    if (this.speakingBtn) this.speakingBtn.classList.remove("speaking");
    this.speakingBtn = null;
  },

  stop: function () {
    if (this.supported) window.speechSynthesis.cancel();
    this.done();
  },

  // A speaker button. parts: [{ text, lang }]
  button: function (parts, label) {
    if (!this.supported) return "";
    return '<button class="say-btn" data-say="' + DH.esc(JSON.stringify(parts)) + '" aria-label="' + DH.esc(DH.tr(label || "Read aloud")) + '" title="' + DH.esc(DH.tr(label || "Read aloud")) + '"><i class="ti ti-volume"></i></button>';
  },

  // Voice language for a verse's original script.
  verseLang: function (s) {
    var o = s.olang || "sa";
    return o === "sa" ? "hi" : o; // Sanskrit is read with a Hindi (Devanagari) voice
  }
};
