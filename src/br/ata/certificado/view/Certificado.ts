import {TextInput,DatePickerInput} from "lib/underas/input";
import {EViewSize} from "lib/underas/component";
import {CRUDForm} from "../../form/view/CRUDForm";
import {ICertificado} from "../model/ICertificado";

export class Certificado extends CRUDForm<ICertificado>{
	itIdCertificado:TextInput;
	itValidade: DatePickerInput;
	itPin:TextInput;
	constructor(){
		super({
			"domain": "certificado"
		});	
		this.buildToolBar();
		
		this.itIdCertificado = new TextInput("");
		this.itIdCertificado.setName("$id");
		this.itIdCertificado.setLabel("cod.");
		this.itIdCertificado.setEnable(false);
		this.itIdCertificado.setSize(2);
		this.itIdCertificado.setSize(3,EViewSize.EXTRA_SMALL);
		this.append(this.itIdCertificado);

		this.itPin = new TextInput("");
		this.itPin.setName("@pin");
		this.itPin.setLabel("pin");
		this.itPin.setSize(8);
		this.itPin.setSize(6, EViewSize.EXTRA_SMALL);
		this.append(this.itPin);

		this.itValidade = new DatePickerInput();
		this.itValidade.setName("@validade");
		this.itValidade.setLabel("validade");
		this.itValidade.setSize(2);
		this.itValidade.setSize(3, EViewSize.EXTRA_SMALL);
		this.append(this.itValidade);

		this.buildTileList({ itemViewResource: "certificado/view/assets/html/certificado" });
	}
	onStart():void{		
		this.addEvent(CRUDForm.EVENT_BEFORE_SAVE, (evt: Event, p_cert: ICertificado) => {
			//console.log(p_cert.pin);
			p_cert.pin = p_cert.pin + " alterado por mim";
			if (p_cert.pin.indexOf("2007") > 0) {
				evt.preventDefault();
			}
		});
		this.reloadItens();
	}
}
