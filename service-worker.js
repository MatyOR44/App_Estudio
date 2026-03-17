const CACHE_NAME = 'repaso-cache-v1';
const urlsToCache = [
  './repaso.html',
  './manifest.json',
  './icono.png'
];

// Se instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Cuando la app pide un archivo, busca primero en el caché (sin internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra en el caché, lo devuelve. Si no, va a internet.
        return response || fetch(event.request);
      })
  );
});