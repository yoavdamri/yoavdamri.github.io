const CACHE_NAME = 'evnotify-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});

let reminders = [];

async function loadReminders() {
  const cache = await caches.open(CACHE_NAME);
  const stored = await cache.match('reminders-data');
  if (!stored) {
    reminders = [];
    return;
  }
  const text = await stored.text();
  try {
    reminders = JSON.parse(text);
  } catch (error) {
    reminders = [];
  }
}

async function persistReminders() {
  const cache = await caches.open(CACHE_NAME);
  const data = new Response(JSON.stringify(reminders), {
    headers: { 'Content-Type': 'application/json' }
  });
  await cache.put('reminders-data', data);
}

async function sendDueNotifications() {
  const now = Date.now();
  const due = reminders.filter((reminder) => reminder.timestamp <= now);
  reminders = reminders.filter((reminder) => reminder.timestamp > now);
  await persistReminders();
  return Promise.all(
    due.map((reminder) =>
      self.registration.showNotification('EVNotify Reminder', {
        body: reminder.message,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: `evnotify-${reminder.id}`,
        data: reminder
      })
    )
  );
}

self.addEventListener('message', (event) => {
  const message = event.data;
  if (!message || message.type !== 'schedule-reminder') {
    return;
  }

  const reminder = message.reminder;
  if (!reminder || !reminder.id) {
    return;
  }

  reminders = reminders.filter((item) => item.id !== reminder.id);
  reminders.push(reminder);
  persistReminders();
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'evnotify-check') {
    event.waitUntil(
      loadReminders().then(sendDueNotifications)
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('./index.html');
    })
  );
});
