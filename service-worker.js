// ─────────────────────────────────────────────────────────────────────────────
// Journey — Service Worker
// Bump CACHE_VERSION any time you deploy a new journey.html to invalidate cache
// ─────────────────────────────────────────────────────────────────────────────
const CACHE_VERSION = "journey-6df58917";

// App shell: everything needed to run offline
const APP_SHELL = [
  "/journey.html",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
];

// ── Install: pre-cache the app shell ─────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log("[SW] Pre-caching app shell");
      return cache.addAll(APP_SHELL);
    })
  );
  // Take over immediately — don't wait for old SW to be released
  self.skipWaiting();
});

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          })
      )
    )
  );
  // Claim all open clients so the new SW activates without a reload
  self.clients.claim();
});

// ── Fetch: cache-first for app shell, network-first for fonts ────────────────
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Google Fonts — stale-while-revalidate (nice to have, not critical)
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) =>
        cache.match(event.request).then((cached) => {
          const networkFetch = fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                cache.put(event.request, response.clone());
              }
              return response;
            })
            .catch(() => cached); // offline fallback to cached font
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // App shell (HTML + CDN scripts) — cache-first
  if (
    url.pathname === "/journey.html" ||
    url.hostname === "cdnjs.cloudflare.com"
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        // Not in cache yet — fetch and cache it
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) =>
              cache.put(event.request, clone)
            );
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else — network with no caching
  event.respondWith(fetch(event.request).catch(() => {}));
});
