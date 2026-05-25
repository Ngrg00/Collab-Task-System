const { Pool } = require('pg');

const db = new Pool({
    host: "localhost",
    user: "postgres",
    port: process.env.PORTPG,
    password: process.env.PASSWORD,
    database: process.env.DB
});

module.exports = db; 