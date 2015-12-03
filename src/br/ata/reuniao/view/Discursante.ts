import {IDiscurso} from "../model/IDiscurso";
import {ModWindow} from "../../../../lib/underas/container";
import {Select, InputText, TextArea, NumericStepper, DatePicker, ListView, ItemView} from "../../../../lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";


@ItemView("assets/html/discursante.html")
export class Discursante extends ModWindow{
	itIdDiscurso:InputText;
	itIdMembro:Select;
	itIdReuniao:Select;
	itTempo:NumericStepper;
	itTema:InputText;
	itFonte:TextArea;
	itLinkFonte:InputText;
	mainList:ListView;
	mainTb:ToolBar;
	
	constructor(){
		super("*discursantes da reuniao");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"discurso"});
		this.append(this.mainTb);

		this.itIdDiscurso = new InputText("");
		this.itIdDiscurso.setColumn("$id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);
		this.itIdDiscurso.setSize(2);
		this.append(this.itIdDiscurso);

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setColumn("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("id");
		this.itIdMembro.setLabelField("nome");
		this.itIdMembro.setSize(4);
		this.append(this.itIdMembro);

		this.itIdReuniao = new Select("reuniao");
		this.itIdReuniao.setColumn("@idReuniao");
		this.itIdReuniao.setLabel("reuniao");
		this.itIdReuniao.setValueField("id");
		this.itIdReuniao.setLabelField("dsData");
		this.itIdReuniao.setSize(3);
		this.append(this.itIdReuniao);

		this.itTempo = new NumericStepper(5);
		this.itTempo.setColumn("@tempo");
		this.itTempo.setLabel("tempo");
		this.itTempo.setSize(3);
	    this.itTempo.setMin(5);
	    this.itTempo.setMax(15);
	    this.itTempo.setStep(5);
	    this.itTempo.setEnable(false,2);
		this.append(this.itTempo);

		this.itTema = new InputText("");
		this.itTema.setColumn("@tema");
		this.itTema.setLabel("tema");
		this.itTema.setSize(12);
		this.append(this.itTema);

		this.itFonte = new TextArea("alia. pg.");
		this.itFonte.setColumn("@fonte");
		this.itFonte.setLabel("ajuda");
		this.itFonte.setSize(12);
		this.itFonte.setMaxLength(25);
		this.append(this.itFonte);

		this.itLinkFonte = new InputText("");
		this.itLinkFonte.setColumn("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);
		this.append(this.itLinkFonte);

		this.mainList = new ListView("Discurso");
		this.append(this.mainList);
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
		RequestManager.addRequest({
			"url":"discurso/getbyidreuniao/"+p_idReuniao
			,"onLoad":function(dta:IDiscurso[]){
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
}
