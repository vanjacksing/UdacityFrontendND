// Caching assets on serviceWorker installation
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cache-static-v1').then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    'css/styles.css',
                    'js/dbhelper.js',
                    'js/main.js',
                    'js/restaurant_info.js'
                ]
            );
        })
    );
});

// Respond to request with cached data if any
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request).catch(function(e) {
                return new Response("Failed to load webpage!");
            });
        })
    );
});