const CACHE_NAME = "fisa-silvica-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/aaronbates/project-guidelines/tree/9861cbf0f6b95151e21d43a2ed8ce0047d3ddb7b/html%2Fhtml-guidelines.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/NotTodayMuggleFucker/Bedu/tree/5f4401220ff5768d3380f0fadbc401b28759404c/Courses%2FC1-React-2020-master%2FBuenasPracticas%2FPWA%2FReadme.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/MSeptianJ/Footbal_Club/tree/4028f74b99159467dbcd2c8ce9d23bf7a569c03b/service-worker.js?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "3")