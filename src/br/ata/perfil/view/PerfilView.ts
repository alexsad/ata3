import {ModWindow} from "../../../../lib/container";
import {ItemView, InputText, CheckBox, ListView} from "../../../../lib/controller";
import {RequestManager, IDefaultRequest} from "../../../../lib/net";
import {Menu} from "./Menu";
import {IPerfil, EPerfilAutorizacaoTP} from "../model/IPerfil";
import {PerfilAutorizacao} from "./PerfilAutorizacao";

@ItemView("assets/html/perfil.html")
export class PerfilView extends ModWindow {
	mainList: ListView;
	_modPerfilAutorizacao: PerfilAutorizacao;
	constructor() {
		super("Perfil");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainList = new ListView("Perfil");
		this.append(this.mainList);
	}
	onStart(): void {

		this._modPerfilAutorizacao = new PerfilAutorizacao();
		this._modPerfilAutorizacao.setTitle("Apravacao");
		this._modPerfilAutorizacao.aviso.setText("Lista de perfis que o perfil selecionado pode aprovar ou liberar as atividades!");
		this.getModView().append(this._modPerfilAutorizacao);

		RequestManager.addRequest({
			"url":"perfil"
			,"onLoad":function(dta:IPerfil[]):void{
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilAutorizacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
