import {NotifyPool, ENotifyType, ENotifyPoolType} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";
import {IPerfil, IMenu, IItemMenu, IPerfilNotificacao} from "../model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import MenuAdm = require("../../menu/view/MenuAdm");


declare var require: any;

class PerfilBoxStatic {
	_perfilSelected: string;
	idUsuario: number;
	idPerfil: number;
	private login: string;
	_notificacoes: NotifyPool;	
	private _idbox: string;
	constructor(){}
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
	getPerfisByIdUsuario(p_idUsuario: number): void {
		this.idUsuario = p_idUsuario;
		MenuAdm.idUsuario = p_idUsuario;
		MenuAdm.appendTo("#main_menu_adm");
		MenuAdm.onChangePerfil = this.setIdPerfil.bind(this);
		MenuAdm.getPerfisUsuarioByIdUsuario(p_idUsuario);
		MenuAdm.loginUsuario = this.login;
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
	onLogoutPress(p_hanndler: Function): void {
		p_hanndler();
	}
}

var PerfilBox: PerfilBoxStatic = new PerfilBoxStatic();
export = PerfilBox;