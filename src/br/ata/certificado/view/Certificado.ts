import {ICertificado} from "../model/ICertificado";
import {ModWindow} from "lib/underas/container";
import {ItemView,TextInput,DatePicker,ListView} from "lib/underas/controller";
import {ToolBar, RequestManager} from "lib/underas/net";


@ItemView("assets/html/certificado.html")
export class Certificado extends ModWindow{
	itIdCertificado:TextInput;
	itValidade:DatePicker;
	itPin:TextInput;
	mainTb:ToolBar;
	mainList:ListView;
	constructor(){
		super("Certificado");
		this.setRevision("$Revision: 2 $");

		this.mainTb = new ToolBar({"domain":"certificado"});
		this.append(this.mainTb);

		this.itIdCertificado = new TextInput("");
		this.itIdCertificado.setColumn("$id");
		this.itIdCertificado.setLabel("cod.");
		this.itIdCertificado.setEnable(false);
		this.itIdCertificado.setSize(2);
		this.append(this.itIdCertificado);

		this.itPin = new TextInput("");
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
