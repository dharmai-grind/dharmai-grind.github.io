// dharmAI settings.
// WORKER_URL: the address of the free Cloudflare Worker that talks to the AI.
// Leave it empty until the Worker is set up; the app still works (lessons,
// progress, verse search), the AI tutor and translation just stay offline.
window.DH = window.DH || {};
DH.config = {
  WORKER_URL: "",
  APP_NAME: "dharmAI",
  // Sharada Navaratri dates (first day to Vijayadashami). Add a line each year.
  NAVARATRI: [
    { start: "2026-10-11", end: "2026-10-21" }
  ]
};
