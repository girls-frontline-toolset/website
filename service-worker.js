self.addEventListener('install', function (event) {
  //console.log('start install')

  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '',
        '/common/build.js',
        '/service-worker.js',
        '/manifest.json'
      ])
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).then(res => {

      if (event.request.method === "POST"){
        return res;
      }
      //console.log(event);
      //console.log(res);
      //console.log(caches.open("v1"))
      return caches.open('v1').then((cache)=>{
        return cache.put(event.request,res.clone()).then(()=>{ return res;})
      });

    }).catch(function(res) {
      // return caches.match(event.request).;
      return caches.match(event.request).then((res)=>{

        if (!res || !res.headers){

          switch (true) {

            case /\.json$/g.test(event.request.url):
              return new Response("{\"status\":\"offline\"}", {
                headers: { "Content-Type" : "application/json; charset=utf-8" }
              });

            case /\.html$/g.test(event.request.url):
              return new Response("not caches", {
                headers: { "Content-Type" : "text/plain" }
              });

            default:
              return new Response("not caches", {
                headers: { "Content-Type" : "text/plain" }
              });
          }
        }
        return res
      }).catch((ex)=>{
        console.log(ex)

      });
    })
  );
})

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
})
