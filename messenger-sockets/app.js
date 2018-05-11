const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('sanitize').middleware);
const userRoutes = require('./routes/users');
const conversationsRoutes = require('./routes/conversations');

app.use('/', function (req, res, next) {
	next();
		return;
	if (req.originalUrl === '/users/login') {
		next();
		return;
	}
	const token = req.get('api-token');
	if (token === undefined) {
		return res.status(401).json(getError());
	}

	var result = undefined;

	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	pool.connect((err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT token from tokens where token = $1', [token]));

		query.on('error', (response) => {
			done();
			return res.status(401).json(getError());
		});

		query.on('row', (row) => {
			result = row;
		});

		query.on('end', () => {
			done();
			if (result === undefined) {
				return res.status(401).json(getError());
			}
			next();
			return;
		});

	});

	pool.end();
});

app.use('/users', userRoutes);
app.use('/conversations', conversationsRoutes);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

function getError() {
	return {
			status: 'fail'
		};
}

module.exports = app;