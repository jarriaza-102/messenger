var db = {};
db.pg = require('pg');
db.connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5433/messenger';
module.exports = db;