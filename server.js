var express = require('express');

var server = express();
server.configure(function(){
	server.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log("App listening on port " + port)
});