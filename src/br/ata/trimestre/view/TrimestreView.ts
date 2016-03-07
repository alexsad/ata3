import {ModWindow,WebContainer} from "lib/underas/container";
import {AlertMsg} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar} from "lib/underas/net";
import {$http, IRequestConfig} from "lib/underas/http";
import PerfilBox = require("../../perfil/view/PerfilBox");
import {Atividade} from "./Atividade";
import {ITrimestre} from "../model/ITrimestre";

@WebContainer({
	itemViewResource: "trimestre/view/assets/html/trimestreview"
})
export class TrimestreView extends ModWindow{
	amOrcamentoAtual: AlertMsg;
	mainList: ListView<ITrimestre>;
	_modAtividade: Atividade;
	constructor(){
		super("trimestres");
		this.showTitle(false);		
		this.setSize(4);

		this.amOrcamentoAtual = new AlertMsg("Clique no trimestre para ver o orcamento...");
		this.amOrcamentoAtual.show(true);
		this.amOrcamentoAtual.setType(AlertMsg.TP_INFO);
		this.amOrcamentoAtual.setSize(12);
		this.append(this.amOrcamentoAtual);

		this.mainList = new ListView<ITrimestre>("Trimestre");
		this.append(this.mainList);
	}
	onStart():void{
		this._modAtividade = new Atividade(this);
		this.getModView().append(this._modAtividade);
		this.getTrimestres();
	}
	onChangeItem(p_item: ITrimestre): ITrimestre {
		this._modAtividade.getByIdTrimestreIdPerfil(p_item.id, PerfilBox.getIdPerfil());
		return p_item;
	}
	getSaldo():number{
		var tmpItemTrimestre:ITrimestre = <ITrimestre>this.mainList.getSelectedItem();
		return parseInt(tmpItemTrimestre.vtSaldo+"");
	}
	setSaldo(p_saldonovo:number):void{
		var tmpItemTrimestre: ITrimestre = <ITrimestre>this.mainList.getSelectedItem();
		tmpItemTrimestre.vtSaldo = p_saldonovo;
	}
	getTrimestres():void{
		$http
			.get("trimestre/getbyidperfil/" + PerfilBox.getIdPerfil())
			.done((dta: ITrimestre[]) => this.mainList.setDataProvider(dta));
	}
}
