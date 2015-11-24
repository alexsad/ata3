
requirejs.config({
		baseUrl:'js/lib'
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			'br':'../br'
			,'jquery-ui':'jqueryui/jquery-ui.min'
			,'jquery': 'jquery/dist/jquery.min'
			,'net':'underas/net'
			,'util':'underas/util'
			,'core':'underas/core'
			,'container':'underas/container'
			,'controller':'underas/controller'
			,'jspdf':'jspdf/jspdf.debug'
			,'jspdfreport':'jspdf/jspdfreport'
			//,'pdfrender':'jspdf/pdfrender'
		}
		,shim: {
	        //"jspdf" : { exports : "jsPDF" }	   
	        'br/ata/trimestre/view/AtividadeAutorizacao': ['jspdfreport']
	        ,'br/ata/reuniao/view/ReuniaoPorPeriodo': ['jquery-ui']
    	}

		,waitSeconds:15
});

var perfilBoxContainer = null;
	requirejs(['jquery'],function($jq){
			window.$ = window.jQuery = $jq;
			//window.$ = window.jQuery = $jq;

			//jsPDF = jspdf;

			$jq(function(){
				console.log("teste");
				requirejs(['br/ata/main/view/main']	,function(_modmain){
						_modmain.initApp();
					}
				);
			});
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
		]
		,function(_core,_container,_net,_mod,_mod2){
			var tmpLocation = _core.Underas.getLocation();
			//tmpLocation = tmpLocation.replace("8080","8330");
			tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8299"))+"8330/";
			_net.RequestManager.setRootUrl(tmpLocation);
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
