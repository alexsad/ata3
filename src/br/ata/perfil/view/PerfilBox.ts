import {NotifyPool, ENotifyType, ENotifyPoolType} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";
import {AlertWindow} from "lib/underas/container";
import {MenuTab} from "lib/underas/menutab";
import {IPerfil, IMenu, IItemMenu, IPerfilNotificacao} from "../model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import {UsuarioUploadAvatar} from "../../usuario/view/UsuarioUploadAvatar";

declare var require: any;

class PerfilBoxStatic {
	_perfisUsuario: IUsuarioPerfil[];
	_perfilSelected: string;
	idUsuario: number;
	idPerfil: number;
	private login: string;
	_notificacoes: NotifyPool;
	_setAvatar: UsuarioUploadAvatar;
	private _idbox: string;
	constructor() {

		this._perfisUsuario = [];
	}
	setIdPerfil(p_idPerfil: number): void {
		this.idPerfil = p_idPerfil;
	}
	getIdPerfil(): number {
		return this.idPerfil;
	}
	getLogin(): string {
		return this.login;
	}
	setLogin(p_login): void {
		this.login = p_login;
	}
	setPerfisUsuario(p_perfis: IUsuarioPerfil[]): void {
		RequestManager.addRequest({
			url: "perfil/getbysnativo/S"
			, onLoad: function(dta: IPerfil[]) {
				//p_perfis.()
				p_perfis.forEach(function(usuarioperfil: IUsuarioPerfil) {
					dta.every(function(pperfil: IPerfil): boolean {
						if (pperfil.id == usuarioperfil.idPerfil) {
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
	getPerfisByIdUsuario(p_idUsuario: number): void {
		this.idUsuario = p_idUsuario;
		RequestManager.addRequest({
			url: "usuarioperfil/getbyidusuario/" + p_idUsuario
			, onLoad: function(dta: IUsuarioPerfil[]): void {
				this.setPerfisUsuario(dta);
				if (dta.length > 0) {
					this.getMenusByIdPerfil(dta[0].idPerfil);
				}
			}.bind(this)
		});

	}
	loadNotificacoesPerfil(): void {
		this._notificacoes = new NotifyPool("Avisos");
		this._notificacoes.$
			.removeClass("column col-xs-2 col-sm-1")
			.css({
				"margin-top": "10px"
			});
		$(this._idbox)
			.html("")
			.addClass("pull-right")
			.append(this._notificacoes.$);

		RequestManager.addRequest({
			url: "perfilnotificacao/getbyidperfil/" + this.getIdPerfil()
			, onLoad: function(dta: IPerfilNotificacao[]) {
				dta.forEach(function(itemPerfilNotificacao: IPerfilNotificacao) {
					RequestManager.addRequest({
						url: itemPerfilNotificacao.servicoContagem
						, rootUrl: ""
						, onLoad: function(result: { count: number }): void {
							if (result.count >= itemPerfilNotificacao.limiteMin && result.count <= itemPerfilNotificacao.limiteMax) {
								this._notificacoes.addNotify({
									"title": itemPerfilNotificacao.descricao
									, "subtitle": itemPerfilNotificacao.mascara.replace(/\{total\}/g, result.count + "")
									, "count": result.count
									, "type": itemPerfilNotificacao.tpNotificacao
									, "icon": itemPerfilNotificacao.icone
									, "module": itemPerfilNotificacao.modulo
									, "moduleAction": itemPerfilNotificacao.moduloAcao
									, "moduleIcon": itemPerfilNotificacao.moduloIcone
									, "moduleTitle": itemPerfilNotificacao.descricao
								});
							}
						}.bind(this)
					});
				}.bind(this));


			}.bind(this)
		});

	}
	setAvatar(): void {
		if (!this._setAvatar) {
			this._setAvatar = new UsuarioUploadAvatar(this.idUsuario);
			$("body").append(this._setAvatar.$);
			this._setAvatar.$.on("avatarchanged", function() { 
				//console.log("teste, mudando icones!!");				
				$("#user_avatar_icon").attr("src", 'assets/avatars/avatar_' + this.idUsuario + '.png?tbust=' + new Date().getTime());
				this._setAvatar.show(false);
			}.bind(this));
		};
		this._setAvatar.show(true);
	}
	onLogoutPress(p_hanndler: Function): void {
		p_hanndler();
	}
	getMenusByIdPerfil(p_idPerfil: number): void {
		this.setIdPerfil(p_idPerfil);

		RequestManager.addRequest({
			"url": "menu/getfullbyidperfil/" + p_idPerfil,
			"onLoad": function(dta: IMenu[]) {
				var tmpMenu = new MenuTab({ "domain": "", "target": "#sidebar" });
				var tmpChildrens: IItemMenu[] = [];
				var tmpPerfis: IUsuarioPerfil[] = this.getPerfisUsuario();
				for (var i: number = 0; i < tmpPerfis.length; i++) {
					var tmpIcon: string = '';
					if (tmpPerfis[i].idPerfil == this.getIdPerfil()) {
						tmpIcon = 'ok';
					};
					tmpChildrens.push({
						label: tmpPerfis[i].dsPerfil
						, funcao: '' + tmpPerfis[i].idPerfil
						, tela: 'tela'
						, icone: tmpIcon
						, ordem: i
						, idMenu: 0
					});
				};
				tmpChildrens.push({
					label: 'trocar foto'
					, funcao: 'setAvatar'
					, tela: 'setAvatar'
					, icone: 'picture'
					, ordem: 2
					, idMenu: 0
				});
				tmpChildrens.push({
					label: 'sair'
					, funcao: 'logOff'
					, tela: 'br.ata.usuario.view.Login'
					, icone: 'off'
					, ordem: 1
					, idMenu: 0
				});
				dta.push({
					//id:'2344jfjfel'
					icone: ''
					, label: ''
					, ordem: 23
					, children: tmpChildrens
					, idPerfil: this.getIdPerfil()
				});
				dta.push({
					//id:'2344jfjfel'
					icone: 'bell'
					, label: 'Avisos'
					, ordem: 25
					, children: []
					, idPerfil: this.getIdPerfil()
				});

				tmpMenu.setDataProvider(dta);
				var tmpLogin: string = this.getLogin();
				tmpLogin = tmpLogin.substring(0, tmpLogin.indexOf("@"));
				var tmpIdM: number = dta.length - 1;
				this._idbox = "#tabmenu_" + (tmpIdM);
				tmpIdM--;
				$("#tabmenu_" + tmpIdM + ",#tabmenu_" + tmpIdM + "_l").addClass("pull-right");
				$("#tabmenu_" + tmpIdM + " a").html(
					'<img id="user_avatar_icon" style="border: 2px solid #04dd90;border-radius: 100%;margin: -4px 0px 0 0;max-width: 30px;width:30px;height:30px;" alt="Photo" src="assets/avatars/avatar_' + this.idUsuario + '.png" class="nav-user-photo">'
					+ '<small class="hidden-xs">' + tmpLogin + '</small>'
				);
				this.loadNotificacoesPerfil();
				//console.log(tmpIdM);
				$("#tabmenu_" + tmpIdM + "_l li").removeClass("elegibleToClick").not(":last").on('click', function(evt: Event) {
					evt.preventDefault();
					//this.logOff();
					var tmpEle: JQuery = $(evt.target);
					//console.log(tmpEle);
					var tmpIdPerfil: string = null;
					if (!tmpEle.hasClass("LinkButton")) {
						tmpIdPerfil = tmpEle.parents(".LinkButton").attr("data-actmod");
					} else {
						tmpIdPerfil = tmpEle.attr("data-actmod");
					};
					//console.log(tmpIdPerfil);
					if (tmpIdPerfil) {
						//console.log(tmpEle);
						//console.log(tmpIdPerfil);
						
						if (tmpIdPerfil == "setAvatar") {

							this.setAvatar();

						} else if (tmpIdPerfil != this.getIdPerfil()) {
							//this.setIdPerfil(tmpIdPerfil);
							this._modLogin.clearAll();
							//console.log(tmpIdPerfil);
							this.getMenusByIdPerfil(tmpIdPerfil);
						};

					};
				}.bind(this));
				$("#tabmenu_" + tmpIdM + "_l li:last").on('click', function(evt: Event) {
					evt.preventDefault();
					//Login.logOff();#	
					var Login = require("../../usuario/view/Login");
					Login.logOff();
				}.bind(this));				
				//
				//login.getNotificaoes();
			}.bind(this)
		});
	}
}

var PerfilBox: PerfilBoxStatic = new PerfilBoxStatic();
export = PerfilBox;