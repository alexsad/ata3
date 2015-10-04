import {ITrimestreLancamentoAtividade} from "../model/ITrimestre";
import {ModWindow} from "../../../../lib/container";
import {Select,NumericStepper,InputText,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager} from "../../../../lib/net";

@ItemView({url:"br/ata/organizacao/view/assets/html/organizacaolancamento.html","list":"mainList"})
class TrimestreLancamentoAtividade extends ModWindow {
	itIdOrganizacaoLancamento:InputText;
	itIdOrganizacao:Select;
	itValor:NumericStepper;
	itIdTrimestre:Select;
	mainTb:ToolBar;
	mainList:ListView;
	constructor(){
		super("*lancamento de valores", "br.ata.trimestre.view.TrimestreLancamentoAtividade");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "trimestre/trimestreLancamentoAtividade" });
		this.append(this.mainTb);
		
		this.itIdOrganizacaoLancamento = new InputText("");
		this.itIdOrganizacaoLancamento.setColumn("$_id");
		this.itIdOrganizacaoLancamento.setLabel("cod.");
		this.itIdOrganizacaoLancamento.setEnable(false);
		this.itIdOrganizacaoLancamento.setSize(2);
		this.append(this.itIdOrganizacaoLancamento);

		this.itIdOrganizacao = new Select("id_organizacao");
		this.itIdOrganizacao.setColumn("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao");
		this.itIdOrganizacao.setValueField("_id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setEnable(false);
		this.itIdOrganizacao.setSize(3);
		this.append(this.itIdOrganizacao);

		this.itValor = new NumericStepper(0);
		this.itValor.setColumn("@valor");
		this.itValor.setLabel("valor");
		this.itValor.setSize(3);
		this.append(this.itValor);

		this.itIdTrimestre = new Select("id_trimestre");
		this.itIdTrimestre.setColumn("@idTrimestre");
		this.itIdTrimestre.setLabel("trimestre");
		this.itIdTrimestre.setValueField("_id");
		this.itIdTrimestre.setLabelField("dsTrimestre");
		this.itIdTrimestre.setSize(4);
		this.append(this.itIdTrimestre);

		this.mainList = new ListView("OrganizacaoLancamento");
		//this.setMainList("mainList");		
		this.append(this.mainList);
	}
	onStart():void{
		this.itIdOrganizacao.fromService({
			url:"organizacao/organizacao"
			,module:this
		});
		//this.itIdTrimestre.fromService(".business.BLL.get");
		this.itIdTrimestre.fromService({
			url:"trimestre/trimestre"
			,module:this
		});
		//this.mainTb.activate(true);
	}
	getByIdTrimestre(p_idTrimestre:any):void{
		this.itIdTrimestre.setValue(p_idTrimestre);
		RequestManager.addRequest({
			module:this
			,"url":"organizacao/organizacaolancamento/getbyidtrimestre/"+p_idTrimestre
			//,"data":{"idTrimestre":p_idTrimestre}
			, "onLoad": function(dta: ITrimestreLancamentoAtividade[]) {
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	getByIdOrganizacao(p_idOrganizacao:any):void{
		this.itIdOrganizacao.setValue(p_idOrganizacao);
		RequestManager.addRequest({
			module:this
			,"url":"organizacao/organizacaolancamento/getbyidorganizacao/"+p_idOrganizacao
			//,"data":{"idOrganizacao":p_idOrganizacao}
			, "onLoad": function(dta: ITrimestreLancamentoAtividade[]) {
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
}
