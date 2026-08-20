const CACHE_NAME = "dti224-pwa-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./resume.html",
    "./style.css",
    "./manifest.json",
    "./calculate_change_modified.html",
    "./change.html",
    "./convertor.html",
    "./distance.html",
    "./grading (1).html",
    "./hobby.html",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys
                    .filter(function(key) {
                        return key !== CACHE_NAME;
                    })
                    .map(function(key) {
                        return caches.delete(key);
                    })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});