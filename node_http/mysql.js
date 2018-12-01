var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'xz',
    port: 3306
})

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('select * from xz_laptop', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
})

connection.end();