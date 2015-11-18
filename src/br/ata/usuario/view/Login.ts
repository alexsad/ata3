import {Underas} from "../../../../lib/underas/core";
import {ModWindow} from "../../../../lib/underas/container";
import {Button, InputPassWord, InputEmail, Notify, AlertMsg} from "../../../../lib/underas/controller";
import {RequestManager} from "../../../../lib/underas/net";
import {IUsuario} from "../model/IUsuario";
import {PerfilBox} from "../../perfil/view/PerfilBox";

declare var perfilBoxContainer: PerfilBox;

export class Login extends ModWindow{
	amAviso:AlertMsg;
	notifys:Notify;
	itlogin:InputEmail;
	itsenha:InputPassWord;
	btEntrar:Button;
	constructor(){
		super("Login");
		this.setRevision("$Revision: 140 $");
		this.setSize(4);

		this.getEle().addClass("col-sm-offset-4 col-xs-offset-0");

		this.amAviso = new AlertMsg("");
		this.amAviso.show(false);
		this.append(this.amAviso);

		this.itlogin = new InputEmail("");
		this.itlogin.setLabel("login");
		this.itlogin.setPlaceHolder("digite seu login");
		this.itlogin.setSize(12);
		this.itlogin.setIcon("user");
		this.append(this.itlogin);

		this.itsenha = new InputPassWord("");
		this.itsenha.setLabel("senha");
		this.itsenha.setPlaceHolder("digite sua senha");
		this.itsenha.setSize(12);
		this.append(this.itsenha);

		this.btEntrar = new Button("Logar");
		this.btEntrar.addEvent("click",this.logar.bind(this));
		this.append(this.btEntrar);

	}
	onStart():void{
		this.getModView().showNav(false);
		this.autoLogin();
		perfilBoxContainer = new PerfilBox(this);
	}
	logar():void{
	   if(!this.itlogin.isValid()){
		   this.itlogin.setValid(false);
		   this.amAviso.setText("Login invalido!");
		   this.amAviso.setType(AlertMsg.TP_ERROR);
		   this.amAviso.show(true);
		   return;
	   }else{
		   this.itlogin.setValid(true);
		   this.amAviso.show(false);
	   }
	   if(!this.itsenha.isValid()){
		   this.itsenha.setValid(false);
		   this.amAviso.setText("Digite uma senha!");
		   this.amAviso.setType(AlertMsg.TP_ERROR);
		   this.amAviso.show(true);
		   return;
	   }else{
		   this.itsenha.setValid(true);
		   this.amAviso.show(false);
	   }

	   RequestManager.addRequest({
		   "url":"usuario/logar"
		   ,"method":"post"
		   ,"data":{
				"login":this.itlogin.getValue()
				,"senha":this.itsenha.getValue()
		   }
		   ,"onLoad":function(dta:boolean){
		   	if(dta==true){
	           this.amAviso.show(false);
	           this.getDados();
		   	}else{
		   		this.amAviso.setText("Login ou senha invalidos!");
		   		this.amAviso.setType(AlertMsg.TP_ERROR);
		   		this.amAviso.show(true);
		   		//_gaq.push(['_trackEvent', 'usuario.business.UsuarioBLL.logar', 'invalido']);
		   	}
	   }.bind(this)});
	}
	getDados():void{
		RequestManager.addRequest({
			"url":"usuario/getbylogin/"+this.itlogin.getValue()
			,"onLoad" : function(dta:IUsuario){
				if(dta){
					perfilBoxContainer.getPerfisByIdUsuario(dta.id);
				}
			}.bind(this)
		});
	}
	logOff():void{
		this.clearAll();
		this.itsenha.setValue("");
		this.itlogin.setValue("");
		this.getModView().show(true).showNav(false);
	}
	clearAll():void{
		$("#sidebar,#tabs_menu,#navbarlist").html("");
		$("#conteudo div.ModView").not(".mdwLogin").remove();
	}
	autoLogin():void{
		var tl = Underas.getUrlParam("login");
		var ts = Underas.getUrlParam("senha");
		if(tl!=""){
			this.itlogin.setValue(tl);
			this.itsenha.setValue(ts);
			this.logar();
		}
	}
	getNotificaoes():void{
		RequestManager.addRequest({
			//"s" : "notificacao.business.ConfigNotificacaoBLL.getValidasByIdGrupo",
			//"m":"notificacao",
			"url":"notificacoes"
			//data:this.idGrupo,
			,"onLoad":function(dtas:IUsuario[]) {
				/*
				login.notifys = new ArrayList(dtas.rs);
				var tmL = login.notifys.size();
				if(tmL > 0){
					var plogin = login.itlogin.getValue();
					var pidOrganizacao = login.idOrganizacao;
					var pidGrupo = login.idGrupo;
					var	pidUsuario = login.idUsuario;

					for(var y = 0;y < tmL;y++){
						  var tmpS = login.notifys.get(y)["servicoCount"];
						  var tmpM = 'none';
						  if(tmpS.match(/\.*?\./g).length > 1){
							  tmpS = tmpS.substring(tmpS.indexOf('.')+1,tmpS.length);
						   	  tmpM = login.notifys.get(y)["servicoCount"].substring(0,login.notifys.get(y)["servicoCount"].indexOf('.'));
						  }
						  js.underas.net.RequestManager.addRequest({
							"s" : tmpM+".business."+tmpS,
							"t"  : (y+1),
							"puid":"login",
							//"idRequest":(y+1),
							"idGrupo" : pidGrupo,
							"email":plogin,
							"idUsuario":pidUsuario,
							"idOrganizacao":pidOrganizacao,
							"onLoad":function(dtasL){
									//funcao chamada deve retornar um inteiro com o total do servico
									var totalRs = dtasL.rs;
									if(totalRs > 0){
										var x = parseInt(dtasL.t);
										x--;
										var sList = login.notifys.get(x)["servicoList"];
										var mody = sList;
										var fnACT = "";
										if(sList.indexOf(":")>-1){
											var posiFn = sList.indexOf(":");
											fnACT = sList.substring(posiFn+1,sList.length);
											mody = sList.substring(0,posiFn);
										}



										var tp_notic_obj = login.notifys.get(x)["tpNotificacao"];
										var tipoN =js.underas.controller.Notify.TP_SUCCESS;
										if(tp_notic_obj==2){
											tipoN = js.underas.controller.Notify.TP_WARNING;
										}else if(tp_notic_obj==3){
											tipoN = js.underas.controller.Notify.TP_ERROR;
										}

										mainNotifyPool.addNotify(new js.underas.controller.Notify({
											"title":login.notifys.get(x)["descricao"]
											,"subtitle":login.notifys.get(x)["mascara"]
											,"count":totalRs
											,"type":tipoN
											,"varmod":mody
											,"actmod":fnACT
											,"titlemod":login.notifys.get(x)["descricao"]
											,"iconmo":"file"
										}));
									}
							}});
					}
				}
			 */
			}.bind(this)
		});
	}
}
