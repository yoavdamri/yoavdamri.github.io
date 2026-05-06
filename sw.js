// SolarEdge Monitor - Service Worker
const CACHE_NAME = 'solaredge-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ─── Install ───────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// ─── Activate ──────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ─── Fetch (offline support) ───────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests for caching
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).catch(() => caches.match('/index.html'));
      })
    );
  }
});

// ─── Push (background notifications) ──────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: data.tag || 'solar-alert',
      data: data,
      actions: data.actions || []
    })
  );
});

// ─── Notification click ────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const notifData = event.notification.data || {};

  if (action === 'snooze15' || action === 'snooze60') {
    const delayMs = action === 'snooze15' ? 15 * 60 * 1000 : 60 * 60 * 1000;

    event.waitUntil(
      new Promise((resolve) => {
        setTimeout(async () => {
          try {
            // Fetch latest consumption
            const resp = await fetch('https://monitoringapi.solaredge.com/site/1892524/powerDetails?meters=CONSUMPTION&startTime=2025-05-23%2002%3A00%3A00&endTime=2025-05-23%2023%3A00%3A00&api_key=LN4T1U86HLWSV31ICAFO20P8A6H03MTT');
            const json = await resp.json();
            const values = json?.powerDetails?.meters?.[0]?.values || [];
            const nonNull = values.filter(v => v.value != null);
            const latest = nonNull.length ? nonNull[nonNull.length - 1].value : null;
            const kw = latest != null ? (latest / 1000).toFixed(2) : 'N/A';

            const consumptionKw = latest != null ? latest / 1000 : 0;
            let title, body, icon, actions;

            if (consumptionKw > 9) {
              title = '⚡ High Consumption ✓';
              body = `Consumption is ${kw}kW and car is being charging`;
              icon = '/icons/icon-192.png';
              actions = [];
            } else if (consumptionKw < 5) {
              title = 'ℹ️ Car Status';
              body = 'Car is not charging';
              icon = '/icons/icon-192.png';
              actions = [
                { action: 'snooze15', title: 'Remind me in 15 mins' },
                { action: 'snooze60', title: 'Remind me in 1 hour' }
              ];
            } else {
              title = '🔆 SolarEdge Monitor';
              body = `Current consumption: ${kw}kW`;
              icon = '/icons/icon-192.png';
              actions = [];
            }

            await self.registration.showNotification(title, {
              body,
              icon,
              badge: '/icons/icon-192.png',
              tag: 'solar-snooze',
              data: { consumptionKw },
              actions
            });
          } catch (e) {
            await self.registration.showNotification('SolarEdge Monitor', {
              body: 'Could not fetch consumption data',
              icon: '/icons/icon-192.png'
            });
          }
          resolve();
        }, delayMs);
      })
    );
  } else {
    // Default: open/focus the app
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) return client.focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// ─── Message from app (scheduled check trigger) ───────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_CHECK') {
    // The app sends this to keep the SW alive; actual scheduling is in the app
  }
});
