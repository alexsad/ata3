import {IReuniao} from "../model/IReuniao";
import {ModWindow} from "../../../../lib/container";
import {InputText,TextArea,NumericStepper,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager} from "../../../../lib/net";
import {Discursante} from "./Discursante";

@ItemView("assets/html/reuniao.html")
export class Reuniao extends ModWindow{
	itIdReuniao:InputText;
	itMomento:DatePicker;
	itFrequencia:NumericStepper;
	itObs:TextArea;
	mainList:ListView;
	mainTb:ToolBar;
	_modDiscursante: Discursante;
	constructor(){
		super("*cadastro de reunioes.");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"reuniao"});
		this.append(this.mainTb);

		this.itIdReuniao = new InputText();
		this.itIdReuniao.setColumn("$_id");
		this.itIdReuniao.setLabel("cod.");
		this.itIdReuniao.setEnable(false);
		this.itIdReuniao.setSize(3);
		this.append(this.itIdReuniao);

		this.itMomento = new DatePicker();
		this.itMomento.setColumn("@momento");
		this.itMomento.setLabel("data");
		this.itMomento.setSize(4);
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
		this._modDiscursante._idReuniao = this.itIdReuniao.getValue();
		this._modDiscursante.getMainList().setDataProvider(p_obj.discursos);
		return p_obj;
	}
}
