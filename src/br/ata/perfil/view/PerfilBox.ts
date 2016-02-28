import {NotifyPool, ENotifyType, ENotifyPoolType} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";
import {AlertWindow} from "lib/underas/container";
//import {MenuTab} from "lib/underas/menutab";
import {IPerfil, IMenu, IItemMenu, IPerfilNotificacao} from "../model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import {UsuarioUploadAvatar} from "../../usuario/view/UsuarioUploadAvatar";
import MenuAdm = require("../../menu/view/MenuAdm");


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
	setLogin(p_login: string): void {
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
		MenuAdm.appendTo("#main_menu_adm");
		MenuAdm.onChangePerfil = this.setIdPerfil.bind(this);
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
		MenuAdm.setPerfis(this.getPerfisUsuario());
		MenuAdm.setIdPerfil(p_idPerfil);
		MenuAdm.loginUsuario = this.login;
	}
}

var PerfilBox: PerfilBoxStatic = new PerfilBoxStatic();
export = PerfilBox;