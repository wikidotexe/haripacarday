// Service worker untuk mode offline.
// Versi dinaikkan setiap kali aset inti berubah agar cache lama dibersihkan.
const VERSION = 'v1';
const SHELL_CACHE = `haripacar-shell-${VERSION}`;
const ASSET_CACHE = `haripacar-assets-${VERSION}`;
const IMAGE_CACHE = `haripacar-images-${VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE, IMAGE_CACHE];

const SHELL_FILES = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !CURRENT_CACHES.includes(key)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

/** Navigasi: utamakan jaringan, jatuh ke shell agar rute SPA tetap jalan offline. */
async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    cache.put('/', response.clone());
    return response;
  } catch {
    const cached = await caches.match('/', { cacheName: SHELL_CACHE });
    return cached ?? Response.error();
  }
}

/** Aset build (hash di nama file): ambil cache dulu, isi cache saat pertama kali diunduh. */
async function handleAsset(request, cacheName) {
  const cached = await caches.match(request, { cacheName });
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok || response.type === 'opaque') {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (isSameOrigin && /\.(?:js|css|woff2?)$/.test(url.pathname)) {
    event.respondWith(handleAsset(request, ASSET_CACHE));
    return;
  }

  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(handleAsset(request, IMAGE_CACHE));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(handleAsset(request, ASSET_CACHE));
  }
});
