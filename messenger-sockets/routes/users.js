const express = require('express');
const router = express.Router();
const db = require('../db/db');
const randomstring = require("randomstring");
const promiseHelper = require('../utils/promiseHelper');

/* GET users listing. */
router.get('/', function(req, res) {
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	const results = [];

	pool.connect((err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT id, email, full_name, password from users'));

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

/* GET user. */
router.get('/:id', function(req, res) {
	const id = req.params.id;
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = undefined;

	pool.connect((err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const query = client.query(new db.pg.Query('SELECT id, email, full_name from users WHERE id = '  + id));

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

	pool.end();

});

/* LOGIN */
router.post('/login', async (req, res) => {
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = undefined;

	pool.connect( async (err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		var [error, response] = await promiseHelper.handle(client.query('SELECT id, email, full_name from users where email = ($1) AND password = ($2)', 
				[req.body.email, req.body.password]));

		if (error) {
			done();
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					error
				]
			});
		}

		result = response.rows[0];
		if (result === undefined) {
			done();
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					'Users does not exist'
				]
			});
		}

		const token = randomstring.generate();

		[error, response] = await promiseHelper.handle(client.query('INSERT INTO tokens(token, user_id) VALUES($1,$2)', [token, result.id]));

		if (error) {
			done();
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					error
				]
			});
		}

		result.token = token;
		done();

		return res.json({
			Data: result,
			Count: 1,
			ErrorMessages: []
		});

	});

	pool.end();
	
});

router.post('/search', async (req, res) => {

	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = true;

	pool.connect(async (err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const user = {
			email: req.bodyString('email'),
			full_name: req.bodyString('full_name'),
			limit: req.bodyInt('limit')
		};

		var where = '';
		if (user.email !== undefined) {
			where = 'LOWER(email) LIKE LOWER(\'%' + user.email + '%\')';
		}

		if (user.full_name !== undefined) {
			where = (where != '') ? where + ' and LOWER(full_name) LIKE LOWER(\'%' + user.full_name + '%\')' : 'LOWER(full_name) LIKE LOWER(\'%' + user.full_name + '%\')';
		}

		if (where != '') {
			where = 'where ' + where;
			if (user.limit !== undefined) {
				where += ' LIMIT ' + user.limit;
			}
		} else {
			where = 'LIMIT ' + user.limit;
		}

		const [error, response] = await promiseHelper.handle(client.query('SELECT id, full_name as name from users ' + where));
		done();
		if (error) {
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					error
				]
			});
		}

		var lala = response.rows;
		var newArray = [];
		for (var i=0;i<lala.length;i++) {
			newArray.push({
				id: lala[i].id,
				name: lala[i].name,
				img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
				info: 'other info',
				view: true,
				add: true
			});
		}
		response.rows = newArray;

		return res.json({
			Data: response.rows,
			Count: response.rowCount,
			ErrorMessages: []
		});

	});

	pool.end();

});

router.post('/', async (req, res) => {

	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var result = true;

	pool.connect(async (err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const user = {
			email: req.bodyString('email').trim(),
			password: req.bodyString('password').trim(), 
			full_name: req.bodyString('full_name').trim()
		};
		var [error, response] = await promiseHelper.handle(client.query('SELECT id from users where email = ($1)', [user.email]));
		if (response.rowCount > 0 ) {
			done();
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					'Email is already in use'
				]
			});
		}

		[error, response] = await promiseHelper.handle(client.query('INSERT INTO users (email,password,full_name) VALUES($1,$2,$3)', [user.email, user.password, user.full_name]));

		done();
		if (error) {
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					error
				]
			});
		}

		return res.json({
			Data: true,
			Count: 0,
			ErrorMessages: []
		});
	});

	pool.end();

});

/* UPDATE */
router.patch('/:id', async (req, res) => {
	const id = req.params.id;

	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	pool.connect( async (err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		const user = {
			email: req.bodyString('email').trim(),
			full_name: req.bodyString('full_name').trim()
		};

		var [error, response] = await promiseHelper.handle(client.query('UPDATE users SET email = ($1), full_name = ($2) WHERE id = ' + id, 
				[user.email, user.full_name]));

		done();

		if (error) {
			return res.json({
				Data: false,
				Count: 0,
				ErrorMessages: [
					error
				]
			});
		}

		return res.json({
			Data: true,
			Count: 0,
			ErrorMessages: []
		});

	});
	
});

module.exports = router;