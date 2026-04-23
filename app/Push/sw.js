self.addEventListener('push', function(event) {
    const data = event.data ? event.data.text() : 'Default notification message';
    
    const options = {
        body: data,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [100, 50, 100]
    };

    event.waitUntil(
        self.registration.showNotification('PWA Alert', options)
    );
});