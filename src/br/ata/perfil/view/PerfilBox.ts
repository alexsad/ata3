import {MenuTab} from "../../../../lib/controller";
import {RequestManager} from "../../../../lib/net";
import {IPerfil,IMenu, IItemMenu} from "../model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import {Login} from "../../usuario/view/Login";

export class PerfilBox{
	_perfisUsuario: IUsuarioPerfil[];	
	_perfilSelected: string;
	_modLogin: Login;
	idUsuario: number;
	idPerfil: number;
	constructor(p_modLogin:Login){
		this._perfisUsuario = [];
		this._modLogin = p_modLogin;
	}
	setIdPerfil(p_idPerfil:number):void{
		this.idPerfil = p_idPerfil;
	}
	getIdPerfil():number{
		return this.idPerfil;
	}

	setPerfisUsuario(p_perfis: IUsuarioPerfil[]): void {
		RequestManager.addRequest({
			url: "perfil/getbysnativo/S"
			,onLoad:function(dta:IPerfil[]){
				//p_perfis.()
				p_perfis.forEach(function(usuarioperfil: IUsuarioPerfil){
					dta.every(function(pperfil: IPerfil): boolean{
						if(pperfil.id==usuarioperfil.idPerfil){
							usuarioperfil.dsPerfil = pperfil.descricao;
							return false;
						};
						return true;
					});
				});
			}.bind(this)
		});
		this._perfisUsuario = p_perfis;
	}
	getPerfisUsuario(): IUsuarioPerfil[] {
		return this._perfisUsuario;
	}
	getPerfisByIdUsuario(p_idUsuario:number):void{
		this.idUsuario = p_idUsuario;
		RequestManager.addRequest({
			url:"usuarioperfil/getbyidusuario/"+p_idUsuario
			, onLoad: function(dta: IUsuarioPerfil[]): void {
				this.setPerfisUsuario(dta);
				if(dta.length>0){
					this.getMenusByIdPerfil(dta[0].idPerfil);
				}
			}.bind(this)
		});
		
	}

	getMenusByIdPerfil(p_idPerfil: number): void {

		this.setIdPerfil(p_idPerfil);

		//this.getPerfisUsuario()

		RequestManager.addRequest({
			"url": "menu/getfullbyidperfil/" + p_idPerfil,
			"module": this._modLogin,
			"onLoad": function(dta: IMenu[]) {
				var tmpMenu = new MenuTab({ "domain": "", "target": "#sidebar" });
				var tmpChildrens: IItemMenu[] = [];
				var tmpPerfis: IUsuarioPerfil[] = this.getPerfisUsuario();
				for (var i: number = 0; i < tmpPerfis.length; i++) {
					var tmpIcon: string = '';
					if (tmpPerfis[i].id == this.getIdPerfil()) {
						tmpIcon = 'ok';
					};
					tmpChildrens.push({
						label: tmpPerfis[i].dsPerfil
						, funcao: '' + tmpPerfis[i].id
						, tela: 'tela'
						, icone: tmpIcon
						, ordem: i
						, idMenu:0
					});
				};
				tmpChildrens.push({
					label: 'sair'
					, funcao: 'logOff'
					, tela: 'br.ata.usuario.view.Login'
					, icone: 'off'
					, ordem: 1
					,idMenu:0
				});
				dta.push({
					//id:'2344jfjfel'
					icone: ''
					, label: ''
					, ordem: 23
					, children: tmpChildrens
					,idPerfil:0
				});
				tmpMenu.setDataProvider(dta);
				var tmpLogin: string = this._modLogin.itlogin.getValue();
				tmpLogin = tmpLogin.substring(0, tmpLogin.indexOf("@"));
				var tmpIdM: number = dta.length - 1;
				$("#tabmenu_" + tmpIdM + ",#tabmenu_" + tmpIdM + "_l").addClass("pull-right");
				$("#tabmenu_" + tmpIdM + " a").html(
					'<img style="border: 2px solid #fff;border-radius: 100%;margin: -4px 8px 0 0;max-width: 30px;" alt="Photo" src="http://i.imgur.com/RLiDK.png" class="nav-user-photo">'
					+ '<small class="hidden-xs">' + tmpLogin + '</small>'
				);
				$("#tabmenu_" + tmpIdM + "_l li").removeClass("elegibleToClick").not(":last").on('click', function(evt: Event) {
					evt.preventDefault();
					//this.logOff();
					var tmpEle: JQuery = $(evt.target);
					//console.log(tmpEle);
					var tmpIdPerfil: string = tmpEle.attr("data-actmod");
					if (!tmpEle.hasClass("LinkButton")) {
						tmpIdPerfil = tmpEle.parents(".LinkButton").attr("data-actmod");
					};
					//var tmpIdPerfil: string = tmpEle.attr("data-actmod");
					if (tmpIdPerfil) {

						//console.log(tmpEle);
						//console.log(tmpIdPerfil);

						if (tmpIdPerfil != this.getIdPerfil()) {
							this.setIdPerfil(tmpIdPerfil);
							this._modLogin.clearAll();
							//this.filtrarPerfis(tmpIdPerfil, this.getPerfis());
						};

					};
				}.bind(this));
				$("#tabmenu_" + tmpIdM + "_l li:last").on('click', function(evt: Event) {
					evt.preventDefault();
					this._modLogin.logOff();
				}.bind(this));
				//menu.setIcon('assets/logo_title.jpg');
				this._modLogin.getModView().show(false).showNav(false);
				//login.getNotificaoes();
			}.bind(this)
		});
	}
}
