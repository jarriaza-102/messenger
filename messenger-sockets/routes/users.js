const express = require('express');
const router = express.Router();
const db = require('../db/db');
const randomstring = require("randomstring");

/* GET users listing. */
router.get('/', function(req, res) {
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	const results = [];

	pool.connect((err, client, done) => {

		if (err) {
			done();
			console.log(err);
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT id, email, full_name from users'));

		query.on('error', (response) => {
			done();
			return res.json(response);
		});

		query.on('row', (row) => {
			results.push(row);
		});

		query.on('end', () => {
			done();
			return res.json(results);
		});

	});

	pool.end();

});

router.post('/login', function (req, res) {
	//console.log(req.get('token'));
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = undefined;

	pool.connect((err, client, done) => {

		if (err) {
			done();
			console.log(err);
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT id, email, full_name from users where email = ($1) AND password = ($2)', [req.body.email, req.body.password]));

		query.on('error', (response) => {
			done();
			return res.json(response);
		});

		query.on('row', (row) => {
			result = row;
		});

		query.on('end', () => {
			done();
			if (result !== undefined) {
				const token = randomstring.generate();
				client.query(new db.pg.Query('INSERT INTO tokens(token, user_id) VALUES($1,$2)', [token, result.id]));
				result.token = token;
			}
			return res.json(result);
		});

	});

	pool.end();
	
});

router.post('/', function (req, res) {
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = undefined;

	pool.connect((err, client, done) => {

		if (err) {
			done();
			console.log(err);
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('INSERT INTO users (email,password,full_name) VALUES($1,$2,$3)', [req.body.email, req.body.password, req.body.full_name]));

		query.on('error', (response) => {
			done();
			return res.json(response);
		});

		query.on('row', (row) => {
			result = row;
		});

		query.on('end', () => {
			done();
			return res.json(result);
		});

	});
	
});

module.exports = router;