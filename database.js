require('dotenv').config();

const mysql = require('mysql2/promise');

database = mysql.createPool({
    host: process.env.DB_HOST, //adresse of the server
    port: process.env.DB_PORT, // port of the DB server (mysql), not to be confusent with the APP_PORT !
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = database;



