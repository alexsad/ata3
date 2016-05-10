import {NumericStepper, CheckBox, TextInput} from "lib/underas/input";
import {ITrimestre} from "../model/ITrimestre";
import {CRUDForm} from "../../form/view/CRUDForm";

export class TrimestreForm extends CRUDForm<ITrimestre>{
	itIdTrimestre:TextInput	; 
	itAno:NumericStepper;	 
	itNrTrimestre:NumericStepper;	 
	itSnAberto:CheckBox;	
	constructor(){
		super({ "domain": "trimestre" });			
		this.setSize(5);
		
		this.buildToolBar();

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setName("$id");
		this.itIdTrimestre.setLabel("cod.");
		this.itIdTrimestre.setEnable(false);	
		this.itIdTrimestre.setSize(2);	
		this.append(this.itIdTrimestre);

		this.itAno = new NumericStepper(2015);
		this.itAno.setName("@ano");
		this.itAno.setLabel("ano");
		this.itAno.setStep(1);
		this.itAno.setMin(2014);
		this.itAno.setMax(2050);
		this.itAno.setEnable(false,2);
		this.itAno.setSize(3);	
		this.append(this.itAno);

		this.itNrTrimestre = new NumericStepper(1);
		this.itNrTrimestre.setName("@nrTrimestre");
		this.itNrTrimestre.setLabel("trim.");
		this.itNrTrimestre.setStep(1);
		this.itNrTrimestre.setMin(1);
		this.itNrTrimestre.setMax(4);		
		this.itNrTrimestre.setEnable(false,2);
		this.itNrTrimestre.setSize(3);
		this.append(this.itNrTrimestre);

		this.itSnAberto = new CheckBox("Disponivel","Sim");
		this.itSnAberto.setName("@snAberto");
		this.itSnAberto.setLabel("disponivel");
		this.itSnAberto.setSize(4);	
		this.append(this.itSnAberto);
		
		this.buildTileList({ itemViewResource: "trimestre/view/assets/html/trimestre"});
	}
	onStart():void{
		this.reloadItens();
	}
}