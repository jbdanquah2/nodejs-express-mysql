const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//db connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//opening a connection
connection.connect(error => {
    if (error) throw error
    console.log('successfully connected to database');
});

module.exports = connection;