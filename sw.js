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
    "/css/style.css",
    "manifest.json",
    "sw.js"
];

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetching');
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                return res;
            }
            return fetch(e.request);
        }
        )
    );
    });

    self.addEventListener('fetch', (e) => {
        console.log('[Service Worker] Fetching');
        e.respondWith(
            caches.match(e.request)
            .then(res => {
                if(res) {
                    return res;
                }
                return fetch(e.request);
            }
            )
        );
    });