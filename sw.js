
const ASSETS = [
    "/js/global.js",
    "/index.html",
    "favicon.png",
    "/css/style.css",
    "manifest.json",
    "sw.js"
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

/* Source https://packager.turbowarp.org/sw.js, TurboWarp project */
const fetchWithTimeout = (req) => new Promise((resolve, reject) => {
    const timeout = setTimeout(reject, 5000);
    fetch(req)
      .then((res) => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
  
  self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return;
    const relativePathname = url.pathname.substr(base.length);
    if (IS_PRODUCTION && ASSETS.includes(relativePathname)) {
      url.search = '';
      const immutable = !!relativePathname;
      if (immutable) {
        event.respondWith(
          caches.match(new Request(url)).then((res) => res || fetch(event.request))
        );
      } else {
        event.respondWith(
          fetchWithTimeout(event.request).catch(() => caches.match(new Request(url)))
        );
      }
    }
  });
/* End of borrowed source */

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
  });

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
});
