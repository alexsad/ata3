var ConfigNotificacaoItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){						
		var htmlTmp = '<h4>'+p_obj.idConfigNotificacao+'-';
		htmlTmp += p_obj.descricao+'</h4>';
		htmlTmp += '<p class="list-group-item-text">TIPO:'+p_obj.tpNotificacao+'</p>';
		htmlTmp += '<p class="list-group-item-text">INICIO:'+p_obj.dtInicial+' FIM:'+p_obj.dtFinal+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">LIMITE_MAX:'+p_obj.limiteMax+' LIMITE_MIN:'+p_obj.limiteMin+'</p>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-6 col-md-6");
		}
	});



var ConfigNotificacao = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdConfigNotificacao":null	 
	,"itDescricao":null	 
	,"itMascara":null	 
	,"itDtInicial":null	 
	,"itDtFinal":null	 
	,"itLimiteMax":null	 
	,"itLimiteMin":null	 
	,"itServicoList":null	 
	,"itServicoCount":null	 
	,"itTpNotificacao":null	 
	,"initialize":function(){
		this.parent("*cadastro de notificacoes.");
		this.setRevision("$Revision: 138 $");	
		this.setSize(12);

		this.itIdConfigNotificacao = new js.underas.controller.InputText("");
		this.itIdConfigNotificacao.setColumn("$_id");
		this.itIdConfigNotificacao.setLabel("cod.");
		this.itIdConfigNotificacao.setEnable(false);	
		this.itIdConfigNotificacao.setSize(2);	

		this.itDescricao = new js.underas.controller.InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(7);	

		this.itMascara = new js.underas.controller.TextArea("");
		this.itMascara.setColumn("@mascara");
		this.itMascara.setLabel("Detalhes");
		this.itMascara.setSize(12);	
		
		this.itDtInicial = new js.underas.controller.DatePicker();
		this.itDtInicial.setColumn("@dtInicial");
		this.itDtInicial.setLabel("inicio");	
		
		this.itDtFinal = new js.underas.controller.DatePicker();
		this.itDtFinal.setColumn("@dtFinal");
		this.itDtFinal.setLabel("fim");

		this.itLimiteMax = new js.underas.controller.NumericStepper(0);
		this.itLimiteMax.setColumn("@limiteMax");
		this.itLimiteMax.setLabel("limt. max");
		this.itLimiteMax.setSize(3);	

		this.itLimiteMin = new js.underas.controller.NumericStepper(0);
		this.itLimiteMin.setColumn("@limiteMin");
		this.itLimiteMin.setLabel("limt. min");
		this.itLimiteMin.setSize(3);	

		this.itServicoList = new js.underas.controller.InputText("");
		this.itServicoList.setColumn("@servicoList");
		this.itServicoList.setLabel("servico list.");
		this.itServicoList.setSize(6);	

		this.itServicoCount = new js.underas.controller.InputText("");
		this.itServicoCount.setColumn("@servicoCount");
		this.itServicoCount.setLabel("servico count");
		this.itServicoCount.setSize(6);	

		this.itTpNotificacao = new js.underas.controller.Select("");
		this.itTpNotificacao.setColumn("@tpNotificacao");
		this.itTpNotificacao.setLabel("tipo");
		this.itTpNotificacao.setSize(3);
		this.itTpNotificacao.setValueField("idTipoNotificacao");
		this.itTpNotificacao.setLabelField("descricao");
		
		this.mainList = new js.underas.controller.ListView("ConfigNotificacao");
		this.mainList.setItemRender("ConfigNotificacaoItemRender");
		this.mainTb = new js.underas.net.ToolBar({"domain":"perfil/menu/menuitem"});
		
		this.append(this.mainTb);
		this.append(this.itIdConfigNotificacao);
		this.append(this.itDescricao);
		this.append(this.itTpNotificacao);
		this.append(this.itDtInicial);	
		this.append(this.itDtFinal);
		this.append(this.itLimiteMax);	
		this.append(this.itLimiteMin);
		this.append(this.itServicoList);	
		this.append(this.itServicoCount);			
		this.append(this.itMascara);	
		this.append(this.mainList);		
		this.addAssociation({"mod":"br.net.atasacramental.notificacao.view.ConfigNotificacaoGrupo","act":"getByIdConfigNotificacao"});
	}
	,"onStart":function(){
		//this.itTpNotificacao.fromService("notificacao.business.ConfigNotificacaoBLL.getTiposNotificacao");
	}
	
});