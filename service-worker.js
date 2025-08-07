self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("arboret-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "teren.html",
        "birou.html",
        "style.css",
        "app.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});