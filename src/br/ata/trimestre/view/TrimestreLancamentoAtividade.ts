import {ModWindow,WebContainer} from "lib/underas/container";
import {Select, Button, NumericStepper, TextInput, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager} from "lib/underas/net";
import {ITrimestreLancamentoAtividade,ITrimestre} from "../model/ITrimestre";

@WebContainer({
	itemViewResource: "trimestre/view/assets/html/trimestrelancamentoatividade"
})
export class TrimestreLancamentoAtividade extends ModWindow {
	itId:TextInput;
	itIdPerfil:Select;
	itIdTrimestre: TextInput;
	itValor:NumericStepper;
	mainTb: ToolBar;
	mainList:ListView<ITrimestreLancamentoAtividade>;
	constructor() {
		super("*lancamentos");		
		this.setSize(4);

		this.mainTb = new ToolBar({ domain: "trimestrelancamentoatividade" });
		this.append(this.mainTb);
		
		this.itId = new TextInput("");
		this.itId.setColumn("$id");
		this.itId.setLabel("cod.");
		this.itId.setEnable(false);
		this.itId.setSize(3);
		this.append(this.itId);

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setColumn("!idTrimestre");
		this.itIdTrimestre.setLabel("trim.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(3);
		this.append(this.itIdTrimestre);

		this.itValor = new NumericStepper(0);
		this.itValor.setColumn("@valor");
		this.itValor.setLabel("valor");
		this.itValor.setSize(6);
		this.append(this.itValor);

		this.itIdPerfil = new Select("perfil");
		this.itIdPerfil.setColumn("@idPerfil");
		this.itIdPerfil.setLabel("perfil");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(12);
		this.append(this.itIdPerfil);

		this.mainList = new ListView<ITrimestreLancamentoAtividade>("Lancamento");
		//this.setMainList("mainList");		
		this.append(this.mainList);

	}
	onStart():void{
		this.itIdPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
	}
	getByIdTrimestre(p_idTrimestre:number):void{
		this.itIdTrimestre.setValue(p_idTrimestre + "");
		RequestManager.addRequest({
			url: "trimestrelancamentoatividade/getbyidtrimestre/" + p_idTrimestre
			,onLoad:function(dta:ITrimestreLancamentoAtividade[]){
				(<TrimestreLancamentoAtividade>this).mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
}
