import {ModWindow,WebContainer} from "lib/underas/container";
import {NumericStepper, CheckBox, TextInput, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import {ITrimestre} from "../model/ITrimestre";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import {TrimestreDataLivre} from "./TrimestreDataLivre";

@WebContainer({
	itemViewResource: "assets/html/trimestre"
})
export class Trimestre extends ModWindow{
	itIdTrimestre:TextInput	; 
	itAno:NumericStepper;	 
	itNrTrimestre:NumericStepper;	 
	itSnAberto:CheckBox;	
	mainTb:ToolBar;
	mainList:ListView; 
	_modTrimestreLancamentoAtividade: TrimestreLancamentoAtividade;
	_modTrimestreDataLivre: TrimestreDataLivre;
	constructor(){
		super("trimestres");			
		this.setSize(5);

		this.mainTb = new ToolBar({"domain":"trimestre"});
		this.append(this.mainTb);

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setColumn("$id");
		this.itIdTrimestre.setLabel("cod.");
		this.itIdTrimestre.setEnable(false);	
		this.itIdTrimestre.setSize(2);	
		this.append(this.itIdTrimestre);

		this.itAno = new NumericStepper(2015);
		this.itAno.setColumn("@ano");
		this.itAno.setLabel("ano");
		this.itAno.setStep(1);
		this.itAno.setMin(2014);
		this.itAno.setMax(2050);
		this.itAno.setEnable(false,2);
		this.itAno.setSize(3);	
		this.append(this.itAno);

		this.itNrTrimestre = new NumericStepper(1);
		this.itNrTrimestre.setColumn("@nrTrimestre");
		this.itNrTrimestre.setLabel("trim.");
		this.itNrTrimestre.setStep(1);
		this.itNrTrimestre.setMin(1);
		this.itNrTrimestre.setMax(4);		
		this.itNrTrimestre.setEnable(false,2);
		this.itNrTrimestre.setSize(3);
		this.append(this.itNrTrimestre);

		this.itSnAberto = new CheckBox("Disponivel","Sim");
		this.itSnAberto.setColumn("@snAberto");
		this.itSnAberto.setLabel("disponivel");
		this.itSnAberto.setSize(4);	
		this.append(this.itSnAberto);
		
		this.mainList = new ListView("Trimestre");
		this.append(this.mainList);	
		
		//this.addAssociation({"mod":"OrganizacaoLancamento","url":"js/br/net/atasacramental/organizacao/view/OrganizacaoLancamento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		//this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/evento/view/Evento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		
	}
	onStart():void{
		this._modTrimestreDataLivre = new TrimestreDataLivre();
		this.getModView().append(this._modTrimestreDataLivre);

		this._modTrimestreLancamentoAtividade = new TrimestreLancamentoAtividade();
		this.getModView().append(this._modTrimestreLancamentoAtividade);

		this.mainTb.reloadItens();


	}
	/*
	beforeUpdate(p_req:IDefaultRequest, p_old_obj:ITrimestre):IDefaultRequest{
		//var tmpTrimS: ITrimestre = <ITrimestre>this.mainList.getSelectedItem();
		if (p_old_obj.datasLivres) {
			console.log(p_req);
			p_req.data.datasLivres = p_old_obj.datasLivres;

		};
		return p_req;
	}
	*/
	onChangeItem(p_obj:ITrimestre):ITrimestre{
		/*
		if(p_obj.trimestreLancamentoAtividade){
			this._modTrimestreLancamentoAtividade.mainList.setDataProvider(p_obj.trimestreLancamentoAtividade);
		}else{
			this._modTrimestreLancamentoAtividade.mainList.setDataProvider([]);
		};		
		this._modTrimestreDataLivre.getDatasLivres();	
		*/
		this._modTrimestreDataLivre.getByIdTrimestre(p_obj.id);
		this._modTrimestreLancamentoAtividade.getByIdTrimestre(p_obj.id);	
		return p_obj;
	}
}