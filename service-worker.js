self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("arboret-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "birou.html",
        "teren.html",
        "style.css",
        "app.js",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respond