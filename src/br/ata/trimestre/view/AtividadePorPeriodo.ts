import {ModWindow} from "lib/underas/container";
import {Button, DatePartType, Select, ListView, ItemView} from "lib/underas/controller";
import {SimpleToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import {ITrimestre, ITremestreQuery} from "../model/ITrimestre";

@ItemView("assets/html/atividadetrimestreporperiodo.html")
export class AtividadePorPeriodo extends ModWindow{

	mainTb: SimpleToolBar;
	mainList: ListView;
	btPesquisar: Button;
	btLimpar: Button;
	btPrintAta: Button;
	itTrimestreI: Select;
	itTrimestreF: Select;

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
			this.itTrimestreI.setValue("");
			this.itTrimestreF.setValue("");
	    }.bind(this));
		this.mainTb.addButton(this.btLimpar);
	    
		
		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		//this.btPrintAta.setEnable(false);
		this.mainTb.addButton(this.btPrintAta);
	    
		this.itTrimestreI = new Select("escolha um trimestre");
		this.itTrimestreI.setLabel("trimestre inicio:");
		this.itTrimestreI.setSize(6);
		this.itTrimestreI.setValueField("id");
		this.itTrimestreI.setLabelField("dsTrimestre");
		this.append(this.itTrimestreI);

		this.itTrimestreF = new Select("escolha um trimestre");
		this.itTrimestreF.setLabel("trimestre fim:");
	    //this.itDtaF.addDate(DatePartType.month,3);
		this.itTrimestreF.setSize(6);	
		this.itTrimestreF.setValueField("id");
		this.itTrimestreF.setLabelField("dsTrimestre");
		this.append(this.itTrimestreF);

		this.mainList = new ListView("Evento");	    
	    this.append(this.mainList);
	}
	onStart():void{
		this.itTrimestreI.fromService({url:"trimestre"});
		this.itTrimestreF.fromService({ url: "trimestre" });
	}
	pesquisar():void{

		//this.itDtaF.refresh();
		//this.itDtaI.refresh();

		//this.itDtaF.setValue(this.itDtaF.getValue());

		//this.itDtaI.setValue(this.itDtaI.getValue());

		var tmpPara:ITremestreQuery = {
			idInicio:this.itTrimestreI.getValue()
			,idFim:this.itTrimestreF.getValue()
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