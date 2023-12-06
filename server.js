// app.js
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const interestRoute = require('./Routes/user_interests');
const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const userRoute = require('./Routes/userRoute');
const DataRoutes = require('./Routes/Data');
const reportRoute = require('./Routes/reportRoute');
const resourceRoute = require('./Routes/resourceRoute');


app.use('/data', DataRoutes);
app.use('/api', interestRoute);
app.use('/api/users', userRoute);
app.use('/api/reports', reportRoute);
app.use('/api/resources', resourceRoute);

//app.use('/api', reactionRoute);

app.listen(8080, () => {
    console.log("server running on port 8080");
});
