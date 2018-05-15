const express = require('express');
const router = express.Router();
const db = require('../db/db');
const randomstring = require("randomstring");
const promiseHelper = require('../utils/promiseHelper');

/* Get conversations by User token */
router.get('/', async(req, res) => {

	const token = req.get('api-token');
	const pool = new db.pg.Pool({
		connectionString: db.connectionString
	});

	var userId = 0;
	var results = [];
	pool.connect(async (err, client, done) => {

		if (err) {
			done();
			return res.status(500).json(err);
		}

		var [error, response] = await promiseHelper.handle(client.query('SELECT user_id from tokens where token = $1', [token]));

		if (error) {
			done();
			return res.json(getErrorResponse(errors));
		}

		userId = response.rows[0].user_id;

		[error, response] = await promiseHelper.handle(client.query('SELECT * from group_users INNER JOIN groups ON group_users.id_group = groups.id where id_user = $1 ', [userId]));

		if (error) {
			done();
			return res.json(getErrorResponse(errors));
		}

		results = response.rows;
		done();
		return res.json({
			Data: results,
			Count: response.rowCount,
			ErrorMessages: []
		});


	});

	pool.end();

});


module.exports = router;