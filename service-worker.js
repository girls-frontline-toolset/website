self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        ''
      ])
    })
  )
});
//
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).then(res => {
      return res;

    }).catch(function(res) {
      alert(res);
    })
  );
});

self.addEventListener('activate', function (e) {
  //console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
       //console.log('[ServiceWorker] Removing old cache', key)
        if (key !== 'v1') {
          return caches.delete(key)
        }
      }))
    })
  )
});
