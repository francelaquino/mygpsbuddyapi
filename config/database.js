const mysql = require('mysql');

const database = mysql.createPool({
    connectionLimit : 100, 
    host     : '162.241.253.207',
    user     : 'mygpsbud_node',
    password : 'gZ]Qxps-;P%}',
    database : 'mygpsbud_trackingbuddy',
    debug    :  false
});

module.exports = database;
