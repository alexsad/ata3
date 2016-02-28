import {ModWindow,WebContainer} from "lib/underas/container";
import {AlertMsg} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import PerfilBox = require("../../perfil/view/PerfilBox");
import {Atividade} from "./Atividade";
import {ITrimestre} from "../model/ITrimestre";

@WebContainer({
	itemViewResource: "trimestre/view/assets/html/trimestreview"
})
export class TrimestreView extends ModWindow{
	amOrcamentoAtual: AlertMsg;
	mainList: ListView<ITrimestre>;
	_modAtividade: Atividade;
	constructor(){
		super("trimestres");		
		this.setSize(4);

		this.amOrcamentoAtual = new AlertMsg("Clique no trimestre para ver o orcamento...");
		this.amOrcamentoAtual.show(true);
		this.amOrcamentoAtual.setType(AlertMsg.TP_INFO);
		this.amOrcamentoAtual.setSize(12);
		this.append(this.amOrcamentoAtual);

		this.mainList = new ListView<ITrimestre>("Trimestre");
		this.append(this.mainList);
		//this.addAssociation({"mod":"Atividade","url":"js/br/net/atasacramental/evento/view/Atividade.js","act":"getByIdTrimestre","puid":this.getVarModule()});
	}
	onStart():void{
		//this.mainTb.reloadItens();
		/*

		if(!this.getMainList().itemChange){
			this.getMainList()["itemChange"] = function(p_item){
				js.underas.core.Underas.loadModule({"mod":"Atividade","url":"js/br/net/atasacramental/atividade/view/Atividade.js","act":"getByIdTrimestre","p":[p_item.idTrimestre],"puid":this.getVarModule()});

			}.bind(this);
		}
		*/

		this._modAtividade = new Atividade(this);
		this.getModView().append(this._modAtividade);

		this.getTrimestres();
	}
	onChangeItem(p_item: ITrimestre): ITrimestre {
		//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.atividade.view.Atividade","act":"getByIdTrimestre","p":[p_item.idTrimestre],"puid":this.getVarModule()});
		//this.getOrcamentoByTrimestre(p_item);
		//console.log(p_item.atividades);
		//this._modAtividade.mainList.setDataProvider(p_item.atividades);
		//this._modAtividade.setDatasDisponiveis(p_item.datasLivres);
		//this._modAtividade.itIdTrimestre.setValue(p_item._id);
		this._modAtividade.getByIdTrimestreIdPerfil(p_item.id, PerfilBox.getIdPerfil());
		return p_item;
	}
	getSaldo():number{
		var tmpItemTrimestre:ITrimestre = <ITrimestre>this.mainList.getSelectedItem();
		return parseInt(tmpItemTrimestre.vtSaldo+"");
	}
	setSaldo(p_saldonovo:number):void{
		var tmpItemTrimestre: ITrimestre = <ITrimestre>this.mainList.getSelectedItem();
		tmpItemTrimestre.vtSaldo = p_saldonovo;
	}
	getTrimestres():void{
		RequestManager.addRequest({
			"url": "trimestre/getbyidperfil/" + PerfilBox.getIdPerfil()
			,"onLoad":function(dta:ITrimestre[]){
				(<TrimestreView>this).mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	getOrcamentoByTrimestre(p_item:ITrimestre){
        RequestManager.addRequest({
                "url" : "organizacao.business.OrganizacaoLancamentoBLL.getDadosOrcamento"
                ,"data":{
 					"idTrimestre": p_item.id
					,"idOrganizacao": "login.idOrganizacao"
                }
                ,"onLoad" : function(dta:ITrimestre[]):void{
                        if(dta){
                        	//trimestreview.setSaldo(dta.saldo);
                        	//trimestreview.amOrcamentoAtual.setText("Soli. "+dta.rs.orcamentoSolicitado+" - Apro. "+dta.rs.orcamentoAprovado+" r$ , Libe.: "+dta.rs.orcamentoUtilizado+" r$ , Disp. "+dta.rs.orcamentoDisponibilizado+" r$ , Saldo "+dta.rs.saldo+" r$");
                        }else{
                        	//trimestreview.amOrcamentoAtual.setText("Sem Informacoes de Orcamento...");
                        }
                }.bind(this)
        });
	}
}
