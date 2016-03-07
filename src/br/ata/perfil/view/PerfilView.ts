import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, CheckBox} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {$http, IRequestConfig} from "lib/underas/http";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";
import {EPerfilAutorizacaoTP} from "../model/IPerfilAutorizacao";
import {PerfilAutorizacao} from "./PerfilAutorizacao";

@WebContainer({
	itemViewResource: "perfil/view/assets/html/perfil"
})
export class PerfilView extends ModWindow {
	mainList: ListView<IPerfil>;
	_modPerfilAutorizacao: PerfilAutorizacao;
	constructor() {
		super("Perfil");		
		this.setSize(4);

		this.mainList = new ListView<IPerfil>("Perfil");
		this.append(this.mainList);
	}
	onStart(): void {

		this._modPerfilAutorizacao = new PerfilAutorizacao();
		this._modPerfilAutorizacao.setTitle("Apravacao");
		this._modPerfilAutorizacao.aviso.setText("Lista de perfis que o perfil selecionado pode aprovar ou liberar as atividades!");
		this.getModView().append(this._modPerfilAutorizacao);

		$http
			.get("perfil/getbysnativo/S")
			.done((dta: IPerfil[]) => this.getMainList().setDataProvider(dta));
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilAutorizacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
