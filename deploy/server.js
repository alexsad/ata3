var restify = require('restify');
var fs = require('fs');

//funcoes globais
global.__extends=function (d, b) {
for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
global.__decorate=function (decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
    case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
    case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
  }
};
global.__metadata=function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
//server.use(restify.fullResponse());
server.use(restify.CORS({
    origins: ['*']
}));

var baseDir = "./app/br/ata";	
	
fs.readdir(baseDir, function (err, files) { // '/' denotes the root folder
  if (err) throw err;
   files.forEach( function (file) {
   	fs.readdir(baseDir+"/"+file+"/controller", function (err2, files2) { // '/' denotes the root folder
			if (err2) throw err2;
			files2.forEach( function (file2) {
				var modToLoad = baseDir+"/"+file+"/controller/"+file2.substring(0,file2.length-3);
				var tmpmod = require(modToLoad);
			});
		});
   });
});

server.listen(8299, function () {
  console.log('%s listening at %s', server.name, server.url);
});

exports.server = server;