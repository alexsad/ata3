import {Select, TextInput, TextArea, NumericStepper} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {$http, IRequestConfig} from "lib/underas/http";
import {IDiscurso} from "../model/IDiscurso";
import {IMembro} from "../../organizacao/model/IMembro";

export class Discursante extends CRUDForm<IDiscurso>{
	itIdDiscurso:TextInput;
	itIdMembro:Select;
	itIdReuniao:Select;
	itTempo:NumericStepper;
	itTema:TextInput;
	itFonte:TextArea;
	itLinkFonte:TextInput;
	constructor(){
		super({
			"domain": "discurso" 
		});		
		this.setSize(8);

		this.buildToolBar();

		this.itIdDiscurso = new TextInput("");
		this.itIdDiscurso.setName("$id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);
		this.itIdDiscurso.setSize(2);
		this.append(this.itIdDiscurso);

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setName("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("id");
		this.itIdMembro.setLabelField("nome");
		this.itIdMembro.setSize(4);
		this.append(this.itIdMembro);

		this.itIdReuniao = new Select("reuniao");
		this.itIdReuniao.setName("!idReuniao");
		this.itIdReuniao.setLabel("reuniao");
		this.itIdReuniao.setValueField("id");
		this.itIdReuniao.setLabelField("dsData");
		this.itIdReuniao.setSize(3);
		this.append(this.itIdReuniao);

		this.itTempo = new NumericStepper(5);
		this.itTempo.setName("@tempo");
		this.itTempo.setLabel("tempo");
		this.itTempo.setSize(3);
	    this.itTempo.setMin(5);
	    this.itTempo.setMax(15);
	    this.itTempo.setStep(5);
	    this.itTempo.setEnable(false,2);
		this.append(this.itTempo);

		this.itTema = new TextInput("");
		this.itTema.setName("@tema");
		this.itTema.setLabel("tema");
		this.itTema.setSize(12);
		this.append(this.itTema);

		this.itFonte = new TextArea("alia. pg.");
		this.itFonte.setName("@fonte");
		this.itFonte.setLabel("ajuda");
		this.itFonte.setSize(12);
		this.itFonte.setMaxLength(25);
		this.append(this.itFonte);

		this.itLinkFonte = new TextInput("");
		this.itLinkFonte.setName("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);
		this.append(this.itLinkFonte);

		this.buildTileList({ itemViewResource: "reuniao/view/assets/html/discursante" });
	}
	onStart():void{
		this.itIdMembro.fromService({
			url: "membro/getbysnativo/S"
		});
		this.itIdReuniao.fromService({
			url:"reuniao"
		});
	}
	getByIdReuniao(p_idReuniao:number): void {
		this.itIdReuniao.setValue(p_idReuniao+"");
		$http
			.get("discurso/getbyidreuniao/" + p_idReuniao)
			.done((dta: IDiscurso[]) => this.mainList.setDataProvider(dta));
	}
}
