var express = require("express");
var path = require("path");
var app = express();

app.use('/data', express.static(path.join(__dirname,'data')));
app.use('/static', express.static(path.join(__dirname,'js')));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.listen(8080);
