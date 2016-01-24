import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, TextArea, NumericStepper, DatePicker, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager} from "lib/underas/net";
import {Discursante} from "./Discursante";
import {IReuniao} from "../model/IReuniao";

@WebContainer({
	itemViewResource: "assets/html/reuniao"
})
export class Reuniao extends ModWindow{
	itIdReuniao:TextInput;
	itMomento:DatePicker;
	itFrequencia:NumericStepper;
	itObs:TextArea;
	mainList:ListView;
	mainTb:ToolBar;
	_modDiscursante: Discursante;
	constructor(){
		super("*cadastro de reunioes.");		
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"reuniao"});
		this.append(this.mainTb);

		this.itIdReuniao = new TextInput();
		this.itIdReuniao.setColumn("$id");
		this.itIdReuniao.setLabel("cod.");
		this.itIdReuniao.setEnable(false);
		this.itIdReuniao.setSize(3);
		this.append(this.itIdReuniao);

		this.itMomento = new DatePicker();
		this.itMomento.setColumn("@momento");
		this.itMomento.setLabel("data");
		this.itMomento.setSize(4);
		this.itMomento.setConfig({
			daysOfWeekDisabled: [1,2,3,4,5,6],
			daysOfWeekHighlighted:[0]
		});
		this.append(this.itMomento);

		this.itFrequencia = new NumericStepper(0);
		this.itFrequencia.setColumn("@frequencia");
		this.itFrequencia.setLabel("frequencia");
		this.itFrequencia.setSize(5);
		this.itFrequencia.setMin(0);
		this.itFrequencia.setMax(999);
		this.append(this.itFrequencia);

		this.itObs = new TextArea("");
		this.itObs.setColumn("@obs");
		this.itObs.setLabel("obs");
		this.itObs.setSize(12);
		this.append(this.itObs);

		this.mainList = new ListView("Reuniao");
		this.append(this.mainList);
	}
	onStart():void{
		this._modDiscursante = new Discursante();
		this.getModView().append(this._modDiscursante);
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj:IReuniao):IReuniao{
		//this._modDiscursante._idReuniao = this.itIdReuniao.getValue();
		//this._modDiscursante.getMainList().setDataProvider(p_obj.discursos);
		this._modDiscursante.getByIdReuniao(p_obj.id);
		return p_obj;
	}
}
