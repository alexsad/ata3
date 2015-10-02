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
