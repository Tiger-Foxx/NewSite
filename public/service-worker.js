// Service Worker pour Fox
const CACHE_NAME = 'fox-cache-v1';
const OFFLINE_PAGE = '/offline.html';

const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/favicon.png',
    '/assets/icons/logo-fox.svg'
];

// Installation et mise en cache des ressources statiques
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Mise en cache des ressources statiques');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activation');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((cacheName) => {
                        return cacheName !== CACHE_NAME;
                    }).map((cacheName) => {
                        console.log('[Service Worker] Suppression de l\'ancien cache', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Stratégie de mise en cache améliorée: Network First pour les API, Cache First pour les ressources statiques
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Ignorer les requêtes non GET
    if (request.method !== 'GET') return;

    // Ignorer les requêtes de chrome-extension
    if (url.protocol === 'chrome-extension:') return;

    // Stratégie pour les API: Network First
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Mettre en cache une copie de la réponse
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
                    return response;
                })
                .catch(() => {
                    // En cas d'échec, chercher dans le cache
                    return caches.match(request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // Si pas en cache, retourner une erreur JSON
                            return new Response(
                                JSON.stringify({ error: 'Vous êtes hors ligne' }),
                                {
                                    headers: { 'Content-Type': 'application/json' },
                                    status: 503
                                }
                            );
                        });
                })
        );
        return;
    }

    // Stratégie pour les requêtes de navigation: Cache First puis Offline Page
    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then(response => {
                            // Mettre en cache une copie de la réponse
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
                            return response;
                        })
                        .catch(() => {
                            // En cas d'échec, afficher la page hors ligne
                            return caches.match(OFFLINE_PAGE);
                        });
                })
        );
        return;
    }

    // Stratégie pour les ressources statiques: Cache First
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then(response => {
                        // Ne mettre en cache que les réponses réussies
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Mettre en cache une copie de la réponse
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });

                        return response;
                    })
                    .catch(() => {
                        // Pour les images, retourner une image placeholder
                        if (request.destination === 'image') {
                            return new Response(
                                'Ressource non disponible hors ligne',
                                {
                                    headers: { 'Content-Type': 'text/plain' },
                                    status: 503
                                }
                            );
                        }

                        // Pour les autres ressources, retourner une erreur
                        return new Response(
                            'Ressource non disponible hors ligne',
                            {
                                headers: { 'Content-Type': 'text/plain' },
                                status: 503
                            }
                        );
                    });
            })
    );
});

// Gestion des messages depuis le client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});