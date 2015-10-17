import {ICertificado} from "../model/ICertificado";
import {ModWindow} from "../../../../lib/container";
import {ItemView,InputText,DatePicker,ListView} from "../../../../lib/controller";
import {ToolBar,RequestManager} from "../../../../lib/net";


@ItemView("assets/html/certificado.html")
export class Certificado extends ModWindow{
	itIdCertificado:InputText;
	itValidade:DatePicker;
	itPin:InputText;
	mainTb:ToolBar;
	mainList:ListView;
	constructor(){
		super("Certificado");
		this.setRevision("$Revision: 2 $");

		this.mainTb = new ToolBar({"domain":"certificado"});
		this.append(this.mainTb);

		this.itIdCertificado = new InputText("");
		this.itIdCertificado.setColumn("$_id");
		this.itIdCertificado.setLabel("cod.");
		this.itIdCertificado.setEnable(false);
		this.itIdCertificado.setSize(2);
		this.append(this.itIdCertificado);

		this.itPin = new InputText("");
		this.itPin.setColumn("@pin");
		this.itPin.setLabel("pin");
		this.itPin.setSize(8);
		this.append(this.itPin);

		this.itValidade = new DatePicker();
		this.itValidade.setColumn("@validade");
		this.itValidade.setLabel("validade");
		this.itValidade.setSize(2);
		this.append(this.itValidade);

		this.mainList = new ListView("Certificado");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart():void{
		this.mainTb.reloadItens();
	}
}
