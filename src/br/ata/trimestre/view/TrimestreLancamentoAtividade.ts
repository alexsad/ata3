import {ModWindow} from "../../../../lib/underas/container";
import {Select, Button, NumericStepper, TextInput, ListView, ItemView} from "../../../../lib/underas/controller";
import {ToolBar, RequestManager} from "../../../../lib/underas/net";
import {ITrimestreLancamentoAtividade,ITrimestre} from "../model/ITrimestre";
import {Trimestre} from "./Trimestre";

@ItemView("assets/html/trimestrelancamentoatividade.html")
export class TrimestreLancamentoAtividade extends ModWindow {
	itIdPerfilLancamento:TextInput;
	itIdPerfil:Select;
	itIdTrimestre: TextInput;
	itValor:NumericStepper;
	mainTb: ToolBar;
	mainList:ListView;
	constructor() {
		super("*lancamentos");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainTb = new ToolBar({ domain: "trimestrelancamentoatividade" });
		this.append(this.mainTb);
		
		this.itIdPerfilLancamento = new TextInput("");
		this.itIdPerfilLancamento.setColumn("$id");
		this.itIdPerfilLancamento.setLabel("cod.");
		this.itIdPerfilLancamento.setEnable(false);
		this.itIdPerfilLancamento.setSize(3);
		this.append(this.itIdPerfilLancamento);

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

		this.mainList = new ListView("Lancamento");
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
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
}
