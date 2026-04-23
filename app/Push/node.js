const webpush = require('web-push');
const express = require('express');
const app = express();

app.use(express.json());

webpush.setVapidDetails(
  'mailto:your@email.com',
  'YOUR_PUBLIC_VAPID_KEY',
  'YOUR_PRIVATE_VAPID_KEY'
);

app.post('/notify', (req, res) => {
  const { subscription, delay } = req.body;

  setTimeout(() => {
    webpush.sendNotification(subscription, "Your 10-second timer is up!")
      .catch(err => console.error(err));
  }, delay);

  res.status(200).json({ status: 'Scheduled' });
});

app.listen(3000);