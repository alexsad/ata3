import {Form} from "lib/underas/container";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {IPerfil} from "../model/IPerfil";

export class PerfilViewNotificacaoForm extends Form {
	private mainList: TileList<IPerfil>;
	static EVENT_ITEM_CHANGE: string = TileList.EVENT_ITEM_CHANGE;
	constructor() {
		super();		
		this.setSize(4);
		this.mainList = new TileList<IPerfil>("Perfil");
		this.mainList.setItemViewResource("perfil/view/assets/html/perfil");
		this.append(this.mainList);
	}
	onStart(): void {
		$http
			.get("perfil/getbysnativo/S")
			.done((dta: IPerfil[]) => this.mainList.setDataProvider(dta));
		this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE, (evt: Event, p_obj: IPerfil) => this.fireEvent(PerfilViewNotificacaoForm.EVENT_ITEM_CHANGE, p_obj));
	}
}
