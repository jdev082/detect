const ASSETS = [
  "/js/global.js",
  "/index.html",
  "/favicon.png",
  "/css/style.css",
  "/manifest.json",
  "/sw.js"
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