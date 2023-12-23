const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const DataRoutes = require('./Routes/Data');
const interestRoute = require('./Routes/user_interests');
const userRoute = require('./Routes/userRoute');
const reportRoute = require('./Routes/reportRoute');
const resourceRoute = require('./Routes/resourceRoute');
const reactionRoute = require('./Routes/reactionRoute');
const chatRoute = require('./Routes/chatRoutes');
const notificationRoute = require('./Routes/notificationRoute');

app.use('/api', DataRoutes);
app.use('/api', interestRoute);
app.use('/api', userRoute);
app.use('/api', reportRoute);
app.use('/api', resourceRoute);
app.use('/api', reactionRoute);
app.use('/api', chatRoute);
app.use('/api', notificationRoute);

////////////////////////////////////////////////////////
// const admin = require('firebase-admin');

// const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path accordingly

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // Other options...
// });
////////////////////////////////////////////////////////
app.listen(8080, ()=>{
    console.log("server running on port 8080");
});