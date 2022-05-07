self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
  });

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
});