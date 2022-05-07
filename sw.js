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

self.addEventListener('fetch', (e) => {
    if (ASSETS.includes(e.request.url)) {
        e.respondWith(fetch(e.request));
    }
}
);
