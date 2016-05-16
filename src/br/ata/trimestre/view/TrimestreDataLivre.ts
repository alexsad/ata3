import {CheckBox, TextInput, DatePickerInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {$http, IRequestConfig} from "lib/underas/http";
import {ITrimestreDataLivre} from "../model/ITrimestre";

export class TrimestreDataLivre extends CRUDForm<ITrimestreDataLivre>{
	itIdData:TextInput;
	itIdTrimestre: TextInput;
	itMomento: DatePickerInput;
	itSnDisponivel:CheckBox;
	constructor(){
		super({ "domain": "trimestredatalivre" });		
		this.setSize(12);

		this.buildToolBar();

		this.itIdData = new TextInput();
		this.itIdData.setLabel("Cod:");
    	this.itIdData.setName("$id");
		this.itIdData.setEnable(false);
		this.itIdData.setSize(3);
		this.append(this.itIdData);

		this.itIdTrimestre = new TextInput();
		this.itIdTrimestre.setLabel("Trim:");
		this.itIdTrimestre.setName("!idTrimestre");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(3);
		this.append(this.itIdTrimestre);

		this.itMomento = new DatePickerInput();
		this.itMomento.setLabel("Data:");
		this.itMomento.setName("@momento");
		this.itMomento.setSize(6);
		this.append(this.itMomento);

		this.itSnDisponivel = new CheckBox("disponivel?","sim");
		this.itSnDisponivel.setSize(12);
		this.itSnDisponivel.setName("@snDisponivel");
		this.append(this.itSnDisponivel);

		this.buildTileList({ itemViewResource: "trimestre/view/assets/html/trimestredatalivre" });
	}
	getByIdTrimestre(p_idTrimestre:number):void{
		this.itIdTrimestre.setValue(p_idTrimestre+"");
		$http
			.get("trimestredatalivre/getbyidtrimestre/" + p_idTrimestre)
			.done((dta: ITrimestreDataLivre[]) => this.mainList.setDataProvider(dta));
	}
}
