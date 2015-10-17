import {IReuniao,IDiscurso} from "../model/IReuniao";
import {ModWindow} from "../../../../lib/container";
import {Button,InputText,Select,TextArea,NumericStepper,DatePicker,DatePartType,ListView,ItemView} from "../../../../lib/controller";
import {SimpleToolBar,RequestManager,IDefaultRequest} from "../../../../lib/net";
import {Discursante} from "./Discursante";
import {FastMembro} from "../../usuario/view/FastMembro";
import {Droppable} from "../../../../lib/jqueryui";

@ItemView("assets/html/reuniaoporperiodo.html")
export class ReuniaoPorPeriodo extends ModWindow{
	itIdDiscurso:InputText;	 
	itIdMembro:Select;	 
	itTempo:NumericStepper;	 
	itTema:InputText;	 
	itFonte:TextArea;	 
	itLinkFonte:InputText;	 
	itDtaF:DatePicker;
	itDtaI:DatePicker;
	btPesquisar:Button;
	btPrintSintetico:Button;
	btPrintConvites:Button;
	mainTb:SimpleToolBar;
	mainList:ListView;
	_modMembros:FastMembro;
	constructor(){
		super("*discursantes da reuniao");
		this.setRevision("$Revision: 138 $");		
		this.setSize(8);

		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);

		this.btPesquisar = new Button("Pesquisar");
		this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
		this.btPesquisar.setIcon("search");
		//this.btPesquisar.setEnable(false);		
		this.mainTb.addButton(this.btPesquisar);

		this.btPrintSintetico = new Button("Discursos");
		this.btPrintSintetico.setIcon("print");
		this.btPrintSintetico.addEvent('click',this.printSintetico.bind(this));
		this.mainTb.addButton(this.btPrintSintetico);

		this.btPrintConvites = new Button("Convites");
		this.btPrintConvites.setIcon("envelope");
		this.btPrintConvites.addEvent('click',this.printConvites.bind(this));		
		this.mainTb.addButton(this.btPrintConvites);
		
	    
	    


		this.itDtaI = new DatePicker();
	    this.itDtaI.setLabel("inicio:");
	    //this.itDtaI.show(false);
	    this.itDtaI.setSize(6);
	    //this.itDtaI.setDate(DatePartType.year,2010);	
	    this.append(this.itDtaI);

	    this.itDtaF = new DatePicker();
	    this.itDtaF.setLabel("fim:");
	    this.itDtaF.setSize(6);
	    this.itDtaF.addDate(DatePartType.month,3);	
	    //this.itDtaF.show(false);
	    this.append(this.itDtaF);	

		this.itIdDiscurso = new InputText("");
		this.itIdDiscurso.setColumn("$_id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);	
		this.itIdDiscurso.setSize(2);	
		this.append(this.itIdDiscurso);	

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setColumn("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("_id");
		this.itIdMembro.setLabelField("nmMembro");
		this.itIdMembro.setSize(8);	
		this.append(this.itIdMembro);

		this.itTempo = new NumericStepper(5);
		this.itTempo.setColumn("@tempo");
		this.itTempo.setLabel("tempo");
		this.itTempo.setSize(2);
	    this.itTempo.setMin(5);
	    this.itTempo.setMax(15);
	    this.itTempo.setStep(5);
	    this.itTempo.setEnable(false);	
	    this.append(this.itTempo);

		this.itTema = new InputText("");
		this.itTema.setColumn("@tema");
		this.itTema.setLabel("tema");
		this.itTema.setSize(12);	
		this.append(this.itTema);

		this.itFonte = new TextArea("alia. pg.");
		this.itFonte.setColumn("@fonte");
		this.itFonte.setLabel("ajuda");
		this.itFonte.setSize(12);	
		this.itFonte.setMaxLength(25);
		this.append(this.itFonte);	

		this.itLinkFonte = new InputText("");
		this.itLinkFonte.setColumn("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);	
		this.append(this.itLinkFonte);				
		
		this.mainList = new ListView("Discurso");
		this.append(this.mainList);
	}
	onStart():void{		
		this.itIdMembro.fromService({
			"url":"usuario/getbysnativos/S"
			,"module":this
		});
		this._modMembros = new FastMembro();
		this.getModView().append(this._modMembros);
		this.getMainList().setDataProvider([]);		
		//this.pesquisar();		
	}
	addDroppableEvent(){
		/*
		var tmpTo =  this.mainList.getEle(".tilecellgrid").find(".convite_reuniao");
		if(!tmpTo.attr("data-droppable")){
			tmpTo.attr("data-droppable","y");
		*/
		console.log("add droppable");

		this.mainList.getEle(".tilecellgrid .convite_reuniao").droppable({
		accept: ".discursante_drag"
	  	,drop: function( event:Event, ui:any ){	
	  		var tmpTo =  $(event.target);
	  		if(!tmpTo.attr("data-updating")){
	  			tmpTo.attr("data-updating","y");
		  		console.log("from");
			    var tmpFrom =  $(ui.helper);
			    console.log(tmpFrom.attr("data-iddiscursante"));						    
			    console.log("to");					    
			    console.log(tmpTo.attr("data-idconvite"));	
			    var tmpIndex:number = parseInt(tmpTo.attr("data-ind"));
			    this.getMainList().changeToIndex(tmpIndex);
			    var tmpDiscurso:IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();
			    
			    tmpDiscurso.idMembro = tmpFrom.attr("data-iddiscursante");
			    //tmpDiscurso
			    console.log(tmpFrom.attr("data-nomedisc"));
			    tmpDiscurso.nmMembro = tmpFrom.attr("data-nomedisc");
			    if(tmpDiscurso._id){
			    	this.atualizar(tmpDiscurso);
			    }else{
			    	tmpDiscurso.tema = "..defina o tema";
			    	tmpDiscurso.linkFonte = "#";
			    	tmpDiscurso.fonte = "Alia.";
					this.inserir(tmpDiscurso);
			    };
			    this.getMainList().updateItem(tmpDiscurso);
			    this.addDroppableEvent();
		  	};
	  	}.bind(this)
		});
	}
	onChangeItem(p_obj:IDiscurso):IDiscurso{
		
		this.itIdDiscurso.setValue(p_obj._id);
		this.itLinkFonte.setValue(p_obj.linkFonte);
		this.itFonte.setValue(p_obj.fonte);
		this.itTema.setValue(p_obj.tema);
		this.itTempo.setValue(p_obj.tempo+"");
		this.itIdMembro.setValue(p_obj.idMembro);

		return p_obj;
	}
	inserir(p_novo:IDiscurso):void{
		RequestManager.addRequest({
			"module":this
			,"url":"reuniao/discurso/"+ p_novo.idReuniao
			,"method":"post"
			,"data":p_novo
			,"onLoad":function(newId:number):void{
				//var tmpDiscurso:IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();
				this.getMainList().getSelectedItem()._id = newId;
			}.bind(this)
		});
	}
	atualizar(p_atualizado:IDiscurso):void{
		RequestManager.addRequest({
			"module":this
			,"url":"reuniao/discurso/"+ p_atualizado.idReuniao
			,"method":"put"
			,"data":p_atualizado
			,"onLoad":function(allOk:boolean):void{
				
			}.bind(this)
		});
	}
	pesquisar(evt:Event):void{
		evt.preventDefault();
	    RequestManager.addRequest({
	    	"module":this
	    	,"url":"reuniao/getbyperiodo"
	    	,"data":{
	    		"inicio":this.itDtaI.getValue()
	    		,"fim":this.itDtaF.getValue()
	    	}
	    	,"onLoad":function(dta:IReuniao[]){
		    	//discursante.getMainList().setDataProvider(dta.rs);	    	
		    	this.getMainList().setDataProvider([]);				
				var tm:number = dta.length;				
				var olddate:string = "";
				//usuario.historico.addRow(1,'<div class="amigodiv col-sm-12 col-sx-12" style="border:1px solid red"><div>');
				for(var i:number = 0;i<tm;i++){

					if(olddate != dta[i].momento.toString()){	
						olddate=dta[i].momento.toString();
						var tmpDateF:string[] = olddate.substring(0,10).split("-");
						this.getMainList().addRow(i,'<div class="convitedivfordate" style=""><h3 class="col-xs-12" style="text-align:center">'+tmpDateF[2]+'-'+tmpDateF[1]+'-'+tmpDateF[0]+'</h3></div>');	
					};
					var tmL:number = dta[i].discursos.length;
					//console.log(tmL);
					//console.log(dta[i].discursos);
					var temposRest:number[] = [5,10,15];
					for(var x:number=0;x<tmL;x++){
						//console.log(dta[i].discursos[x]);
						dta[i].discursos[x].nmMembro = this.itIdMembro.getDescFromServiceByValue(dta[i].discursos[x].idMembro);
						dta[i].discursos[x].idReuniao = dta[i]._id;
						this.getMainList().insertItem(dta[i].discursos[x],'bottom');						
						var indexTempo:number =  temposRest.indexOf(dta[i].discursos[x].tempo);
						if (indexTempo > -1) {
							temposRest.splice(indexTempo, 1);
						};
					};
					var totalRestante:number = temposRest.length;
					if(totalRestante>0){
						for(var x:number=0;x<totalRestante;x++){
							//console.log(dta[i].discursos[x]);
							var tmpDiscurso:IDiscurso = {"_id":"","linkFonte":"","fonte":"","tema":"","tempo":temposRest[x],"idMembro":""};
							tmpDiscurso.nmMembro = "";
							tmpDiscurso.idReuniao = dta[i]._id;
							this.getMainList().insertItem(tmpDiscurso,'bottom');
						};
					};
				};
				this.addDroppableEvent();
	    	}.bind(this)
		});  
	}
	printSintetico(evt:Event):void{
		evt.preventDefault();
		//js.underas.core.Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/convite_sintetico.json');
	}
	printConvites(evt:Event):void{
		evt.preventDefault();
		//js.underas.core.Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/convites.json');
	}
}