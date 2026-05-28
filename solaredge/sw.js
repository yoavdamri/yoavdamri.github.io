// SolarEdge Monitor - Service Worker
// Version: 2 (ensures browsers fetch the latest version)
const CACHE_NAME = 'solaredge-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ─── Install ───────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching files');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((err) => console.error('[SW] Cache install error:', err))
  );
  self.skipWaiting();
});

// ─── Activate ──────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        console.log('[SW] Cleaning old caches:', keys);
        return Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => {
              console.log('[SW] Deleting cache:', k);
              return caches.delete(k);
            })
        );
      })
      .catch((err) => console.error('[SW] Cache activation error:', err))
  );
  self.clients.claim();
});

// ─── Fetch (offline support) ───────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests for caching
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          return cached || fetch(event.request).catch(() => caches.match('/index.html'));
        })
        .catch(() => caches.match('/index.html'))
    );
  }
});

// ─── Push (background notifications) ──────────────────────────────────────
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received');
  
  if (!event.data) {
    console.warn('[SW] Push event received with no data');
    return;
  }

  try {
    const data = event.data.json();
    console.log('[SW] Push data parsed:', data);

    event.waitUntil(
      self.registration.showNotification(data.title || 'SolarEdge Alert', {
        body: data.body || 'New notification',
        icon: data.icon || '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: data.tag || 'solar-alert',
        data: data,
        actions: data.actions || [],
        requireInteraction: data.requireInteraction || false
      })
        .then(() => {
          console.log('[SW] Notification displayed successfully');
        })
        .catch((err) => {
          console.error('[SW] Failed to display notification:', err);
          // Fallback: try again without actions
          return self.registration.showNotification(data.title || 'SolarEdge Alert', {
            body: data.body || 'New notification',
            icon: data.icon || '/icons/icon-192.png',
            badge: '/icons/icon-192.png',
            tag: data.tag || 'solar-alert',
            data: data
          });
        })
    );
  } catch (err) {
    console.error('[SW] Error processing push event:', err);
    event.waitUntil(
      self.registration.showNotification('SolarEdge Alert', {
        body: 'Received a notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png'
      })
    );
  }
});

// ─── Notification click ────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked, action:', event.action);
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
            const now = new Date();
            const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            const formatTime = (date) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hours = String(date.getHours()).padStart(2, '0');
              const mins = String(date.getMinutes()).padStart(2, '0');
              const secs = String(date.getSeconds()).padStart(2, '0');
              return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
            };
            const startTime = formatTime(threeHoursAgo);
            const endTime = formatTime(now);
            const startTimeEnc = encodeURIComponent(startTime);
            const endTimeEnc = encodeURIComponent(endTime);
            const url = `https://monitoringapi.solaredge.com/site/1892524/powerDetails?meters=CONSUMPTION&startTime=${startTimeEnc}&endTime=${endTimeEnc}&api_key=LN4T1U86HLWSV31ICAFO20P8A6H03MTT`;
            const resp = await fetch(url);
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
              title = '🔆 SolarEdge Monitor v1.1';
              body = `Current consumption: ${kw}kW`;
              icon = '/icons/icon-192.png';
              actions = [];
            }

            console.log('[SW] Showing snoozed notification:', title);
            await self.registration.showNotification(title, {
              body,
              icon,
              badge: '/icons/icon-192.png',
              tag: 'solar-snooze',
              data: { consumptionKw },
              actions
            });
          } catch (e) {
            console.error('[SW] Error in snooze handler:', e);
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
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          console.log('[SW] Found', clientList.length, 'clients');
          for (const client of clientList) {
            if ('focus' in client) {
              console.log('[SW] Focusing client');
              return client.focus();
            }
          }
          console.log('[SW] No client to focus, opening new window');
          return clients.openWindow('/');
        })
        .catch((err) => {
          console.error('[SW] Error in notification click:', err);
          return clients.openWindow('/');
        })
    );
  }
});

// ─── Notification close ────────────────────────────────────────────────────
self.addEventListener('notificationclose', (event) => {
  console.log('[SW] Notification closed:', event.notification.tag);
  // Clean up any pending operations related to this notification
});

async function fetchHourlyConsumptionValues() {
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    const secs = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
  };

  const startTime = formatTime(threeHoursAgo);
  const endTime = formatTime(now);
  const startTimeEnc = encodeURIComponent(startTime);
  const endTimeEnc = encodeURIComponent(endTime);
  const url = `https://monitoringapi.solaredge.com/site/1892524/powerDetails?meters=CONSUMPTION&startTime=${startTimeEnc}&endTime=${endTimeEnc}&api_key=LN4T1U86HLWSV31ICAFO20P8A6H03MTT`;
  const resp = await fetch(url);
  const json = await resp.json();
  return json?.powerDetails?.meters?.[0]?.values || [];
}

async function performHourlyNotification() {
  try {
    console.log('[SW] Performing hourly notification');
    const values = await fetchHourlyConsumptionValues();
    const nonNull = values.filter(v => v.value != null);
    const latest = nonNull.length ? nonNull[nonNull.length - 1].value : null;
    const kw = latest != null ? (latest / 1000).toFixed(2) : 'N/A';
    const title = latest != null ? `Hourly report — ${kw}kW` : 'Hourly SolarEdge report';
    const body = latest != null ? `Latest consumption is ${kw}kW` : 'Unable to retrieve latest consumption data';

    console.log('[SW] Showing hourly notification:', title);
    await self.registration.showNotification(title, {
      body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'solar-hourly',
      data: { latestKw: latest != null ? latest / 1000 : null }
    });
  } catch (e) {
    console.error('[SW] Error in hourly notification:', e);
    await self.registration.showNotification('SolarEdge hourly report', {
      body: 'Hourly update failed',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'solar-hourly-failed'
    });
  }
}

self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync event, tag:', event.tag);
  if (event.tag === 'hourly-check') {
    event.waitUntil(performHourlyNotification());
  }
});

// ─── Message from app (scheduled check trigger & keep-alive) ───────────────
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data?.type);
  
  if (event.data && event.data.type === 'SCHEDULE_CHECK') {
    // The app sends this to keep the SW alive; actual scheduling is in the app
    console.log('[SW] Schedule check message received - keeping SW alive');
  }
  
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    // Handle app-initiated notifications even in background
    const { title, body, icon, tag, actions } = event.data;
    self.registration.showNotification(title, {
      body,
      icon: icon || '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: tag || 'solar-app-initiated',
      actions: actions || []
    }).then(() => {
      console.log('[SW] App-initiated notification shown');
    }).catch((err) => {
      console.error('[SW] Error showing app-initiated notification:', err);
    });
  }
});
