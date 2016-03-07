import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput,DatePicker} from "lib/underas/controller";
import {ToolBar} from "lib/underas/net";
import {ListView} from "lib/underas/listview";
import {ICertificado} from "../model/ICertificado";

@WebContainer({
	itemViewResource: "certificado/view/assets/html/certificado"
})
export class Certificado extends ModWindow{
	itIdCertificado:TextInput;
	itValidade:DatePicker;
	itPin:TextInput;
	mainTb:ToolBar;
	mainList:ListView<ICertificado>;
	constructor(){
		super("Certificado 2");		

		this.mainTb = new ToolBar({"domain":"certificado"});
		this.append(this.mainTb);
		this.showTitle(false);

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

		this.mainList = new ListView<ICertificado>("Certificado");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart():void{
		this.mainTb.reloadItens();
	}
}
