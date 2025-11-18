const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "serverdbp2.mysql.database.azure.com",
    user: "useradmin",
    password: "admin@123",
    database: "db_Michell",
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
