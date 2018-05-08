const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var userRoutes = require('./routes/users');

app.use('/', function (req, res, next) {
	console.log(req.originalUrl);
	if (req.originalUrl === '/users/login') {
		next();
		return;
	}
	const token = req.get('token');
	if (token === undefined) {
		return res.json({
			status: 'fail'
		});
	}

	var result = undefined;

	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	pool.connect((err, client, done) => {

		if (err) {
			done();
			console.log(err);
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT token from tokens where token = $1', [token]));

		query.on('error', (response) => {
			done();
			return res.json({
				status: 'fail',
				message: 'Token does not exist'
			});
		});

		query.on('row', (row) => {
			result = row;
		});

		query.on('end', () => {
			done();
			if (result === undefined) {
				return res.json({
					status: 'fail',
					message: 'Token does not exist'
				});
			}
			next();
			return;
		});

	});

	pool.end();
});

app.use('/users', userRoutes);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

module.exports = app;