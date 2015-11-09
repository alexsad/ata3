// config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var dinRoute = require("../app/lib/DinRoute");
var fs = require('fs');
//var fs = require('fs.extra');

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

module.exports = function() {
var app = express();
// configuracao de ambiente
app.set('port', 8330);
app.set("jsonp callback", true);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    if ('OPTIONS' === req.method) {
        res.status(204).send();
    }else {
        next();
    };
});
// middleware
//app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(require('method-override')());
dinRoute.DinRoute.setApp(app);
//console.log(dinRoute.DinRoute);

var baseDir = 'app/br/ata';
load(baseDir+"/"+"certificado"+'/controller', {checkext:true, extlist:['.js']}).into(app);
       
/*
fs.readdir(baseDir, function (err, files) { // '/' denotes the root folder
  if (err) throw err;
   files.forEach( function (file) {
     //console.log(baseDir+"/"+file+'/controller');
     fs.lstat('/'+file, function(err, stats) {

       if (!err && stats.isDirectory()) { //conditing for identifying folders
         //console.log("dir:"+file);
         //console.log(baseDir+"/"+file+'/controller');
         load(baseDir+"/"+file+'/controller', {checkext:true, extlist:['.js']}).into(app);
       }else{
         //console.log("file:"+file);
         //console.log(baseDir+"/"+file+'/controller');
         load(baseDir+"/"+file+'/controller', {checkext:true, extlist:['.js']}).into(app);
       }
     });
   });
});
*/
return app;
};
