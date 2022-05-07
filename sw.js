self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
  });

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
});

const ASSETS = [
    "/js/global.js",
    "/",
    "/index.html",
    "favicon.png",
    "/css/style.css"
];

let cache_name = "application"; // The string used to identify our cache

self.addEventListener("fetch", event => {
    if (event.request.url === "https://jdev.eu.org/deteect") {
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});