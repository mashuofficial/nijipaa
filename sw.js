// バージョン名を変更しました (v2 -> v3)
const CACHE_NAME = 'niji-v3'; 

const ASSETS = [
  './',
  './index.html',
  './niji.gif',
  './icon.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // 古いキャッシュを削除して新しいのを即座に有効にする設定を追加
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  // 古いバージョンのキャッシュを削除する処理
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
