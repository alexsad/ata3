import {Form} from "lib/underas/container";
import {TextInput, CheckBox} from "lib/underas/input";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";
import {EPerfilAutorizacaoTP} from "../model/IPerfilAutorizacao";
import {PerfilAutorizacao} from "./PerfilAutorizacao";

export class PerfilView extends Form {
	mainList: TileList<IPerfil>;
	_modPerfilAutorizacao: PerfilAutorizacao;
	constructor() {
		super();		
		this.setSize(4);

		this.mainList = new TileList<IPerfil>("Perfil");
		this.mainList.setItemViewResource("perfil/view/assets/html/perfil");
		this.append(this.mainList);
	}
	onStart(): void {

		this._modPerfilAutorizacao = new PerfilAutorizacao();
		//this._modPerfilAutorizacao.setTitle("Apravacao");
		this._modPerfilAutorizacao.aviso.setText("Lista de perfis que o perfil selecionado pode aprovar ou liberar as atividades!");
		//this.getModView().append(this._modPerfilAutorizacao);

		$http
			.get("perfil/getbysnativo/S")
			.done((dta: IPerfil[]) => this.mainList.setDataProvider(dta));
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilAutorizacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
