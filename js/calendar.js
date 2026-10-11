// Works out Sharada Navaratri dates for any year, so the "Happening now"
// badge keeps working forever without anyone updating a list.
//
// Rule (as in panchāṅgams): the lunar month (new moon to new moon) in which
// the Sun enters sidereal Libra (Tulā saṅkrānti) is Āśvina. Navaratri starts
// on Āśvina Śukla Pratipadā, the first lunar day after that new moon that is
// in effect at sunrise in India; Vijayadaśamī is about 9 days later.
// Astronomy: new moons from Meeus, "Astronomical Algorithms" ch. 49; Sun's
// longitude from Meeus ch. 25 (low precision); Lahiri ayanāṃśa.
// Accurate to about a day; listed dates in config.js override it.

DH.calendar = {
  rad: Math.PI / 180,

  // Julian Ephemeris Day of the new moon with lunation number k (k=0: Jan 2000).
  newMoon: function (k) {
    var r = this.rad, T = k / 1236.85;
    var jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.00000015 * T * T * T;
    var E = 1 - 0.002516 * T - 0.0000074 * T * T;
    var M = (2.5534 + 29.10535670 * k - 0.0000014 * T * T) * r;
    var Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T * T) * r;
    var F = (160.7108 + 390.67050284 * k - 0.0016118 * T * T) * r;
    var O = (124.7746 - 1.56375588 * k + 0.0020672 * T * T) * r;
    return jde
      - 0.40720 * Math.sin(Mp) + 0.17241 * E * Math.sin(M) + 0.01608 * Math.sin(2 * Mp)
      + 0.01039 * Math.sin(2 * F) + 0.00739 * E * Math.sin(Mp - M) - 0.00514 * E * Math.sin(Mp + M)
      + 0.00208 * E * E * Math.sin(2 * M) - 0.00111 * Math.sin(Mp - 2 * F) - 0.00057 * Math.sin(Mp + 2 * F)
      + 0.00056 * E * Math.sin(2 * Mp + M) - 0.00042 * Math.sin(3 * Mp) + 0.00042 * E * Math.sin(M + 2 * F)
      + 0.00038 * E * Math.sin(M - 2 * F) - 0.00024 * E * Math.sin(2 * Mp - M) - 0.00017 * Math.sin(O);
  },

  // Sun's sidereal (Lahiri) longitude in degrees at Julian Day jd.
  sunSidereal: function (jd) {
    var r = this.rad, T = (jd - 2451545.0) / 36525;
    var L0 = 280.46646 + 36000.76983 * T;
    var M = (357.52911 + 35999.05029 * T) * r;
    var C = (1.914602 - 0.004817 * T) * Math.sin(M) + 0.019993 * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    var omega = (125.04 - 1934.136 * T) * r;
    var apparent = L0 + C - 0.00569 - 0.00478 * Math.sin(omega);
    var ayanamsa = 23.853 + 0.013963 * ((jd - 2451545.0) / 365.25); // Lahiri, approx.
    return ((apparent - ayanamsa) % 360 + 360) % 360;
  },

  jd: function (y, m, d) { return Date.UTC(y, m - 1, d) / 86400000 + 2440587.5; },

  // Julian Day when the Sun enters sidereal Libra (Tulā begins at 180° sidereal).
  tulaSankranti: function (year) {
    var self = this, jd = this.jd(year, 9, 20);
    while (self.sunSidereal(jd + 1) < 180 && self.sunSidereal(jd + 1) > 120) jd += 1;
    // Narrow down within the day.
    var lo = jd, hi = jd + 1;
    for (var i = 0; i < 30; i++) {
      var mid = (lo + hi) / 2;
      if (self.sunSidereal(mid) < 180) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  },

  // "YYYY-MM-DD" in India (IST = UTC+5:30) for a Julian Day, plus hour of day.
  istDate: function (jd) {
    var ms = (jd - 2440587.5) * 86400000 + 5.5 * 3600000;
    var d = new Date(ms);
    return { ymd: d.toISOString().slice(0, 10), hour: d.getUTCHours() + d.getUTCMinutes() / 60, ms: ms };
  },

  addDays: function (ymd, n) {
    var d = new Date(ymd + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  },

  // { start, end } of Sharada Navaratri (start = Pratipadā, end = day after Vijayadaśamī).
  navaratri: function (year) {
    var s = this.tulaSankranti(year);
    // The last new moon before the saṅkrānti starts the month of Āśvina.
    var k = Math.floor((year + (s - this.jd(year, 1, 1)) / 365.25 - 2000) * 12.3685) + 1;
    while (this.newMoon(k) > s) k -= 1;
    var nm = this.istDate(this.newMoon(k));
    // Pratipadā begins at the new moon; it counts for the day whose sunrise
    // (about 6:00 in India) falls inside it.
    var start = nm.hour < 6 ? nm.ymd : this.addDays(nm.ymd, 1);
    return { start: start, end: this.addDays(start, 10) };
  },

  // Is Navaratri on today? Listed dates (config.js) win; otherwise calculate.
  festivalOn: function (today) {
    today = today || DH.today();
    var year = +today.slice(0, 4);
    var listed = (DH.config.NAVARATRI || []).filter(function (r) { return r.start.slice(0, 4) === String(year); });
    var range = listed[0] || this.navaratri(year);
    return today >= range.start && today <= range.end;
  }
};
