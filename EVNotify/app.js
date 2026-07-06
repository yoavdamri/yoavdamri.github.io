const reminderList = document.getElementById('reminderList');
const datetimeInput = document.getElementById('datetime');
const messageInput = document.getElementById('message');
const permissionButton = document.getElementById('permissionButton');
const scheduleButton = document.getElementById('scheduleButton');
const installButton = document.getElementById('installButton');

let installPromptEvent = null;
let reminders = [];

function loadReminders() {
  const stored = localStorage.getItem('evnotify-reminders');
  reminders = stored ? JSON.parse(stored) : [];
}

function saveReminders() {
  localStorage.setItem('evnotify-reminders', JSON.stringify(reminders));
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

function removeReminder(index) {
  reminders.splice(index, 1);
  saveReminders();
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

async function scheduleNotification(timestamp, message) {
  if (Notification.permission !== 'granted') {
    await requestPermission();
    if (Notification.permission !== 'granted') {
      return false;
    }
  }

  const registration = await navigator.serviceWorker.ready;
  const options = {
    body: message,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    tag: `evnotify-${Date.now()}`,
    data: { message, timestamp }
  };

  if (supportsNotificationTriggers()) {
    options.showTrigger = new TimestampTrigger(timestamp);
    options.tag = `evnotify-scheduled-${timestamp}`;
    await registration.showNotification('EVNotify Reminder', options);
    return 'background';
  }

  const delay = timestamp - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      registration.showNotification('EVNotify Reminder', options);
    }, delay);
    return 'foreground';
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

  const method = await scheduleNotification(timestamp, message);
  if (!method) {
    alert('Unable to schedule the reminder. Please try again in a supported browser.');
    return;
  }

  reminders.push({ timestamp, message, method });
  saveReminders();
  updateReminderList();
  alert(`Reminder scheduled ${method === 'background' ? 'in the background' : 'while the app is open'}.`);
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
      await navigator.serviceWorker.register('./sw.js');
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
}

permissionButton.addEventListener('click', requestPermission);
scheduleButton.addEventListener('click', scheduleReminder);

window.addEventListener('load', async () => {
  loadReminders();
  updateReminderList();
  updatePermissionButton();
  initializeInstallPrompt();
  await registerServiceWorker();
});
