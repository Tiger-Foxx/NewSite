// /* eslint-disable no-restricted-globals */
//
// // Types pour TypeScript
// declare const self: ServiceWorkerGlobalScope;
//
// const CACHE_NAME = 'fox-website-cache-v1';
// const OFFLINE_URL = '/offline.html';
// const OFFLINE_ASSETS = [
//     '/',
//     '/index.html',
//     '/offline.html',
//     '/favicon.ico',
//     '/manifest.json',
//     '/assets/icons/logo-fox.svg',
//     '/assets/css/main.css',
//     '/assets/js/main.js',
// ];
//
// // Installation du Service Worker
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         (async () => {
//             const cache = await caches.open(CACHE_NAME);
//             // Mettre en cache les pages et assets offline
//             await cache.addAll(OFFLINE_ASSETS);
//         })()
//     );
//
//     // Activer immédiatement le nouveau Service Worker
//     self.skipWaiting();
// });
//
// // Activation du Service Worker
// self.addEventListener('activate', (event) => {
//     event.waitUntil(
//         (async () => {
//             // Nettoyer les anciens caches
//             const cacheNames = await caches.keys();
//             await Promise.all(
//                 cacheNames
//                     .filter((name) => name !== CACHE_NAME)
//                     .map((name) => caches.delete(name))
//             );
//
//             // Prendre le contrôle de tous les clients sans rechargement
//             await self.clients.claim();
//         })()
//     );
// });
//
// // Interception des requêtes réseau
// self.addEventListener('fetch', (event) => {
//     // Ignorer les requêtes non GET
//     if (event.request.method !== 'GET') return;
//
//     // Ignorer les requêtes de l'API backend (elles doivent toujours être fraîches)
//     if (event.request.url.includes('/api/')) return;
//
//     event.respondWith(
//         (async () => {
//             const cache = await caches.open(CACHE_NAME);
//
//             // Stratégie "stale-while-revalidate"
//             try {
//                 // Essayer de récupérer une réponse fraîche
//                 const networkResponse = await fetch(event.request);
//
//                 // Mettre en cache la nouvelle réponse
//                 cache.put(event.request, networkResponse.clone());
//
//                 return networkResponse;
//             } catch (error) {
//                 // Si hors-ligne, essayer de récupérer depuis le cache
//                 const cachedResponse = await cache.match(event.request);
//
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//
//                 // Si c'est une requête de navigation et qu'elle n'est pas dans le cache,
//                 // renvoyer la page offline
//                 if (event.request.mode === 'navigate') {
//                     const offlineResponse = await cache.match(OFFLINE_URL);
//                     return offlineResponse;
//                 }
//
//                 // Sinon, propager l'erreur
//                 throw error;
//             }
//         })()
//     );
// });
//
// // Gérer les notifications push
// self.addEventListener('push', (event) => {
//     if (!event.data) return;
//
//     const data = event.data.json();
//
//     const options = {
//         body: data.body,
//         icon: '/assets/icons/logo-fox.svg',
//         badge: '/assets/icons/badge.png',
//         vibrate: [100, 50, 100],
//         data: {
//             url: data.url
//         }
//     };
//
//     event.waitUntil(
//         self.registration.showNotification(data.title, options)
//     );
// });
//
// // Gérer les clics sur les notifications
// self.addEventListener('notificationclick', (event) => {
//     event.notification.close();
//
//     if (event.notification.data && event.notification.data.url) {
//         event.waitUntil(
//             self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
//                 // Vérifier si un onglet est déjà ouvert pour ouvrir l'URL
//                 const hadWindowToFocus = clientsArr.some((windowClient) => {
//                     if (windowClient.url === event.notification.data.url) {
//                         return windowClient.focus();
//                     }
//                     return false;
//                 });
//
//                 // Si aucun onglet n'est ouvert, en ouvrir un nouveau
//                 if (!hadWindowToFocus) {
//                     self.clients.openWindow(event.notification.data.url);
//                 }
//             })
//         );
//     }
// });
//
// export {};