import {ModWindow} from "../../../../lib/underas/container";
import {Button,DatePartType, DatePicker, ListView, ItemView} from "../../../../lib/underas/controller";
import {SimpleToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {ITrimestre, ITremestreQuery} from "../model/ITrimestre";

@ItemView("assets/html/atividadetrimestreporperiodo.html")
export class AtividadePorPeriodo extends ModWindow{

	mainTb: SimpleToolBar;
	mainList: ListView;
	btPesquisar: Button;
	btLimpar: Button;
	btPrintAta: Button;
	itDtaI: DatePicker;
	itDtaF: DatePicker;

	constructor(){
	    super("Calendario da Ala");
		this.setRevision("$Revision: 138 $");
		
		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);
		
	    this.btPesquisar = new Button("Pesquisar");
	    this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
	    this.btPesquisar.setIcon("search");
		this.mainTb.addButton(this.btPesquisar);
	    
	    this.btLimpar = new Button("Limpar");
		this.btLimpar.setIcon("remove");
	    this.btLimpar.addEvent('click',function(){
	    	this.itDtaI.setValue("");
	    	this.itDtaF.setValue("");
	    }.bind(this));
		this.mainTb.addButton(this.btLimpar);
	    
		
		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		//this.btPrintAta.setEnable(false);
		this.mainTb.addButton(this.btPrintAta);
	    
	    this.itDtaI = new DatePicker();
	    this.itDtaI.setLabel("inicio:");
		this.itDtaI.setSize(6);
		this.append(this.itDtaI);

	    this.itDtaF = new DatePicker();
	    this.itDtaF.setLabel("fim:");
	    this.itDtaF.addDate(DatePartType.month,3);
		this.itDtaF.setSize(6);	
		this.append(this.itDtaF);

		this.mainList = new ListView("Evento");	    
	    this.append(this.mainList);
	}
	pesquisar():void{

		//this.itDtaF.refresh();
		//this.itDtaI.refresh();

		this.itDtaF.setValue(this.itDtaF.getValue());

		this.itDtaI.setValue(this.itDtaI.getValue());

		var tmpPara:ITremestreQuery = {
			nrTrimestreInicio:parseInt(((this.itDtaI.getDate().getMonth()+3)/3)+"")
			,anoInicio:this.itDtaI.getDate().getFullYear()
			,nrTrimestreFim: parseInt(((this.itDtaF.getDate().getMonth()+3)/3)+"")
			,anoFim:this.itDtaF.getDate().getFullYear()
		};

	    RequestManager.addRequest({	    
	     	"url":"trimestre/getaprovadaseliberadasbyperiodo"
			,"data": tmpPara
	    	,"onLoad":function(dta:ITrimestre[]){    	
				this.getMainList().setDataProvider(dta);
	    	}.bind(this)
		});
	}
	printAta():void{
		//Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/calendario_sintetico.json');
	}
}