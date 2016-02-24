var express = require('express'),
io = require('socket.io')(1999),
readjson = require('read-json'),
jade = require('jade'),
fs = require('fs'),
app = express(),
shoe = io,
data;

//var article = jade.compileFile(__dirname+'/public/template/article.jade');
var article = __dirname+'/public/template/article.jade';

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	readjson('./content/index.json', function (err,data) {
		if (err) res.render(article, {title: 'Error', content: err});
		res.render(article, data);
		shoe = io.of('/'+req.params.id);
	});
});app.get('/:id', function (req, res) {
	readjson('./content/'+req.params.id+'.json', function (err,data) {
		if (err) res.render(article, {title: 'Error', content: err});
		res.render(article, data);
		shoe = io.of('/'+req.params.id);
	});
});

shoe.on('connection', function (socket) {
	socket.emit('log', 'Console');
});
app.listen(8080);
console.log('Listening on 8080');