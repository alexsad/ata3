

var _gaq = _gaq || [];

  _gaq.push(['_setAccount', 'UA-31004174-2']);
  _gaq.push(['_trackPageview']);

  js.underas.net.RequestManager._log_erro = function(args){
	 _gaq.push(['_trackEvent','erro',args.s, args.e.join()]);
  };
  js.underas.net.RequestManager._log_success = function(args){
		//_gaq.push(['_trackEvent','sucesso',args.s,args.m]);
  };  
  
var mainNotifyPool = null;

window.addEvent('domready',function(){ 
	//rm.format = "jsonp";
	//rm.url="http://jasite.no-ip.biz:8330/ata3/ws";
	mainNotifyPool = new js.underas.controller.NotifyPool("avisos");
	mainNotifyPool.getEle().setStyles({
				'margin-top':'8px'
				,'padding-right':'0px'});
	 $$("#sidebar").grab(mainNotifyPool.getEle());	
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.usuario.view.Login","act":"autoLogin","icon":"lock","title":"Autenticacao"});

	js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.usuario.view.Usuario","icon":"user","title":"Usuarios"});

	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.perfil.view.Perfil","act":"","icon":"user","title":"perfil"});
	

	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.membro.view.Membro","act":"","icon":"user","title":"membros"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.reuniao.view.Reuniao","act":"","icon":"tags","title":"reunioes"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.grupo.view.Grupo","act":"","icon":"globe","title":"grupos"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.organizacao.view.Organizacao","act":"","icon":"user","title":"organizacoes"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.trimestre.view.Trimestre","icon":"globe","title":"trimestres"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.certificado.view.Certificado","icon":"lock","title":"certificado"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.discurso.view.Convite","icon":"search","title":"convites"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.atividade.view.EventoPorPeriodo","icon":"star","title":"calendario"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.discurso.view.Discursante","icon":"calendar","title":"discurso"});
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.menu.view.Menu","icon":"menu","title":"menu"});		
	//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.usuario.view.Login","act":"autoLogin","icon":"lock","title":"Autenticacao"});








});
