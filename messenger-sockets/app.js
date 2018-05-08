const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

module.exports = app;