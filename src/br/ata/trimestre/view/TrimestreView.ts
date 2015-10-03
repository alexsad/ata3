import {ITrimestre} from "../model/ITrimestre";
import {ModWindow} from "../../../../lib/container";
import {AlertMsg, ListView, ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";


@ItemView({ url: "js/br/ata/trimestre/view/assets/html/trimestreview.html", "list": "mainList" })
export class TrimestreView extends ModWindow{
	amOrcamentoAtual: AlertMsg;
	mainList: ListView;
	_saldo:number;
	constructor(){
		super("trimestres","br.ata.trimestre.view.TrimestreView");
		this.setRevision("$Revision: 63 $");	
		this.setSize(4);	
		
		this.amOrcamentoAtual = new AlertMsg("Clique no trimestre para ver o orcamento...");
		this.amOrcamentoAtual.show(true);
		this.amOrcamentoAtual.setType(AlertMsg.TP_INFO);
		this.amOrcamentoAtual.setSize(12);
		this.append(this.amOrcamentoAtual);
		
		this.mainList = new ListView("Trimestre");
		this.append(this.mainList);				
		//this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/evento/view/Evento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
	}
	onStart():void{
		//this.mainTb.reloadItens();		
		/*
		
		if(!this.getMainList().itemChange){
			this.getMainList()["itemChange"] = function(p_item){
				js.underas.core.Underas.loadModule({"mod":"Evento","url":"js/br/net/atasacramental/atividade/view/Evento.js","act":"getByIdTrimestre","p":[p_item.idTrimestre],"puid":this.getVarModule()});					
				
			}.bind(this);		
		}
		*/
		this.getTrimestres();
	}
	getSaldo():number{
		return this._saldo;
	}
	setSaldo(p_saldo:number):void{
		this._saldo=p_saldo;
	}
	onChangeItem(p_item: ITrimestre): ITrimestre {		
		//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.atividade.view.Evento","act":"getByIdTrimestre","p":[p_item.idTrimestre],"puid":this.getVarModule()});
		this.getOrcamentoByTrimestre(p_item);	
		return p_item;		
	}	
	getTrimestres():void{
		RequestManager.addRequest({
			"module":this
			,"url":"trimestre/getDisponiveis"
			,"onLoad":function(dta:ITrimestre[]){
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		}); 
	}
	getOrcamentoByTrimestre(p_item:ITrimestre){        
        RequestManager.addRequest({
        		"module":this
                ,"url" : "organizacao.business.OrganizacaoLancamentoBLL.getDadosOrcamento"
                ,"data":{
 					"idTrimestre": p_item._id
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