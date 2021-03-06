import {ModWindow,WebContainer} from "lib/underas/container";
import {CheckBox, TextInput, DatePicker, ListView} from "lib/underas/controller";
import {RequestManager, IDefaultRequest, ToolBar} from "lib/underas/net";
import {ITrimestreDataLivre} from "../model/ITrimestre";

@WebContainer({
	itemViewResource: "trimestre/view/assets/html/trimestredatalivre"
})
export class TrimestreDataLivre extends ModWindow{
	itIdData:TextInput;
	itIdTrimestre: TextInput;
	itMomento:DatePicker;
	itSnDisponivel:CheckBox;
	mainTb: ToolBar;
	mainList:ListView<ITrimestreDataLivre>;
	constructor(){
		super("*Datas Livres");		
		this.setSize(3);

		this.mainTb = new ToolBar({ "domain": "trimestredatalivre" });
		this.append(this.mainTb);

		this.itIdData = new TextInput();
		this.itIdData.setLabel("Cod:");
    	this.itIdData.setColumn("$id");
		this.itIdData.setEnable(false);
		this.itIdData.setSize(3);
		this.append(this.itIdData);

		this.itIdTrimestre = new TextInput();
		this.itIdTrimestre.setLabel("Trim:");
		this.itIdTrimestre.setColumn("!idTrimestre");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(3);
		this.append(this.itIdTrimestre);

		this.itMomento = new DatePicker();
		this.itMomento.setLabel("Data:");
		this.itMomento.setColumn("@momento");
		this.itMomento.setSize(6);
		this.append(this.itMomento);

		this.itSnDisponivel = new CheckBox("disponivel?","sim");
		this.itSnDisponivel.setSize(12);
		this.itSnDisponivel.setColumn("@snDisponivel");
		this.append(this.itSnDisponivel);

		this.mainList = new ListView<ITrimestreDataLivre>("perfis");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart():void{
	}
	getByIdTrimestre(p_idTrimestre:number):void{
		this.itIdTrimestre.setValue(p_idTrimestre+"");
		RequestManager.addRequest({
			url:"trimestredatalivre/getbyidtrimestre/"+p_idTrimestre
			,onLoad:function(dta:ITrimestreDataLivre[]){
				(<TrimestreDataLivre>this).mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
}
