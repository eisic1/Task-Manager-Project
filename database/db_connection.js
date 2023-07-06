const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_manager_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), completed BOOLEAN);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table is created.");
    });
});

module.exports = con