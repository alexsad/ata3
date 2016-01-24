import {ModWindow,WebContainer} from "lib/underas/container";
import {Select, TextInput, TextArea, NumericStepper, DatePicker, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import {IDiscurso} from "../model/IDiscurso";
import {IMembro} from "../../organizacao/model/IMembro";

@WebContainer({
	itemViewResource: "assets/html/discursante"
})
export class Discursante extends ModWindow{
	itIdDiscurso:TextInput;
	itIdMembro:Select;
	itIdReuniao:Select;
	itTempo:NumericStepper;
	itTema:TextInput;
	itFonte:TextArea;
	itLinkFonte:TextInput;
	mainList:ListView;
	mainTb:ToolBar;
	
	constructor(){
		super("*discursantes da reuniao");		
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"discurso"});
		this.append(this.mainTb);

		this.itIdDiscurso = new TextInput("");
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

		this.itTema = new TextInput("");
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

		this.itLinkFonte = new TextInput("");
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
	beforeUpdate(p_req_obj:IDefaultRequest,p_obj:IDiscurso):IDefaultRequest{
		p_obj.membro.nome = this.itIdMembro.getDescFromServiceByValue(p_obj.idMembro+"");
		return p_req_obj;
	}
	afterInsert(p_obj:IDiscurso):IDiscurso{
		p_obj.membro = <IMembro>{
			nome: this.itIdMembro.getDescFromServiceByValue(p_obj.idMembro + "")
		}
		return p_obj;
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
