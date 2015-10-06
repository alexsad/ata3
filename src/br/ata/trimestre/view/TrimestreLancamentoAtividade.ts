import {ModWindow} from "../../../../lib/container";
import {Select, Button, NumericStepper, InputText, ListView, ItemView} from "../../../../lib/controller";
import {SimpleToolBar,RequestManager} from "../../../../lib/net";
import {ITrimestreLancamentoAtividade,ITrimestre} from "../model/ITrimestre";
import {Trimestre} from "./Trimestre";

@ItemView({ url: "js/br/ata/trimestre/view/assets/html/trimestrelancamentoatividade.html", "list": "mainList" })
export class TrimestreLancamentoAtividade extends ModWindow {
	itIdPerfilLancamento:InputText;
	itIdPerfil:Select;
	itValor:NumericStepper;
	mainTb: SimpleToolBar;
	mainList:ListView;
	btAdd: Button;
	btDel: Button;
	btSave: Button;
	_modTrimestre: Trimestre;
	constructor(p_modTrimestre: Trimestre) {
		super("*lancamentos", "br.ata.trimestre.view.TrimestreLancamentoAtividade");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);
		
		this.itIdPerfilLancamento = new InputText("");
		this.itIdPerfilLancamento.setColumn("$_id");
		this.itIdPerfilLancamento.setLabel("cod.");
		this.itIdPerfilLancamento.setEnable(false);
		this.itIdPerfilLancamento.setSize(3);
		this.append(this.itIdPerfilLancamento);

		this.itIdPerfil = new Select("perfil");
		this.itIdPerfil.setColumn("@idPerfil");
		this.itIdPerfil.setLabel("perfil");
		this.itIdPerfil.setValueField("_id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(5);
		this.append(this.itIdPerfil);

		this.itValor = new NumericStepper(0);
		this.itValor.setColumn("@valor");
		this.itValor.setLabel("valor");
		this.itValor.setSize(4);
		this.append(this.itValor);

		this.mainList = new ListView("OrganizacaoLancamento");
		//this.setMainList("mainList");		
		this.append(this.mainList);
		

		this.btAdd = new Button("Novo");
		this.btAdd.addEvent("click", this.addLancamento.bind(this));
		this.btAdd.setIcon("plus");
		this.mainTb.addButton(this.btAdd);

		this.btSave = new Button("Salvar");
		this.btSave.addEvent("click", this.salvarLancamento.bind(this));
		this.btSave.setIcon("ok");
		this.mainTb.addButton(this.btSave);

		this.btDel = new Button("Excluir");
		this.btDel.addEvent("click", this.delLancamento.bind(this));
		this.btDel.getEle().removeClass("btn-default").addClass("btn-warning");
		this.btDel.setIcon("minus");
		this.mainTb.addButton(this.btDel);

		this._modTrimestre = p_modTrimestre;

	}
	onStart():void{
		this.itIdPerfil.fromService({
			"url": "perfil/perfilsimples"
			, "module": this
		});

	}
	onChangeItem(p_obj: ITrimestreLancamentoAtividade): ITrimestreLancamentoAtividade {
		this.itIdPerfilLancamento.setValue(p_obj._id);
		this.itIdPerfil.setValue(p_obj.idPerfil);
		this.itValor.setValue(p_obj.valor+"");
		return p_obj;
	}
	salvarAlteracoes(): void {
		var tmpTrimestreLancamentoSelecionado: ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
		RequestManager.addRequest({
			"module": this
			, "url": "trimestre"
			, "method": "put"
			, "data": tmpTrimestreLancamentoSelecionado
			, "onLoad": function(resposta: boolean): void {
				//this.getMainList().setDataProvider(dta);
				if (resposta) {
					//this.getPerfis();
					if (this.itIdPerfilLancamento.getValue()=="") {
						this._modTrimestre.mainTb.reloadItens();
					};					
				};
			}.bind(this)
		});
	}
	salvarLancamento(event: Event): void {
		event.preventDefault();		
		if (!this.itValor.getValue()){
			this.itValor.setValid(false);
		} else if (!this.itIdPerfil.getValue()) { 
			this.itIdPerfil.setValid(false);
		} else {
			var tmpTrimestreLancamentoSelecionado: ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
			if (!tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade) {
				tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade = [];
			};
			var tmpLancamento: ITrimestreLancamentoAtividade = <ITrimestreLancamentoAtividade>this.getFormItem();
			if(tmpLancamento._id==""){
				delete tmpLancamento._id;
				tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade.push(tmpLancamento);
			}else{
				var tmpIndex: number = this.mainList.getSelectedIndex();
				tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade[tmpIndex]=tmpLancamento;
			};			
			this.salvarAlteracoes();
		};
	}
	addLancamento(event: Event): void {
		event.preventDefault();
		this.clearFormItem();
	}
	delLancamento(event: Event): void {
		event.preventDefault();
		var tmpTrimestreLancamentoSelecionado: ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
		if (tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade) {
			var tmpIndex: number = this.mainList.getSelectedIndex();
			tmpTrimestreLancamentoSelecionado.trimestreLancamentoAtividade.splice(tmpIndex, 1);
			this.salvarAlteracoes();
		};
	}
}
