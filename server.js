const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const DataRoutes = require('./Routes/Data');
app.use('/data', DataRoutes);

app.listen(8080, ()=>{
    console.log("server running on port 8080");
});