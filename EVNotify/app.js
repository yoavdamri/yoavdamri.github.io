const reminderList = document.getElementById('reminderList');
const datetimeInput = document.getElementById('datetime');
const messageInput = document.getElementById('message');
const permissionButton = document.getElementById('permissionButton');
const scheduleButton = document.getElementById('scheduleButton');
const installButton = document.getElementById('installButton');

let installPromptEvent = null;
let reminders = [];
const DB_NAME = 'evnotify-db';
const DB_VERSION = 1;
const STORE_NAME = 'reminders';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllRemindersFromDB() {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('IndexedDB unavailable, falling back to memory storage', error);
    return [];
  }
}

async function saveReminderToDB(reminder) {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(reminder);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to save reminder to IndexedDB', error);
  }
}

async function deleteReminderFromDB(id) {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to delete reminder from IndexedDB', error);
  }
}

async function loadReminders() {
  reminders = await getAllRemindersFromDB();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function updateReminderList() {
  reminderList.innerHTML = '';
  if (!reminders.length) {
    const item = document.createElement('li');
    item.textContent = 'No reminders scheduled yet.';
    reminderList.appendChild(item);
    return;
  }

  reminders.forEach((reminder, index) => {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = reminder.message;
    const details = document.createElement('span');
    details.textContent = `Triggers at ${formatDate(reminder.timestamp)} (${reminder.method})`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => removeReminder(index));
    item.appendChild(title);
    item.appendChild(details);
    item.appendChild(removeButton);
    reminderList.appendChild(item);
  });
}

async function removeReminder(index) {
  const [reminder] = reminders.splice(index, 1);
  await deleteReminderFromDB(reminder.id);
  updateReminderList();
}

function updatePermissionButton() {
  if (Notification.permission === 'granted') {
    permissionButton.textContent = 'Notifications Allowed';
    permissionButton.disabled = true;
  } else {
    permissionButton.textContent = 'Allow Notifications';
    permissionButton.disabled = false;
  }
}

async function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notifications are not supported in this browser.');
    return;
  }

  const permission = await Notification.requestPermission();
  updatePermissionButton();
  if (permission !== 'granted') {
    alert('Please allow notifications to receive reminders.');
  }
}

function supportsNotificationTriggers() {
  return 'showTrigger' in Notification.prototype || 'showTrigger' in Notification;
}

async function postMessageToServiceWorker(message) {
  try {
    const registration = await navigator.serviceWorker.ready;
    const worker = registration.active || registration.waiting || registration.installing;
    if (worker) {
      worker.postMessage(message);
    }
  } catch (error) {
    console.warn('Unable to post message to service worker', error);
  }
}

async function requestPeriodicBackgroundSync(registration) {
  if (!('periodicSync' in registration) || !('permissions' in navigator)) {
    return;
  }

  try {
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') {
      await registration.periodicSync.register('evnotify-check', {
        minInterval: 15 * 60 * 1000
      });
    }
  } catch (error) {
    console.warn('Periodic background sync not available', error);
  }
}

async function scheduleNotification(reminder) {
  if (Notification.permission !== 'granted') {
    await requestPermission();
    if (Notification.permission !== 'granted') {
      return false;
    }
  }

  const registration = await navigator.serviceWorker.ready;
  await saveReminderToDB(reminder);
  await postMessageToServiceWorker({
    type: 'schedule-reminder',
    reminder
  });

  if (supportsNotificationTriggers()) {
    await requestPeriodicBackgroundSync(registration);
    return 'background';
  }

  await requestPeriodicBackgroundSync(registration);
  const delay = reminder.timestamp - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      registration.showNotification('EVNotify Reminder', {
        body: reminder.message,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: `evnotify-${reminder.id}`,
        data: reminder
      });
    }, delay);
    return 'background-fallback';
  }

  return false;
}

async function scheduleReminder() {
  const value = datetimeInput.value;
  const message = messageInput.value.trim() || 'EVNotify reminder triggered';

  if (!value) {
    alert('Please select a date and time for the reminder.');
    return;
  }

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp) || timestamp <= Date.now()) {
    alert('Please choose a future date and time.');
    return;
  }

  const reminder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp,
    message,
    method: 'pending'
  };

  const method = await scheduleNotification(reminder);
  if (!method) {
    alert('Unable to schedule the reminder. Please try again in a supported browser.');
    return;
  }

  reminder.method = method;
  reminders.push(reminder);
  updateReminderList();
  alert(`Reminder scheduled ${method === 'background' ? 'for background delivery' : 'as a fallback while open'}.`);
}

function initializeInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPromptEvent = event;
    installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt();
    const choiceResult = await installPromptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      installButton.hidden = true;
    }
    installPromptEvent = null;
  });
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      await requestPeriodicBackgroundSync(registration);
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
}

permissionButton.addEventListener('click', requestPermission);
scheduleButton.addEventListener('click', scheduleReminder);

window.addEventListener('load', async () => {
  await loadReminders();
  updateReminderList();
  updatePermissionButton();
  initializeInstallPrompt();
  await registerServiceWorker();
});
