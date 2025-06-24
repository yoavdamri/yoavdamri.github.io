// Service Worker for Tasks PWA
const CACHE_NAME = 'tasks-pwa-v2-' + Date.now(); // Force cache update with timestamp
const urlsToCache = [
    './',
    './yes.html',
    './manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content with network-first for HTML files
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Network-first strategy for HTML files to get updates quickly
        fetch(event.request)
            .then((response) => {
                // If we got a response from the network, cache it and return it
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }
                // If network fails, fall back to cache
                return caches.match(event.request);
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // If no cache, return a basic offline page response
                        if (event.request.destination === 'document') {
                            return new Response(
                                '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
                                { headers: { 'Content-Type': 'text/html' } }
                            );
                        }
                    });
            })
    );
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked', event);

    const notification = event.notification;
    const action = event.action;

    // Close the notification
    notification.close();    // Handle different actions
    if (action === 'open') {
        // Open the app
        event.waitUntil(
            clients.openWindow('./yes.html')
        );
    } else if (action === 'close') {
        // Just close (already done above)
        console.log('Notification dismissed');
    } else {
        // Default click action - focus existing window or open new one
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    // Try to focus an existing window
                    for (let i = 0; i < clientList.length; i++) {
                        const client = clientList[i];
                        if (client.url.includes('yes.html') && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // If no window found, open a new one
                    if (clients.openWindow) {
                        return clients.openWindow('./yes.html');
                    }
                })
        );
    }
});

// Handle notification close events
self.addEventListener('notificationclose', (event) => {
    console.log('Service Worker: Notification closed', event);

    // Optional: Track notification dismissal analytics
    // You can add analytics tracking here if needed
});

// Background sync for offline notifications (optional)
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event);

    if (event.tag === 'background-notification') {
        event.waitUntil(
            // Handle background notification logic here
            console.log('Handling background notification sync')
        );
    }
});

// Push event handler (for future push notifications)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push received', event);

    const options = {
        body: event.data ? event.data.text() : 'Default push notification body',
        icon: 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="#2196F3" rx="4"/>
                <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `),
        badge: 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#2196F3"/>
                <text x="12" y="16" text-anchor="middle" fill="white" font-size="12">!</text>
            </svg>
        `),
        tag: 'push-notification',
        actions: [
            {
                action: 'open',
                title: 'Open App',
                icon: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `)
            },
            {
                action: 'close',
                title: 'Dismiss',
                icon: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `)
            }
        ],
        requireInteraction: true,
        timestamp: Date.now()
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
