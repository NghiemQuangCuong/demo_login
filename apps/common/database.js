const mysql = require('mysql');
const config = require('config');

const connection = mysql.createConnection({
    host: config.get("mysql.host"),
    port: config.get("mysql.port"),
    database: config.get("mysql.database"),
    user: config.get("mysql.user"),
    password: config.get("mysql.password"),
});

connection.connect();

function getConnection()
{
    if (!connection)
    {
        connection.connect();
    }
    return connection;
}

exports.getConnection = getConnection;