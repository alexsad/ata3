import {Form,ToolBar} from "lib/underas/container";
import {Select} from "lib/underas/input";
import {Button} from "lib/underas/button";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http, IRequestConfig} from "lib/underas/http";
import {ITrimestre, ITremestreQuery} from "../model/ITrimestre";
import {jsPDF} from "lib/jspdf/jsPDF";
import {IReportTemplate, IReportTemplateItem} from "lib/jspdf/ijspdf";

export class AtividadePorPeriodo extends Form{
	mainTb:ToolBar;
	mainList: TileList<ITrimestre>;
	btPesquisar: Button;
	btLimpar: Button;
	btPrintAta: Button;
	itTrimestreI: Select;
	itTrimestreF: Select;

	constructor(){
	    super();
		this.setSize(12);		
		
		this.mainTb = new ToolBar();
		this.append(this.mainTb);
		
	    this.btPesquisar = new Button("Pesquisar");
	    this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
		this.btPesquisar.setIcon("glyphicon glyphicon-search");
		this.mainTb.append(this.btPesquisar);
	    
	    this.btLimpar = new Button("Limpar");
		this.btLimpar.setIcon("glyphicon glyphicon-remove");
	    this.btLimpar.addEvent('click',function(){
			this.itTrimestreI.setValue("");
			this.itTrimestreF.setValue("");
	    }.bind(this));
		this.mainTb.append(this.btLimpar);	    
		
		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		this.btPrintAta.setEnable(false);
		this.mainTb.append(this.btPrintAta);
	    
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

		this.mainList = new TileList<ITrimestre>("Evento");	    
		this.mainList.setItemViewResource("trimestre/view/assets/html/atividadetrimestreporperiodo");
	    this.append(this.mainList);
	}
	onStart():void{
		this.itTrimestreI.fromService({url:"trimestre"});
		this.itTrimestreF.fromService({ url: "trimestre" });
	}
	pesquisar():void{
		var tmpPara:ITremestreQuery = {
			idInicio:this.itTrimestreI.getValue()
			,idFim:this.itTrimestreF.getValue()
		};
	    $http
			.get("trimestre/getaprovadaseliberadasbyperiodo")
			.params(tmpPara)
			.done((dta: ITrimestre[]) => this.mainList.setDataProvider(dta));
	}
	printAta():void{        
		//Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/calendario_sintetico.json');
	}
}