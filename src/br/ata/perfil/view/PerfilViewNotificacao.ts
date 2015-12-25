import {ModWindow} from "lib/underas/container";
import {ItemView, TextInput, CheckBox, ListView} from "lib/underas/controller";
import {RequestManager, IDefaultRequest} from "lib/underas/net";
import {Menu} from "./Menu";
import {IPerfil, IPerfilNotificacao} from "../model/IPerfil";
import {PerfilNotificacao} from "./PerfilNotificacao";

@ItemView("assets/html/perfil.html")
export class PerfilViewNotificacao extends ModWindow {
	mainList: ListView;
	_modPerfilNotificacao: PerfilNotificacao;
	constructor() {
		super("Perfil");
		this.setRevision("$Revision: 139 $");
		this.setSize(4);
		this.mainList = new ListView("Perfil");
		this.append(this.mainList);
	}
	onStart(): void {
		this._modPerfilNotificacao = new PerfilNotificacao();
		this.getModView().append(this._modPerfilNotificacao);
		RequestManager.addRequest({
			"url": "perfil/getbysnativo/S"
			, "onLoad": function(dta: IPerfil[]): void {
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilNotificacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
