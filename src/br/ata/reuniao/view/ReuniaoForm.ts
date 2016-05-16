import {TextInput, TextArea, NumericStepper,DatePickerInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {IReuniao} from "../model/IReuniao";
import {EViewSize} from "lib/underas/component";

export class ReuniaoForm extends CRUDForm<IReuniao>{
	itIdReuniao:TextInput;
	itMomento:DatePickerInput;
	itFrequencia:NumericStepper;
	itObs:TextInput;
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
		this.itIdReuniao.setSize(12,EViewSize.EXTRA_SMALL);
		this.append(this.itIdReuniao);

		this.itMomento = new DatePickerInput({
			daysOfWeekDisabled: [1, 2, 3, 4, 5, 6]
			,daysOfWeekHighlighted: [0]
		});
		this.itMomento.setName("@momento");
		this.itMomento.setLabel("data");
		this.itMomento.setSize(5);
		this.itMomento.setSize(12,EViewSize.EXTRA_SMALL);
		this.append(this.itMomento);

		this.itFrequencia = new NumericStepper(0);
		this.itFrequencia.setName("@frequencia");
		this.itFrequencia.setLabel("frequencia");		
		this.itFrequencia.setMin(0);
		this.itFrequencia.setMax(999);
		this.itFrequencia.setSize(4);
		this.itFrequencia.setSize(12,EViewSize.EXTRA_SMALL);
		this.append(this.itFrequencia);

		this.itObs = new TextInput("");
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
