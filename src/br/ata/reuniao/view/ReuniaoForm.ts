import {TextInput, TextArea, NumericStepper,DatePickerInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {IReuniao} from "../model/IReuniao";

export class ReuniaoForm extends CRUDForm<IReuniao>{
	itIdReuniao:TextInput;
	itMomento:DatePickerInput;
	itFrequencia:NumericStepper;
	itObs:TextArea;
	constructor(){
		super({
			"domain": "reuniao"
		});		
		this.setSize(4);

		this.buildToolBar();

		this.itIdReuniao = new TextInput();
		this.itIdReuniao.setName("$id");
		this.itIdReuniao.setLabel("cod.");
		this.itIdReuniao.setEnable(false);
		this.itIdReuniao.setSize(3);
		this.append(this.itIdReuniao);

		this.itMomento = new DatePickerInput({
			daysOfWeekDisabled: [1, 2, 3, 4, 5, 6]
			,daysOfWeekHighlighted: [0]
		});
		this.itMomento.setName("@momento");
		this.itMomento.setLabel("data");
		this.itMomento.setSize(5);
		this.append(this.itMomento);

		this.itFrequencia = new NumericStepper(0);
		this.itFrequencia.setName("@frequencia");
		this.itFrequencia.setLabel("frequencia");
		this.itFrequencia.setSize(4);
		this.itFrequencia.setMin(0);
		this.itFrequencia.setMax(999);
		this.append(this.itFrequencia);

		this.itObs = new TextArea("");
		this.itObs.setName("@obs");
		this.itObs.setLabel("obs");
		this.itObs.setSize(12);
		this.append(this.itObs);

		this.buildTileList({ itemViewResource: "reuniao/view/assets/html/reuniao" });
	}
	onStart():void{
		this.reloadItens();
	}
}
