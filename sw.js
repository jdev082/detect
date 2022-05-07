const ASSETS = [
  "/detect/js/global.js",
  "/detect/index.html",
  "/detect/favicon.png",
  "/detect/css/style.css",
  "/detect/manifest.json",
  "/detect/sw.js"
]; 

let cache_name = "cacheName";
self.addEventListener("install", event => {
  console.log("installing...");
  event.waitUntil(
      caches
          .open(cache_name)
          .then(cache => {
              return cache.addAll(ASSETS);
          })
          .catch(err => console.log(err))
  );
});

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate');
});