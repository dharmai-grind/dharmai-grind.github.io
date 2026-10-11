// DHARMAi settings.
// WORKER_URL: the address of the free Cloudflare Worker that talks to the AI.
// Leave it empty until the Worker is set up; the app still works (lessons,
// progress, verse search), the AI tutor and translation just stay offline.
window.DH = window.DH || {};
DH.config = {
  WORKER_URL: "https://dharmai.ananya-s13156.workers.dev",
  APP_NAME: "DHARMAi",
  // Navaratri dates are calculated automatically for every year (js/calendar.js).
  // Only add a line here to override a year if the calculation is ever a day off.
  NAVARATRI: [
    { start: "2026-10-11", end: "2026-10-21" }
  ]
};
