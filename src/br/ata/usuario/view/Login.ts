import {IUsuario} from "../model/IUsuario";
import {ModWindow} from "../../../../lib/container";
import {MenuTab,Button,InputPassWord,InputEmail,Notify,AlertMsg} from "../../../../lib/controller";
import {RequestManager} from "../../../../lib/net";
import {Underas} from "../../../../lib/core";
import {IPerfil, IItemMenu, IPerfilSimples} from "../../perfil/model/IPerfil";

export class Login extends ModWindow{
	idOrganizacao:string;
	idUsuario:string
	idPerfil: string;
	amAviso:AlertMsg;
	notifys:Notify;
	itlogin:InputEmail;
	itsenha:InputPassWord;
	btEntrar:Button;
	_perfis:string[];
	_perfisSimples:IPerfilSimples[];
	constructor(){
		super("Login","br.ata.usuario.view.Login");
		this.setRevision("$Revision: 139 $");
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
		/*
		this.itIdPerfil.fromService({
			"url": "perfil/perfilsimples"
			, "module": this
		});
		*/
		this.getModView().showNav(false);
		this.autoLogin();
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
		   "module":this
		   ,"url":"usuario/logar"
		   ,"method":"get"
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
			,"module":this
			,"onLoad" : function(dta:IUsuario) {
				//console.log(dta);
				if(dta){
					this.idOrganizacao = dta.idOrganizacao;
					this.idUsuario = dta._id;
					//this.idGrupo = dta.idGrupo;
					//this.getMenusByIdPerfil(dta.perfis[0],dta.perfis);
					this._perfis = dta.perfis;
					this.filtrarPerfis(dta.perfis);
				}
			}.bind(this)
		});
	}
	logOff():void{
		/*
		var menu = new MenuTab({"title":"InfoAta 3.1","target":"#sidebar"});
		menu.setDataProvider([]);
		$$("#navbarlist li").setStyle("display","none");
		login.itlogin.setValue("");
		login.itsenha.setValue("");
		login.getModView().show(true).showNav(true);
		*/
		this.clearAll();
		this.itsenha.setValue("");
		this.itlogin.setValue("");
		this.getModView().show(true).showNav(false);
		this._perfis = [];
		this._perfisSimples = [];
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
	filtrarPerfis(p_perfis: string[]): void {
		RequestManager.addRequest({
			"url": "perfil/perfilsimples"
			, "module": this
			, "onLoad": function(dtap: IPerfilSimples[]) {
				var tmpPerfisOk: IPerfilSimples[] = [];
				for (var i: number=0; i < dtap.length; i++) {
					if (p_perfis.indexOf(dtap[i]._id) > -1) {
						tmpPerfisOk.push(dtap[i]);
					};
					if (tmpPerfisOk.length == p_perfis.length) {
						break;
					}
				};				
				this._perfisSimples = tmpPerfisOk;
				this.getMenusByIdPerfil(p_perfis[0], tmpPerfisOk);
			}.bind(this)
		});
	}
	getMenusByIdPerfil(p_idPerfil: string, p_perfis: IPerfilSimples[]): void {
		RequestManager.addRequest({
			"url": "perfil/get/" + p_idPerfil,
			"module": this,
			"onLoad": function(dta: IPerfil) {
				var tmpMenu = new MenuTab({ "domain": "", "target": "#sidebar" });
				var tmpChildrens: IItemMenu[] = [];			
				for (var i: number = 0; i < p_perfis.length;i++){
					tmpChildrens.push({
						label: p_perfis[i].descricao
						, funcao:''+p_perfis[i]._id
						, tela:'tela'
						, icone:''
						, ordem: i
					});
				};
				tmpChildrens.push({
					label: 'sair'
					, funcao: 'logOff'
					, tela: 'br.ata.usuario.view.Login'
					, icone: 'off'
					, ordem: 1
				});	
				dta.menus.push({
					//id:'2344jfjfel'
					icone: ''
					, label: ''
					, ordem: 23
					, children: tmpChildrens
				});
				
				tmpMenu.setDataProvider(dta.menus);

				var tmpLogin: string = this.itlogin.getValue();
				tmpLogin = tmpLogin.substring(0, tmpLogin.indexOf("@"));

				var tmpIdM: number = dta.menus.length - 1;
				$("#tabmenu_" + tmpIdM + ",#tabmenu_"+tmpIdM+"_l").addClass("pull-right");
				$("#tabmenu_" + tmpIdM + " a").html(
					'<img style="border: 2px solid #fff;border-radius: 100%;margin: -4px 8px 0 0;max-width: 30px;" alt="Photo" src="http://i.imgur.com/RLiDK.png" class="nav-user-photo">'
					+'<small class="hidden-xs">'+tmpLogin+'</small>'
				);
				$("#tabmenu_" + tmpIdM + "_l li").not(":last").on('click',function(evt:Event){
					evt.preventDefault();
					//this.logOff();
					var tmpIdPerfil:string = $(evt.target).parent().attr("data-actmod");
					//console.log($(evt.target).parent());
					//console.log(tmpIdPerfil);
					this.clearAll();
					this.getMenusByIdPerfil(tmpIdPerfil,this._perfisSimples);
				}.bind(this));
				$("#tabmenu_" + tmpIdM + "_l li:last").on('click',function(evt:Event){
					evt.preventDefault();
					this.logOff();
				}.bind(this));
				//menu.setIcon('assets/logo_title.jpg');
				this.getModView().show(false).showNav(false);
				//login.getNotificaoes();
			}.bind(this)
		});
	}
	getNotificaoes():void{
		RequestManager.addRequest({
			//"s" : "notificacao.business.ConfigNotificacaoBLL.getValidasByIdGrupo",
			//"m":"notificacao",
			url:"notificacoes"
			,module:this
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
