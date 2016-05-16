import {Select, NumericStepper, TextInput} from "lib/underas/input";
import {$http} from "lib/underas/http";
import {CRUDForm} from "../../form/view/CRUDForm";
import {ITrimestreLancamentoAtividade,ITrimestre} from "../model/ITrimestre";

export class TrimestreLancamentoAtividade extends CRUDForm <ITrimestreLancamentoAtividade>{
	itId:TextInput;
	itIdPerfil:Select;
	itIdTrimestre: TextInput;
	itValor:NumericStepper;
	constructor() {
		super({"domain": "trimestrelancamentoatividade" });		
		this.setSize(12);

		this.buildToolBar();
		
		this.itId = new TextInput("");
		this.itId.setName("$id");
		this.itId.setLabel("cod.");
		this.itId.setEnable(false);
		this.itId.setSize(3);
		this.append(this.itId);

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setName("!idTrimestre");
		this.itIdTrimestre.setLabel("trim.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(3);
		this.append(this.itIdTrimestre);

		this.itValor = new NumericStepper(0);
		this.itValor.setName("@valor");
		this.itValor.setLabel("valor");
		this.itValor.setSize(6);
		this.append(this.itValor);

		this.itIdPerfil = new Select("perfil");
		this.itIdPerfil.setName("@idPerfil");
		this.itIdPerfil.setLabel("perfil");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(12);
		this.append(this.itIdPerfil);

		this.buildTileList({ itemViewResource: "trimestre/view/assets/html/trimestrelancamentoatividade" });
	}
	onStart():void{
		this.itIdPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
	}
	getByIdTrimestre(p_idTrimestre:number):void{
		this.itIdTrimestre.setValue(p_idTrimestre + "");
		$http
			.get("trimestrelancamentoatividade/getbyidtrimestre/" + p_idTrimestre)
			.done((dta: ITrimestreLancamentoAtividade[]) => this.mainList.setDataProvider(dta));
	}
}
