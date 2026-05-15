const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DB
});

module.exports = db;