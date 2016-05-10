import {Form} from "lib/underas/container";
import {TextInput, CheckBox} from "lib/underas/input";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {Menu} from "./Menu";
import {IPerfil, IPerfilNotificacao} from "../model/IPerfil";
import {PerfilNotificacao} from "./PerfilNotificacao";

export class PerfilViewNotificacao extends Form {
	mainList: TileList<IPerfil>;
	_modPerfilNotificacao: PerfilNotificacao;
	constructor() {
		super();		
		this.setSize(4);
		this.mainList = new TileList<IPerfil>("Perfil");
		this.mainList.setItemViewResource("perfil/view/assets/html/perfil");
		this.append(this.mainList);
	}
	onStart(): void {
		this._modPerfilNotificacao = new PerfilNotificacao();
		//this.getModView().append(this._modPerfilNotificacao);
		$http
			.get("perfil/getbysnativo/S")
			.done((dta: IPerfil[]) => this.mainList.setDataProvider(dta));
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilNotificacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
