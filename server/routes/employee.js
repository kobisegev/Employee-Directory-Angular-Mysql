var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  database: 'directory',
  user : 'dbuser',
  password : 'dbpwd',
  insecureAuth: true
});
    connection.connect(function(err){
        if(err != null) {
            res.end('Error connecting to mysql:' + err+'\n');
        }
    });

exports.findAll = function(req, res) {
	connection.query("SELECT * from directory.employee order by id", function(err, rows){
	res.jsonp(rows);		
	});
}
	

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    connection.query("SELECT * from directory.employee where id ="+ id, function(err, rows){
	res.jsonp(rows[0]); //query returns array of arrays we need to return the first one only.
	});
};


exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
	connection.query("SELECT * from directory.employee where managerId ="+ id, function(err, rows){
	res.jsonp(rows);
    });
};
