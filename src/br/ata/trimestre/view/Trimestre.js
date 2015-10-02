var TrimestreItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){						
		var htmlTmp = '<h4>'+p_obj.nrTrimestre+'&ordm; trim. de '+p_obj.ano+'</h4>';
		//htmlTmp += '<p class="list-group-item-text">NUMERO DO TRIMESTRE:'+p_obj.nrTrimestre+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">DISPONIVEL:'+p_obj.snAberto+'</p>'; 
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-6 col-md-6");
		}
	});



var Trimestre = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdTrimestre":null	 
	,"itAno":null	 
	,"itNrTrimestre":null	 
	,"itSnAberto":null	 
	,"initialize":function(){
		this.parent("trimestres");
		this.setRevision("$Revision: 138 $");	
		this.setSize(12);

		this.itIdTrimestre = new js.underas.controller.InputText("");
		this.itIdTrimestre.setColumn("$_id");
		this.itIdTrimestre.setLabel("cod.");
		this.itIdTrimestre.setEnable(false);	
		this.itIdTrimestre.setSize(3);	

		this.itAno = new js.underas.controller.NumericStepper(2015);
		this.itAno.setColumn("@ano");
		this.itAno.setLabel("ano");
		this.itAno.setStep(1);
		this.itAno.setMin(2014);
		this.itAno.setMax(2050);
		this.itAno.setEnable(false,2);
		this.itAno.setSize(5);	

		this.itNrTrimestre = new js.underas.controller.NumericStepper(1);
		this.itNrTrimestre.setColumn("@nrTrimestre");
		this.itNrTrimestre.setLabel("trim.");
		this.itNrTrimestre.setStep(1);
		this.itNrTrimestre.setMin(1);
		this.itNrTrimestre.setMax(4);		
		this.itNrTrimestre.setEnable(false,2);
		this.itNrTrimestre.setSize(4);

		this.itSnAberto = new js.underas.controller.CheckBox("Disponivel","Sim");
		this.itSnAberto.setColumn("@snAberto");
		this.itSnAberto.setLabel("disponivel");
		this.itSnAberto.setSize(12);	
		
		this.mainList = new js.underas.controller.ListView("Trimestre");
		this.mainList.setItemRender("TrimestreItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"trimestre/trimestre"});

		this.append(this.mainTb);
		this.append(this.itIdTrimestre);	
		this.append(this.itAno);	
		this.append(this.itNrTrimestre);	
		this.append(this.itSnAberto);	
		this.append(this.mainList);
		
		
		//this.addAssociation({"mod":"OrganizacaoLancamento","url":"js/br/net/atasacramental/organizacao/view/OrganizacaoLancamento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		//this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/evento/view/Evento.js","act":"getByIdTrimestre","puid":this.getVarModule()});
		
	}
	,"onStart":function(){
		this.mainTb.reloadItens();
	}
});