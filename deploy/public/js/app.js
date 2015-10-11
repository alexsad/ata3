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
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			br:'../br'
			/*,util:'underas/util'
			,core:'underas/core'
			,container:'underas/container'
			,controller:'underas/controller'
			,net:'underas/net'*/
		}
});

//var _app = {"loaded":{}};

$(function(){

	
	requirejs(
		['container','net','br/ata/usuario/view/Login']
		,function(_container,_net,_modlogin){
			_net.RequestManager.setRootUrl("http://127.0.0.1:8330/");
			//console.log(m);
			//var t = new sub.SubB(45);
			//t.doAnyThing("nova instancia!!!!");
			//$("body").append("<div>!teste</div>");
			var teste = new _modlogin.Login();
			var mdw = new _container.ModView("cadastro de teste!!!");
			mdw.getEle().addClass("mdwLogin");
			mdw.setIcon("key");
			mdw.show(true);
			mdw.append(teste);
		}
	);
	
	/*
	requirejs(
		['container','net','br/ata/perfil/view/Perfil']
		,function(_container,_net,_mod){
			_net.RequestManager.setRootUrl("http://127.0.0.1:8330/");
			//console.log(m);
			//var t = new sub.SubB(45);
			//t.doAnyThing("nova instancia!!!!");
			//$("body").append("<div>!teste</div>");
			var teste = new _mod.Perfil();
			var mdw = new _container.ModView("cadastro de teste!!!");
			mdw.setIcon("key");
			mdw.show(true);
			mdw.append(teste);
		}
	);
	*/
});
