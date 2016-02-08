import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, CheckBox, ListView} from "lib/underas/controller";
import {RequestManager, IDefaultRequest} from "lib/underas/net";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";
import {EPerfilAutorizacaoTP} from "../model/IPerfilAutorizacao";
import {PerfilAutorizacao} from "./PerfilAutorizacao";

@WebContainer({
	itemViewResource: "assets/html/perfil"
})
export class PerfilView extends ModWindow {
	mainList: ListView;
	_modPerfilAutorizacao: PerfilAutorizacao;
	constructor() {
		super("Perfil");		
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
			"url": "perfil/getbysnativo/S"
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
