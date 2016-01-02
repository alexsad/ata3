
requirejs.config({
		baseUrl:'js'
		,urlArgs : "bust="+new Date().getTime()
		,paths:{
			//'underas':'lib/underas'
			//,'lib/underas':'lib/underas'
			/*
			'core':'lib/underas/core'
			,'net':'lib/underas/net'
			,'util':'lib/underas/util'
			,'controller':'lib/underas/controller'
			,'container':'lib/underas/container'
			*/
			'jquery-ui':'lib/jqueryui/jquery-ui.min'
			,'jquery': 'lib/jquery/dist/jquery.min'
			,'jsPDF':'lib/jspdf/jspdf.debug'
			,'jspdfreport':'lib/jspdf/jspdfreport'
			,'cookies':'lib/cookies-js/dist/cookies.min'
			,'bootstrap-datepicker':'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker.min'
			,'bootstrap-datepicker-locale-pt-BR':'lib/bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min'
			//,'container':'lib/underas/container'
			
		}
		,shim: {
	        //"jspdf" : { exports : "jsPDF" }	   
	        'br/ata/trimestre/view/AtividadeAutorizacao': ['jspdfreport']
	        ,'br/ata/reuniao/view/ReuniaoPorPeriodo': ['jquery-ui']
    	}
		,waitSeconds:15
});

var perfilBoxContainer = null;
	requirejs(['jquery','cookies','bootstrap-datepicker'],function($jq,_cookie){
			window.$ = window.jQuery = $jq;
			window.Cookies = _cookie;

			$jq(function(){
					requirejs(['br/ata/main/view/main','bootstrap-datepicker-locale-pt-BR'],function(){}
				);
			});
		}
	);

/*
	requirejs(
		[
		'lib/underas/core'
		,'lib/underas/container'
		,'br/underdesk/usuario/view/Usuario'
		,'br/underdesk/perfil/view/Perfil'
		]
		,function(_core,_container,_mod,_mod2){
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
