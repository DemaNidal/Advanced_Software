const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const DataRoutes = require('./Routes/Data');
app.use('/data', DataRoutes);

const interestRoute = require('./Routes/user_interests');
const userRoute = require('./Routes/userRoute');
const reportRoute = require('./Routes/reportRoute');
const resourceRoute = require('./Routes/resourceRoute');

app.use('/api', interestRoute);
app.use('/api/users', userRoute);
app.use('/api/reports', reportRoute);
app.use('/api/resources', resourceRoute);

app.listen(8080, ()=>{
    console.log("server running on port 8080");
});