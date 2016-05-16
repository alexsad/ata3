import {Render,ICustomComponent} from "lib/underas/core";
import {$http, IRequestConfig} from "lib/underas/http";
import {ITrimestre} from "../model/ITrimestre";
import jquery = require("jquery");

@Render({
	templateResource: "trimestre/view/assets/html/trimestreview"
})
export class TrimestreViewList implements ICustomComponent {
	static EVENT_ITEM_CHANGE: string = "trimestre:change";
	static EVENT_ATIVIDADE_ADICIONAR: string = "atividade:adicionar";
	private trimestrelist: ITrimestre[];
	private indxTrimestre: number;
	public visible:boolean;
	constructor(){
		this.trimestrelist = [];
		this.indxTrimestre = 0;
		this.visible = true;
	}
	private setTrimestre(p_index:number):void{
		this.indxTrimestre = p_index;
		(<ICustomComponent>this).fireEvent(TrimestreViewList.EVENT_ITEM_CHANGE, this.trimestrelist[this.indxTrimestre], this.getSaldo());
	}
	private getSaldo():number{
		var tmpItemTrimestre: ITrimestre = this.trimestrelist[this.indxTrimestre];
		return parseInt(tmpItemTrimestre.vtSaldo+"");
	}
	private setSaldo(p_saldonovo:number):void{
		var tmpItemTrimestre: ITrimestre = this.trimestrelist[this.indxTrimestre];
		tmpItemTrimestre.vtSaldo = p_saldonovo;
	}
	private addAtividade(p_index:number):void{
		(<ICustomComponent>this).fireEvent(TrimestreViewList.EVENT_ATIVIDADE_ADICIONAR, this.trimestrelist[this.indxTrimestre], this.getSaldo());
	}
	getTrimestresByIdPerfil(p_idPerfil:number):void{
		$http
			.get("trimestre/getbyidperfil/" + p_idPerfil)
			.done((dta: ITrimestre[]) => { 
				this.trimestrelist = dta; 
				if(this.trimestrelist.length>0){
					(<ICustomComponent>this).fireEvent(TrimestreViewList.EVENT_ITEM_CHANGE, this.trimestrelist[this.indxTrimestre], this.getSaldo());
				}
			});
	}
	onRender(p_target:string):void{
		jquery(p_target).addClass("col-xs-12");
	}
}
