var __extends = (this && this.__extends) || function (d, b) {
for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	switch (arguments.length) {
		case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
		case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
		case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	}
};
var __metadata = (this && this.__metadata) || function (k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

requirejs.config({
		baseUrl:'js/lib'
		,paths:{
			'br':'../br'
			,'jquery-ui':'jqueryui/jquery-ui.min'
			,'jquery': 'jquery/jquery-2.1.4.min'
			,'net':'underas/net'
			,'util':'underas/util'
			,'core':'underas/core'
			,'container':'underas/container'
			,'controller':'underas/controller'
			,'jspdf':'jspdf/jspdf.debug'
			,'pdfrender':'jspdf/pdfrender'
		}

		,shim: {
	        'br/ata/reuniao/view/ReuniaoPorPeriodo': ['jquery-ui']
	        ,"jspdf" : { exports : "jsPDF" }
    	}

		,waitSeconds:15
});

var perfilBoxContainer = null;
window.onload=function(){



	requirejs(
		[
		'br/ata/main/view/main'
		,'jquery'
		]
		,function(_modmain){
			_modmain.initApp();
		}
	);


/*
	requirejs(
		[
		'core'
		,'container'
		,'net'
		,'br/ata/usuario/view/Usuario'
		,'br/ata/perfil/view/Perfil'
		,'jquery'
		]
		,function(_core,_container,_net,_mod,_mod2){
			var tmpLocation = _core.Underas.getLocation();
			//tmpLocation = tmpLocation.replace("8080","8330");
			tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8080"))+"8330/";

			_net.RequestManager.setRootUrl(tmpLocation);

			_net.RequestManager.setRootUrl("http://127.0.0.1:8330/");
			//console.log(m);
			//var t = new sub.SubB(45);
			//t.doAnyThing("nova instancia!!!!");
			//$("body").append("<div>!teste</div>");
			var teste = new _mod.Usuario();
			var mdw = new _container.ModView("cadastro de teste!!!");
			mdw.setIcon("key");
			mdw.show(true);
			mdw.append(teste);

			var teste2 = new _mod2.Perfil();
			var mdw2 = new _container.ModView("cadastro de teste!!!");
			mdw2.setIcon("key");
			mdw2.show(true);
			mdw2.append(teste2);
		}
	);
*/
};
