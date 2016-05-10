import {Form} from "lib/underas/container";
import {Alert} from "lib/underas/widget";
import {EBasicColorStatus} from "lib/underas/component";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {ITrimestre} from "../model/ITrimestre";
import PerfilBox = require("../../perfil/view/PerfilBox");

export class TrimestreViewForm extends Form{
	amOrcamentoAtual: Alert;
	mainList: TileList<ITrimestre>;
	static EVENT_ITEM_CHANGE: string = TileList.EVENT_ITEM_CHANGE;
	constructor(){
		super();			
		this.setSize(4);

		this.amOrcamentoAtual = new Alert("Clique no trimestre para ver o orcamento...");
		this.amOrcamentoAtual.show(true);
		this.amOrcamentoAtual.setColor(EBasicColorStatus.INFO);
		this.amOrcamentoAtual.setSize(12);
		this.append(this.amOrcamentoAtual);

		this.mainList = new TileList<ITrimestre>("Trimestre");
		this.mainList.setItemViewResource("trimestre/view/assets/html/trimestreview");
		this.append(this.mainList);
	}
	onStart():void{
		this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE, (evt: Event, p_obj: ITrimestre) => this.fireEvent(TrimestreViewForm.EVENT_ITEM_CHANGE,p_obj,this.getSaldo()));
		this.getTrimestres();
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
