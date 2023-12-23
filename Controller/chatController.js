const admin = require('firebase-admin');


const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Other options...
});

const db = admin.firestore();
const messagesCollection = db.collection('messages');

let lastMessageId = 0;

/////////////////////////////////////////
function generateMessageId() {
  lastMessageId += 1;
  return lastMessageId.toString();
}

////////////////////////////////////////////
// Function to send FCM message
const sendMessage = async (req, res) => {
  const { data } = req.body;

  try {
    const messageId = generateMessageId();

    const messageData = {
      ...data,
      messageId,
    };

    const message = {
      data: messageData,
      notification: {
        title: data.title || 'New Message',
        body: data.body || 'You have a new message',
      },
      topic: 'testTopic',
    };

    // Save the message to Firestore
    await messagesCollection.add(messageData);

    // Send FCM message
    const response = await admin.messaging().send(message);

    res.json({ success: true, message: 'Message sent successfully', response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Error sending message', error });
  }
};

///////////////////////////////////////////////////
// Function to retrieve all messages
const getAllMessages = async (req, res) => {
  try {
    const snapshot = await messagesCollection.get();
    const messages = snapshot.docs.map(doc => doc.data());
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ success: false, message: 'Error getting messages', error });
  }
};

//////////////////////////////////////////////////
// Function to get messages for a specific user
const getUserMessages = async (req, res) => {
  const userId = req.params.id;

  try {
    const snapshot = await messagesCollection
      .where('from_user_Id', '==', userId)
      .get();

    const userMessagesSent = snapshot.docs.map(doc => doc.data());

    const snapshotReceived = await messagesCollection
      .where('to_user_id', '==', userId)
      .get();

    const userMessagesReceived = snapshotReceived.docs.map(doc => doc.data());

    const userMessages = userMessagesSent.concat(userMessagesReceived);

    res.json({ success: true, messages: userMessages });
  } catch (error) {
    console.error('Error getting user messages:', error);
    res.status(500).json({ success: false, message: 'Error getting user messages', error });
  }
};

//////////////////////////////////////////////////
module.exports = {
  sendMessage,
  getAllMessages,
  getUserMessages,
};
