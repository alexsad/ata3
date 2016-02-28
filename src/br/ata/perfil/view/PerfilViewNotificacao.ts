import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, CheckBox} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {RequestManager, IDefaultRequest} from "lib/underas/net";
import {Menu} from "./Menu";
import {IPerfil, IPerfilNotificacao} from "../model/IPerfil";
import {PerfilNotificacao} from "./PerfilNotificacao";

@WebContainer({
	itemViewResource: "perfil/view/assets/html/perfil"
})
export class PerfilViewNotificacao extends ModWindow {
	mainList: ListView<IPerfilNotificacao>;
	_modPerfilNotificacao: PerfilNotificacao;
	constructor() {
		super("Perfil");		
		this.setSize(4);
		this.mainList = new ListView<IPerfilNotificacao>("Perfil");
		this.append(this.mainList);
	}
	onStart(): void {
		this._modPerfilNotificacao = new PerfilNotificacao();
		this.getModView().append(this._modPerfilNotificacao);
		RequestManager.addRequest({
			"url": "perfil/getbysnativo/S"
			, "onLoad": function(dta: IPerfil[]): void {
				(<PerfilViewNotificacao>this).getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilNotificacao.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}
