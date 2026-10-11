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

  // Sanskrit/Tamil words written in IAST (Śaṅkara, Kṛṣṇa, Gītā) get mangled by
  // English voices ("Sankara"). Respell them the way English readers would:
  // Shankara, Krishna, Geeta. Only words with IAST marks are changed, plus a
  // few common words without marks where "c" means "ch".
  IAST_MAP: [
    ["jñ", "gy"], ["kṣ", "ksh"], ["ś", "sh"], ["ṣ", "sh"], ["ṛ", "ri"], ["ṝ", "ree"], ["ḷ", "l"],
    ["ṅ", "n"], ["ñ", "n"], ["ṭ", "t"], ["ḍ", "d"], ["ṇ", "n"], ["ḥ", "h"], ["ṃ", "m"], ["ṁ", "m"],
    ["ā", "a"], ["ī", "ee"], ["ū", "oo"], ["ē", "e"], ["ō", "o"],
    ["ḻ", "zh"], ["ṟ", "r"], ["ṉ", "n"]
  ],
  // Tamil words: Tamil spelling doesn't show voicing, so apply Tamil allophony
  // (Āṇṭāḷ is said "Andal"). A word counts as Tamil if it has Tamil-only letters
  // (ḻ ṟ ṉ ē ō) or is in this list of Tamil names used in our lessons.
  TAMIL_WORDS: ["āṇṭāḷ", "piḷḷai", "maṇavāḷa", "tiruppāvai", "tiruvaṇṇāmalai", "tirukkōṭṭiyūr", "nambi", "kōḻi", "nālāyira", "pōtuvīr"],
  isTamil: function (lower) {
    return /[ḻṟṉēō]/.test(lower) || this.TAMIL_WORDS.indexOf(lower) >= 0;
  },
  tamilVoicing: function (w) {
    var V = "aāiīuūeēoō";
    // 1. Doubled stops stay hard: protect them first.
    w = w.replace(/ṟṟ/g, "#TR#").replace(/kk/g, "#KK#").replace(/cc/g, "#CC#").replace(/ṭṭ/g, "#TT#").replace(/tt/g, "#tt#").replace(/pp/g, "#PP#");
    // Output stays in IAST (keeping retroflexes), so it can become Devanagari
    // or an English respelling. 2. After a nasal, stops become voiced:
    // ṅk→ṅg, ñc→ñj, ṇṭ→ṇḍ (retroflex), nt→nd, mp→mb, ṉṟ→ndr.
    w = w.replace(/ṅk/g, "ṅg").replace(/ñc/g, "ñj").replace(/ṇṭ/g, "ṇḍ").replace(/nt/g, "nd").replace(/mp/g, "mb").replace(/ṉṟ/g, "ndr");
    // 3. A single stop between vowels softens: k→g, c→s, ṭ→ḍ, t→d, p→b.
    var soft = { "k": "g", "c": "s", "ṭ": "ḍ", "t": "d", "p": "b" };
    w = w.replace(new RegExp("([" + V + "])([kcṭtp])(?=[" + V + "])", "g"), function (m, v, s) { return v + soft[s]; });
    // 4. Put the protected doubles back (hard, retroflex kept).
    return w.replace(/#TR#/g, "ṭṭr").replace(/#KK#/g, "kk").replace(/#CC#/g, "cc").replace(/#TT#/g, "ṭṭ").replace(/#tt#/g, "tt").replace(/#PP#/g, "pp");
  },
  // Whole words with a well-known spoken form.
  SAY_AS: { "śrīperumbudūr": "Sriperumbudur", "śrīraṅgam": "Srirangam" },
  PLAIN_SANSKRIT: { caraka: "Charaka", candra: "Chandra", caitra: "Chaitra", cit: "chit", acit: "achit", caṇḍī: "Chandi", carita: "charita", cakra: "chakra" },
  respell: function (text) {
    var self = this;
    return String(text).replace(/[A-Za-zÀ-ÿĀ-ſḀ-ỿ']+/g, function (word) {
      var lower = word.toLowerCase();
      if (self.PLAIN_SANSKRIT[lower]) return self.matchCase(word, self.PLAIN_SANSKRIT[lower]);
      if (self.SAY_AS[lower]) return self.SAY_AS[lower];
      lower = lower.replace(/^śrī/, "shri"); // Śrī is said "Shri", not "Shree"
      if (!/[āīūṛṝḷṅṭḍṇśṣḥṃṁēōḻṟṉ]|jñ/i.test(word)) return word; // ordinary word (incl. Spanish "señor")
      // Sanskrit: c is always "ch". Tamil: voicing first, then any remaining c is "ch".
      var out = (self.isTamil(lower) ? self.tamilVoicing(lower) : lower).replace(/c(?!h)/g, "ch");
      out = out.replace(/^ī/, "i").replace(/ī$/, "i"); // Īśvara → Ishvara, Purī → Puri (not "Puree")
      self.IAST_MAP.forEach(function (m) { out = out.split(m[0]).join(m[1]); });
      return self.matchCase(word, out);
    });
  },
  matchCase: function (orig, out) {
    return orig.charAt(0) === orig.charAt(0).toUpperCase() ? out.charAt(0).toUpperCase() + out.slice(1) : out;
  },
  // ---- Saying Indian words with an Indian voice ----
  // English voices give Sanskrit words English vowels ("cowboy" Rāmānuja).
  // So inside English sentences, Sanskrit/Tamil words are converted to
  // Devanagari and spoken by a Hindi voice, which pronounces them natively.

  // Common words written without IAST marks that are really Sanskrit, with
  // their IAST spelling (so they can be converted to Devanagari).
  PLAIN_INDIC: {
    vishishtadvaita: "viśiṣṭādvaita", advaita: "advaita", dvaita: "dvaita", vedanta: "vedānta", brahman: "brahman",
    dharma: "dharma", karma: "karma", bhakti: "bhakti", moksha: "mokṣa", yoga: "yoga", veda: "veda", vedas: "veda",
    upanishad: "upaniṣad", upanishads: "upaniṣad", bhagavad: "bhagavad", angada: "aṅgada", navaratri: "navarātri",
    ramayana: "rāmāyaṇa", mahabharata: "mahābhārata", krishna: "kṛṣṇa", vishnu: "viṣṇu", shiva: "śiva",
    durga: "durgā", lakshmi: "lakṣmī", saraswati: "sarasvatī", hanuman: "hanumān", sugriva: "sugrīva",
    golu: "golu", kolu: "kolu", sundal: "suṇḍal", madhva: "madhva", ramanuja: "rāmānuja", shankara: "śaṅkara",
    caraka: "caraka", candra: "candra", caitra: "caitra", cit: "cit", acit: "acit"
  },
  DEVA_CONS: {
    "kh": "ख", "gh": "घ", "ch": "छ", "jh": "झ", "ṭh": "ठ", "ḍh": "ढ", "th": "थ", "dh": "ध", "ph": "फ", "bh": "भ",
    "k": "क", "g": "ग", "ṅ": "ङ", "c": "च", "j": "ज", "ñ": "ञ", "ṭ": "ट", "ḍ": "ड", "ṇ": "ण",
    "t": "त", "d": "द", "n": "न", "p": "प", "b": "ब", "m": "म", "y": "य", "r": "र", "l": "ल", "v": "व",
    "ś": "श", "ṣ": "ष", "s": "स", "h": "ह", "ḷ": "ळ", "ḻ": "ळ", "ṟ": "र", "ṉ": "न", "f": "फ़", "z": "ज़", "w": "व"
  },
  DEVA_VOW: { "a": ["अ", ""], "ā": ["आ", "ा"], "i": ["इ", "ि"], "ī": ["ई", "ी"], "u": ["उ", "ु"], "ū": ["ऊ", "ू"],
    "ṛ": ["ऋ", "ृ"], "ṝ": ["ॠ", "ॄ"], "e": ["ए", "े"], "ē": ["ए", "े"], "ai": ["ऐ", "ै"], "o": ["ओ", "ो"], "ō": ["ओ", "ो"], "au": ["औ", "ौ"] },
  // IAST (lowercase) → Devanagari.
  toDeva: function (w) {
    var out = "", i = 0, prevCons = false, C = this.DEVA_CONS, V = this.DEVA_VOW;
    while (i < w.length) {
      var two = w.substr(i, 2), one = w.charAt(i);
      if (V[two] || V[one]) {
        var v = V[two] ? two : one;
        out += prevCons ? V[v][1] : V[v][0];
        prevCons = false; i += v.length; continue;
      }
      if (C[two] || C[one]) {
        var c = C[two] ? two : one;
        if (prevCons) out += "्";
        out += C[c]; prevCons = true; i += c.length; continue;
      }
      if (one === "ṃ" || one === "ṁ") { out += "ं"; prevCons = false; i++; continue; }
      if (one === "ḥ") { out += "ः"; prevCons = false; i++; continue; }
      if (prevCons) out += "्";
      out += one === "-" ? " " : one; prevCons = false; i++;
    }
    if (prevCons) out += "्"; // word ends in a consonant (bhagavad → भगवद्)
    return out;
  },
  // Telugu and Kannada scripts sit at a fixed offset from Devanagari in
  // Unicode, letter for letter, so converting is just shifting code points.
  // Their voices keep the final "a" (Hindi voices drop it: "Shankar").
  SCRIPT_OFFSET: { te: 0x300, kn: 0x380 },
  fromDeva: function (deva, script) {
    var off = this.SCRIPT_OFFSET[script];
    if (!off) return deva;
    return Array.from(deva.replace(/़/g, "")).map(function (ch) {
      var cp = ch.codePointAt(0);
      return cp >= 0x0901 && cp <= 0x094D ? String.fromCodePoint(cp + off) : ch;
    }).join("");
  },
  // Which voice says Indian words / Sanskrit. Order (Auto): Telugu, Kannada,
  // Indian English, Hindi. Returns { voice, mode: "te"|"kn"|"enin"|"hi" }.
  NAME_MODES: [["te", "te"], ["kn", "kn"], ["en-IN", "enin"], ["hi", "hi"]],
  nameVoice: function (matchVoice, devanagariOnly) {
    var pref = (((DH.store.state || {}).prefs) || {}).nameVoice || "auto";
    var self = this, g = this.gender(matchVoice);
    var order = this.NAME_MODES.filter(function (m) { return !(devanagariOnly && m[1] === "enin"); });
    if (pref !== "auto") {
      var chosen = order.filter(function (m) { return m[1] === pref; });
      order = chosen.concat(order.filter(function (m) { return m[1] !== pref; }));
    }
    for (var i = 0; i < order.length; i++) {
      var list = this.forLang(order[i][0]);
      if (order[i][0] === "en-IN") list = list.filter(function (v) { return /en[-_]IN/i.test(v.lang); });
      if (!list.length) continue;
      var v = (g && list.find(function (x) { return self.gender(x) === g; })) || list[0];
      return { voice: v, mode: order[i][1] };
    }
    return null;
  },
  // Text for an Indian-word run, written for the chosen voice.
  forMode: function (seg, mode) {
    if (mode === "enin") return this.respell(seg.orig);
    var deva = seg.iast.map(this.toDeva, this).join(" ");
    return mode === "hi" ? deva : this.fromDeva(deva, mode);
  },

  // The IAST form of a word if it's an Indian word, else null.
  indicForm: function (word) {
    var lower = word.toLowerCase().replace(/'s$/, ""); // Āṇṭāḷ's → Āṇṭāḷ
    if (this.PLAIN_INDIC[lower]) return this.PLAIN_INDIC[lower];
    if (this.TAMIL_WORDS.indexOf(lower) >= 0) return this.tamilVoicing(lower);
    if (/[āīūṛṝḷṅṭḍṇśṣḥṃṁēōḻṟṉ]|jñ/.test(lower)) return this.isTamil(lower) ? this.tamilVoicing(lower) : lower;
    return null;
  },
  // Split English text into English runs and runs of Indian words.
  // Returns runs: { indic: false, text } for English, or
  // { indic: true, orig: "Bhagavad Gītā", iast: ["bhagavad", "gītā"] } for Indian words.
  segments: function (text) {
    var self = this, segs = [];
    String(text).split(/([A-Za-zÀ-ÿĀ-ſḀ-ỿ']+(?:-[A-Za-zÀ-ÿĀ-ſḀ-ỿ']+)*)/).forEach(function (piece, idx) {
      if (!piece) return;
      var last = segs[segs.length - 1];
      if (idx % 2 === 0) {
        // Spaces between two Indian words stay in the Indian run; punctuation ends it.
        if (last && last.indic && /^\s+$/.test(piece)) last.orig += piece;
        else if (last && !last.indic) last.text += piece;
        else segs.push({ indic: false, text: piece });
        return;
      }
      var parts = piece.split("-"), forms = parts.map(function (p) { return self.indicForm(p); });
      if (forms.some(function (f) { return f; })) {
        var iast = parts.map(function (p, k) { return forms[k] || p.toLowerCase().replace(/'s$/, ""); });
        if (last && last.indic) { last.orig += piece; last.iast = last.iast.concat(iast); }
        else segs.push({ indic: true, orig: piece, iast: iast });
      } else if (last && !last.indic) last.text += piece;
      else segs.push({ indic: false, text: piece });
    });
    return segs.filter(function (s) { return s.indic || (/[\p{L}\p{N}]/u.test(s.text)); }).map(function (s) {
      if (!s.indic) s.text = s.text.trim(); else s.orig = s.orig.trim();
      return s;
    });
  },
  // Guess a voice's gender from its name, to pair similar-sounding voices.
  gender: function (v) {
    var n = (v && v.name || "").toLowerCase();
    if (/zira|aria|jenny|samantha|susan|heera|kalpana|swara|neerja|ava|allison|emma|michelle|sonia|libby|veena|lekha|female|woman|karen|moira|tessa|fiona|victoria|google hindi|google हिन्दी|google us english/.test(n)) return "f";
    if (/david|mark|guy|ravi|hemant|madhur|prabhat|alex|daniel|tom|ryan|eric|christopher|male|man|fred|rishi|aaron/.test(n)) return "m";
    return "";
  },
  INDIC: ["hi", "sa", "ta", "te", "kn", "ml", "mr", "gu", "bn", "pa", "or", "as", "ne", "kok", "mai", "si"],

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
    var add = function (t, v) {
      self.chunks(t).forEach(function (c) {
        var u = new SpeechSynthesisUtterance(c);
        u.voice = v; u.lang = v.lang; u.rate = rate;
        queue.push(u);
      });
    };
    var mainVoice = self.pick(DH.lang());
    parts.forEach(function (p) {
      var lang = p.lang || DH.lang();
      var text = self.clean(p.text);
      // A Sanskrit verse (Devanagari): Telugu/Kannada voice keeps final vowels.
      if (lang === "sa") {
        // Indian English can read the verse's romanized form (p.iast), if we have it.
        var sv = self.nameVoice(mainVoice, !p.iast);
        if (!sv) { missing = true; return; }
        if (sv.mode === "enin") add(self.respell(p.iast), sv.voice);
        else add(sv.mode === "hi" ? text : self.fromDeva(text, sv.mode), sv.voice);
        return;
      }
      var voice = self.pick(lang);
      if (!voice) { missing = true; return; }
      if (self.INDIC.indexOf(voice.lang.toLowerCase().split(/[-_]/)[0]) >= 0) { add(text, voice); return; }
      // Non-Indian voice: Indian words go to an Indian voice (Telugu, Kannada,
      // Indian English or Hindi). With none, fall back to English respelling.
      var nv = self.nameVoice(voice, false);
      if (!nv) { add(self.respell(text), voice); return; }
      self.segments(text).forEach(function (s) {
        if (s.indic) add(self.forMode(s, nv.mode), nv.voice); else add(s.text, voice);
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
    return s.olang || "sa"; // "sa" = Sanskrit in Devanagari (see say())
  }
};
