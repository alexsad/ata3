import {ModWindow} from "../../../../lib/container";
import {NumericStepper,CheckBox,InputText, ListView, ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";
import {ITrimestre} from "../model/ITrimestre";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";


@ItemView({ url: "js/br/ata/trimestre/view/assets/html/trimestreview.html", "list": "mainList" })
export class Trimestre extends ModWindow{
	itIdTrimestre:InputText	; 
	itAno:NumericStepper;	 
	itNrTrimestre:NumericStepper;	 
	itSnAberto:CheckBox;	
	mainTb:ToolBar;
	mainList:ListView; 
	_modTrimestreLancamentoAtividade: TrimestreLancamentoAtividade;
	constructor(){
		super("trimestres","br.ata.trimestre.view.Trimestre");
		this.setRevision("$Revision: 138 $");	
		this.setSize(5);

		this.mainTb = new ToolBar({"domain":"trimestre"});
		this.append(this.mainTb);

		this.itIdTrimestre = new InputText("");
		this.itIdTrimestre.setColumn("$_id");
		this.itIdTrimestre.setLabel("cod.");
		this.itIdTrimestre.setEnable(false);	
		this.itIdTrimestre.setSize(3);	
		this.append(this.itIdTrimestre);

		this.itAno = new NumericStepper(2015);
		this.itAno.setColumn("@ano");
		this.itAno.setLabel("ano");
		this.itAno.setStep(1);
		this.itAno.setMin(2014);
		this.itAno.setMax(2050);
		this.itAno.setEnable(false,2);
		this.itAno.setSize(5);	
		this.append(this.itAno);

		this.itNrTrimestre = new NumericStepper(1);
		this.itNrTrimestre.setColumn("@nrTrimestre");
		this.itNrTrimestre.setLabel("trim.");
		this.itNrTrimestre.setStep(1);
		this.itNrTrimestre.setMin(1);
		this.itNrTrimestre.setMax(4);		
		this.itNrTrimestre.setEnable(false,2);
		this.itNrTrimestre.setSize(4);
		this.append(this.itNrTrimestre);

		this.itSnAberto = new CheckBox("Disponivel","Sim");
		this.itSnAberto.setColumn("@snAberto");
		this.itSnAberto.setLabel("disponivel");
		this.itSnAberto.setSize(12);	
		this.append(this.itSnAberto);
		
		this.mainList = new ListView("Trimestre");
		this.append(this.mainList);	
		
		//this.addAssociation({"mod":"OrganizacaoLancamento","url":"js/br/net/atasacramental/organizacao/view/OrganizacaoLancamento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		//this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/evento/view/Evento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		
	}
	onStart():void{
		this._modTrimestreLancamentoAtividade = new TrimestreLancamentoAtividade(this);
		this.getModView().append(this._modTrimestreLancamentoAtividade);
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj:ITrimestre):ITrimestre{
		if(p_obj.trimestreLancamentoAtividade){
			this._modTrimestreLancamentoAtividade.mainList.setDataProvider(p_obj.trimestreLancamentoAtividade);
		}else{
			this._modTrimestreLancamentoAtividade.mainList.setDataProvider([]);
		};
		return p_obj;
	}
}