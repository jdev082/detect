
const ASSETS = [
    "/js/global.js",
    "/index.html",
    "favicon.png",
    "/css/style.css",
    "manifest.json",
]; 

let CACHE_NAME = "cacheName";
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
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS.map(i => i === '' ? base : i))));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(i => i !== CACHE_NAME).map(i => caches.delete(i))))
  );
});

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