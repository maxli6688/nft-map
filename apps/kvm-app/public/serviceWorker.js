/* 监听安装事件 */
// importScripts('idb.js');
var CACHE_NAME = "map-v1";
var urlsToCache = [];
// var urlsToCache = ['/', '/styles/main.css', '/script/main.js'];
self.addEventListener("install", function (event) {
  /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
  // console.log(1123323);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

/* 注册fetch事件，拦截全站的请求 */
self.addEventListener("fetch", function (event) {
  // if (event.request.url === 'https://api.github.com/users/abt10/repos') {
  //   console.log('IndexDB Reqrd');
  //   let db = idb.open('Projects_info').then((d) => {
  //     let ob = d.transaction('proj_dat');
  //     let data = ob.objectStore('proj_dat');
  //     let fd = data.getAll().then((dt) => {
  //       return dt;
  //     });
  //   });
  // }
  // console.log('fetched 33333');
  if (event.request.url.indexOf("api/tilez") > -1) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res && isValid(res)) {
          return res;
        }
        // IMPORTANT:Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          // IMPORTANT:Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});
self.addEventListener("activate", function (event) {
  console.log("activate");
  //  遍历 Service Worker 中的所有缓存，并删除未在缓存白名单中定义的任何缓存
  // var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  // event.waitUntil(
  //   caches.keys().then(function (cacheNames) {
  //     return Promise.all(
  //       cacheNames.map(function (cacheName) {
  //         if (cacheAllowlist.indexOf(cacheName) === -1) {
  //           return caches.delete(cacheName);
  //         }
  //       })
  //     );
  //   })
  // );
});
var isValid = function (response) {
  if (!response) return false;
  var fetched = response.headers.get("x-user-date");
  if (
    fetched &&
    parseFloat(fetched) + 1000 * 60 * 60 * 2 > new Date().getTime()
  )
    return true;
  return false;
};
