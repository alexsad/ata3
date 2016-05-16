import {Form} from "lib/underas/container";
import {TextInput, CheckBox} from "lib/underas/input";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";
import {EPerfilAutorizacaoTP} from "../model/IPerfilAutorizacao";

export class PerfilViewForm extends Form {
	mainList: TileList<IPerfil>;
	static EVENT_ITEM_CHANGE: string = TileList.EVENT_ITEM_CHANGE;
	constructor() {
		super();		
		this.setSize(4);

		this.mainList = new TileList<IPerfil>("Perfil");
		this.mainList.setItemViewResource("perfil/view/assets/html/perfil");
		this.append(this.mainList);
		this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE, (evt: Event, p_obj: IPerfil) => this.fireEvent(PerfilViewForm.EVENT_ITEM_CHANGE,p_obj));
	}
	onStart(): void {
		$http
			.get("perfil/getbysnativo/S")
			.done((dta: IPerfil[]) => this.mainList.setDataProvider(dta));
	}
}
