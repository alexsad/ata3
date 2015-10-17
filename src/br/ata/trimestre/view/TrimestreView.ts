import {ModWindow} from "../../../../lib/container";
import {AlertMsg, ListView, ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";
import {PerfilBox} from "../../perfil/view/PerfilBox";
import {Evento} from "./Evento";
import {ITrimestre, ITrimestreDataLivre} from "../model/ITrimestre";

declare var perfilBoxContainer: PerfilBox;

@ItemView("assets/html/trimestreview.html")
export class TrimestreView extends ModWindow{
	amOrcamentoAtual: AlertMsg;
	mainList: ListView;
	_modEvento: Evento;
	constructor(){
		super("trimestres");
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
		this._modEvento = new Evento();
		this.getModView().append(this._modEvento);
	}
	onChangeItem(p_item: ITrimestre): ITrimestre {		
		//js.underas.core.Underas.loadModule({"mod":"br.net.atasacramental.atividade.view.Evento","act":"getByIdTrimestre","p":[p_item.idTrimestre],"puid":this.getVarModule()});
		//this.getOrcamentoByTrimestre(p_item);	

		this._modEvento.mainList.setDataProvider(p_item.atividades);
		this._modEvento.setDatasDisponiveis(p_item.datasLivres);
		this._modEvento.itOrcamento.setMax(p_item.vtSaldo);
		this._modEvento.itIdTrimestre.setValue(p_item._id);
		return p_item;		
	}	
	getTrimestres():void{
		RequestManager.addRequest({
			"url": "trimestre/getDisponiveisByIdPerfil/" + perfilBoxContainer.getIdPerfil()
			,"onLoad":function(dta:ITrimestre[]){
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		}); 
	}
	getOrcamentoByTrimestre(p_item:ITrimestre){        
        RequestManager.addRequest({
                "url" : "organizacao.business.OrganizacaoLancamentoBLL.getDadosOrcamento"
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