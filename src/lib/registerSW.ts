/** Mendaftarkan service worker hanya pada build produksi. */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* pendaftaran gagal — situs tetap jalan tanpa mode offline */
    });
  });
}
