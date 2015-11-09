var http = require('http');
var app = require('./config/express')();
//require("./config/sequelizedb.js")("/mnt/arquivos/workspace/db/sqlite/ata3.sqlite");


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' +
	app.get('port'));
});
