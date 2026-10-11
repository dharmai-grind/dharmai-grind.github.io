// Lets dharmAI open offline after the first visit.
// Network first (so updates show up right away), saved copy as a fallback.
var CACHE = "dharmai-v2";

self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // "no-cache" = always ask GitHub whether there's a newer version (cheap check).
  e.respondWith(
    fetch(req, { cache: "no-cache" }).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match(req); })
  );
});
