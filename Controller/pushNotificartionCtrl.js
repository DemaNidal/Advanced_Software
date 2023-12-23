const admin = require("firebase-admin");
const serviceAccount = require("../Config/push-notification-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.pushNotification = async (req, res) => {
  try {
    const { title, body, data, topic } = req.body;

    const message = {
      notification: {
        title: title || 'Test Notification',
        body: body || 'Notification Message',
      },
      data: data || {},
    };

    if (topic) {
      message.topic = topic;
    }

    // Simulate sending the message for demonstration purposes
    console.log('Sending FCM message:', message);

    res.status(200).send({
      message: 'Notification sent successfully',
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};