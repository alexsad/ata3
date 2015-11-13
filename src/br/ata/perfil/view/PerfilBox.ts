import {MenuTab} from "../../../../lib/controller";
import {RequestManager} from "../../../../lib/net";
import {IPerfil, IItemMenu, IPerfilSimples} from "../model/IPerfil";
import {Login} from "../../usuario/view/Login";

export class PerfilBox{
	_perfis: string[];
	_perfilSelected: string;
	_modLogin: Login;
	idUsuario: number;
	constructor(p_modLogin:Login){
		this._perfis = [];
		this._modLogin = p_modLogin;
	}
	setIdPerfil(p_idPerfil:string):void{
		this._perfilSelected = p_idPerfil;
	}
	getIdPerfil():string{
		return this._perfilSelected;
	}
	setPerfis(p_perfis:string[]):void{
		this._perfis = p_perfis;
	}
	getPerfis():string[]{
		return this._perfis;
	}

	filtrarPerfis(p_idPerfil:string,p_perfis:string[]): void {
		this.setIdPerfil(p_idPerfil);
		this.setPerfis(p_perfis);
		RequestManager.addRequest({
			"url": "perfil/perfilsimples"
			, "module": this._modLogin
			, "onLoad": function(dtap: IPerfilSimples[]) {
				var tmpPerfisOk: IPerfilSimples[] = [];
				for (var i: number = 0; i < dtap.length; i++) {
					if (this.getPerfis().indexOf(dtap[i]._id) > -1) {
						tmpPerfisOk.push(dtap[i]);
					};
					if (tmpPerfisOk.length == this.getPerfis().length) {
						break;
					}
				};
				this.getMenusByIdPerfil(this.getIdPerfil(), tmpPerfisOk);
			}.bind(this)
		});
	}
	getMenusByIdPerfil(p_idPerfil: string, p_perfis: IPerfilSimples[]): void {
		RequestManager.addRequest({
			"url": "perfil/get/" + p_idPerfil,
			"module": this._modLogin,
			"onLoad": function(dta: IPerfil) {
				var tmpMenu = new MenuTab({ "domain": "", "target": "#sidebar" });
				var tmpChildrens: IItemMenu[] = [];
				for (var i: number = 0; i < p_perfis.length; i++) {
					var tmpIcon: string = '';
					if (p_perfis[i]._id == this.getIdPerfil()) {
						tmpIcon = 'ok';
					};
					tmpChildrens.push({
						label: p_perfis[i].descricao
						, funcao: '' + p_perfis[i]._id
						, tela: 'tela'
						, icone: tmpIcon
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
				var tmpLogin: string = this._modLogin.itlogin.getValue();
				tmpLogin = tmpLogin.substring(0, tmpLogin.indexOf("@"));
				var tmpIdM: number = dta.menus.length - 1;
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
							this.filtrarPerfis(tmpIdPerfil, this.getPerfis());
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
