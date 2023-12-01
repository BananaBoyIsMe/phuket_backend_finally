const mysql = require('mysql2')
const dbConfig = require("../config/db.config");
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//For PlanetScale
// require('dotenv').config()
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')

module.exports = connection;