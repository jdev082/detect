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

    addEventListener('fetch', function(event) {
        event.respondWith(
          caches.match(event.request)
            .then(function(response) {
              if (response) {
                return response;
              } else {
                return fetch(event.request)
                  .then(function(res) {
                    return caches.open(CACHE_DYNAMIC_NAME)
                      .then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                      })
                  })
                  .catch(function(err) {
                    return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                      .then(function(cache) {
                        return cache.match('/offline.html');
                      });
                  });
              }
            })
        );
      });     