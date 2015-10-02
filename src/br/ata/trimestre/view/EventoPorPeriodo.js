var EventoPorPeriodoItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){		
		var htmlTmp = '<h3 style="text-align:center"><strong>'+p_obj.descricao+'</strong></h3>';
		htmlTmp += '<p class="list-group-item-text"><strong>proposito:</strong>'+p_obj.proposito+'</p>'; 
		htmlTmp += '<p class="list-group-item-text"><strong>local:</strong>'+p_obj.local+'</p>'; 
		htmlTmp += '<p class="list-group-item-text"><strong>vestuario:</strong>'+p_obj.vestuario+'</p>'; 
		htmlTmp += '<p class="list-group-item-text"><strong>data:</strong>'+p_obj.momento+' '+p_obj.hora+'Hs</p>';
		htmlTmp += '<p class="list-group-item-text"><strong>para:</strong>'+p_obj.publicoAlvo+'</p>';		
		htmlTmp += '<p class="list-group-item-text"><strong>responsavel:</strong>'+p_obj.nmResponsavel+'</p>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-4 col-md-4").setStyle("min-height","230px");
		}
	});

var EventoPorPeriodo = new Class({
	"Extends":js.underas.container.ModWindow
	,"initialize":function(){
	    this.parent("*Calendario de atividades da Ala.");
		this.setRevision("$Revision: 138 $");
		
		this.mainTb = new js.underas.net.SimpleToolBar();
		
	    this.btPesquisar = new js.underas.controller.Button("Pesquisar");
	    this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
	    this.btPesquisar.setIcon("search");
	    
	    this.btLimpar = new js.underas.controller.Button("Limpar");
	    this.btLimpar.addEvent('click',function(){
	    	eventoporperiodo.itDtaI.setValue("");
	    	eventoporperiodo.itDtaF.setValue("");
	    });
	    this.btLimpar.setIcon("remove");
		
		this.btPrintAta = new js.underas.controller.Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		//this.btPrintAta.setEnable(false);
	    
	    this.itDtaI = new js.underas.controller.DatePicker();
	    this.itDtaI.setLabel("inicio:");
	    this.itDtaF = new js.underas.controller.DatePicker();
	    this.itDtaF.setLabel("fim:");
	    this.itDtaF.addDate("month",3);	       
		this.mainList = new js.underas.controller.ListView("Evento");
		this.mainList.setItemRender("EventoPorPeriodoItemRender");
		this.setMainList("mainList");
	   
	    this.mainTb.addButton(this.btPesquisar);
	    this.mainTb.addButton(this.btLimpar);
	    this.mainTb.addButton(this.btPrintAta);
	    
	    this.append(this.mainTb);
	    this.append(this.itDtaI);
	    this.append(this.itDtaF);
	    this.append(this.mainList);
	}
	,"pesquisar":function(){
	    js.underas.net.RequestManager.addRequest({
	    	"puid":this.getVarModule()
	     	,"url":"evento/evento/getaprovadaseliberadasbyperiodo"
	     	,"data":{"inicio":this.itDtaI.getValue(),"fim":this.itDtaF.getValue()}
	    	,"onLoad":function(dta){    	
		    	this.getMainList().setDataProvider([]).clear();	    	
		    	//eventoporperiodo.getMainList().setDataProvider(dta.rs).clear();		    	
				var tmpA = new js.underas.util.ArrayList(dta);
				var tm = tmpA.size();				
				var oldmonth = "";
				var monthsarray = {
									"01":"janeiro"
									,"02":"fevereiro"
									,"03":"marco"
									,"04":"abril"
									,"05":"maio"
									,"06":"junho"
									,"07":"julho"
									,"08":"agosto"
									,"09":"setembro"	
									,"10":"outubro"
									,"11":"novembro"
									,"12":"dezembro"
								};
				for(var i = 0;i<tm;i++){				
					var newmonth = tmpA.get(i).momento.replace(/\d+-(\d+)-\d{4}/,"$1");				
					if(newmonth!=oldmonth){	
						oldmonth=newmonth;
						this.getMainList().addRow(i,'<div class="boxcalendarioatividade"><h2 class="col-xs-12" style="text-align:center">'+monthsarray[oldmonth]+'</h2></div>');
					}
					this.getMainList().insertItem(tmpA.get(i),'bottom');
				}			
				tmpA = null;
	    	}.bind(this)
		});
	}
	,"printAta":function(){
		js.underas.core.Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/calendario_sintetico.json');
	}
});