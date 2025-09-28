const CACHE_NAME = 'camera-pwa-v1';
const urlsToCache = [
  '/',
  '/camera-pwa/',
  '/camera-pwa/index.html',
  '/camera-pwa/manifest.json',
  '/camera-pwa/sw.js'
];

// 安装事件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活事件
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 获取事件
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有，返回缓存的版本
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request);
      }
    )
  );
});
