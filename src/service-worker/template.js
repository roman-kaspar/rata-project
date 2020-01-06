/* global importScripts, workbox */
/* eslint-disable no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

const messageToClients = async () => {
  await self.clients.claim();
  const allClients = await self.clients.matchAll({ type: 'window' });
  allClients.forEach((client) => { client.postMessage({ action: 'newVersionReady' }); });
};

self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', () => { messageToClients(); });

self.__precacheManifest = INJECTED_MANIFEST; // eslint-disable-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
  blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
});

// cache the Google Fonts stylesheets with a stale-while-revalidate strategy
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// cache the underlying font files with a cache-first strategy for 1 year
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);
