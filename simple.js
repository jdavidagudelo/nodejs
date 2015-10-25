var pg = require('pg');
var express = require('express');
var app = express();
var fs = require("fs");
var conString = "postgres://gdajlwhifvavrx:Dvdy-EfbFMeHGqvJUHNeW6pm-4@ec2-54-83-51-38.compute-1.amazonaws.com:5432/d94rqqcm162uva?ssl=true";

console.log("hello world");
app.get('/getMessages', function (req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var query = client.query("select * from Messages");
	var result = [];
	query.on('row', function(row) {
		result.push(row);
	});
	query.on('end', function() { 
  		client.end();
		res.send(JSON.stringify(result));
	});
});
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
