import {IDiscurso} from "../model/IReuniao";
import {Reuniao} from "./Reuniao";
import {ModWindow} from "../../../../lib/container";
import {Select,InputText,TextArea,NumericStepper,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "../../../../lib/net";

@ItemView("assets/html/discursante.html")
export class Discursante extends ModWindow{
	itIdDiscurso:InputText;
	itIdMembro:Select;
	itTempo:NumericStepper;
	itTema:InputText;
	itFonte:TextArea;
	itLinkFonte:InputText;
	mainList:ListView;
	mainTb:ToolBar;
	_idReuniao:string;
	constructor(){
		super("*discursantes da reuniao");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"reuniao/discurso"});
		this.append(this.mainTb);

		this.itIdDiscurso = new InputText("");
		this.itIdDiscurso.setColumn("$_id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);
		this.itIdDiscurso.setSize(2);
		this.append(this.itIdDiscurso);

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setColumn("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("_id");
		this.itIdMembro.setLabelField("nmMembro");
		this.itIdMembro.setSize(7);
		this.append(this.itIdMembro);

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
			url:"usuario/getbysnativos/S"
			,module:this
		});
		//this.itIdReuniao.fromService("reuniao/reuniao");
	}
	beforeInsert(p_req_obj: IDefaultRequest):IDefaultRequest{
		p_req_obj.url = "reuniao/discurso/"+ this._idReuniao;
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IDiscurso): IDefaultRequest{
		p_req_new_obj.url ="reuniao/discurso/"+ this._idReuniao;
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IDiscurso): IDefaultRequest{
		p_req_delete.url = "reuniao/discurso/"+ this._idReuniao + "," + p_old_obj._id;
		return p_req_delete;
	}
}
