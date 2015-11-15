var EventoViewItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){
		var tpAlert = "info";		
		if(p_obj.idStatus == 3 ||p_obj.idStatus == 6){
			 tpAlert = "danger";
		}else if(p_obj.idStatus == 5 ){
			 tpAlert = "warning";
		}else if(p_obj.idStatus == 7 ){
			 tpAlert = "success";
		}		
		var htmlTmp = '<h4><span class="alert-'+tpAlert+'">&nbsp;'+p_obj.idEvento+'&nbsp;</span>-';
		htmlTmp += p_obj.descricao+'</h4>';
		htmlTmp += '<p class="list-group-item-text">PROPOSITO:'+p_obj.proposito+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">LOCAL:'+p_obj.local+' - '+p_obj.vestuario+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">MOMENTO:'+p_obj.momento+' '+p_obj.hora+'Hs</p>';
		htmlTmp += '<p class="list-group-item-text">ORCAMENTO:'+p_obj.orcamento+',00R$</p>'; 
		htmlTmp += '<p class="list-group-item-text">PUBLICO_ALVO:'+p_obj.dsOrganizacao+'-'+p_obj.publicoAlvo+'</p>';		
		htmlTmp += '<p class="list-group-item-text">RESPONSAVEL:'+p_obj.nmResponsavel+'</p>';
		htmlTmp += '<p class="list-group-item-text alert-'+tpAlert+'">'+p_obj.dsObservacao+'</p>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-4 col-md-4");
		}
	});



var EventoView = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdEvento":null
	,"itIdTrimestre":null	
	,"itDescricao":null	 
	,"itCodRefMLS":null
	,"itDetalhes":null	 
	,"itLocal":null	 
	,"itMomento":null	 
	,"itHora":null	 
	,"itIdResponsavel":null	 
	,"itOrcamento":null	 
	,"itPublicoAlvo":null	 
	,"itProposito":null	 
	,"itIdStatus":null	 
	,"itIdOrganizacao":null	 
	,"itDsObservacao":null	 
	,"itVestuario":null		 
	,"initialize":function(){
		this.parent("*Edicao de Atividades.");
		this.setRevision("$Revision: 139 $");		

		this.itIdEvento = new js.underas.controller.InputText("");
		this.itIdEvento.setColumn("$idEvento");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);	
		this.itIdEvento.setSize(2);	
		
		this.itIdTrimestre = new js.underas.controller.Select("");
		this.itIdTrimestre.setColumn("@idTrimestre");
		this.itIdTrimestre.setLabel("trim.");
		this.itIdTrimestre.setEnable(true);	
		this.itIdTrimestre.setSize(2);
		this.itIdTrimestre.setValueField("idTrimestre");
		this.itIdTrimestre.setLabelField("dsTrimestre");		
	

		this.itDescricao = new js.underas.controller.InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(4);
		
		this.itCodRefMLS = new js.underas.controller.InputText("");
		this.itCodRefMLS.setColumn("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("codigo ref. MLS");
		this.itCodRefMLS.setSize(2);
		
		this.itIdStatus = new js.underas.controller.Select("id_status");
		this.itIdStatus.setColumn("@idStatus");
		this.itIdStatus.setLabel("Status");
		this.itIdStatus.setValueField("idStatus");
		this.itIdStatus.setLabelField("descricao");		
		this.itIdStatus.setSize(2);

		this.itLocal = new js.underas.controller.InputText("");
		this.itLocal.setColumn("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setSize(7);	
		
		this.itMomento = new js.underas.controller.DatePicker();
		this.itMomento.setColumn("@momento");
		this.itMomento.setLabel("data");
		//this.itMomento.setSize(3);	

		this.itHora = new js.underas.controller.InputTime("");
		this.itHora.setColumn("@hora");
		this.itHora.setLabel("hora");
		//this.itHora.setSize(2);	

		this.itIdResponsavel = new js.underas.controller.Select("id_responsavel");
		this.itIdResponsavel.setColumn("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("idMembro");
		this.itIdResponsavel.setLabelField("nome");		
		this.itIdResponsavel.setSize(5);
		
		this.itIdOrganizacao = new js.underas.controller.Select("id_organizacao");
		this.itIdOrganizacao.setColumn("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao");
		this.itIdOrganizacao.setValueField("idOrganizacao");
		this.itIdOrganizacao.setLabelField("descricao");		
		this.itIdOrganizacao.setSize(4);

		this.itOrcamento = new InputMoney(0);
		this.itOrcamento.setColumn("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		//this.itOrcamento.setSize(2);	

		this.itPublicoAlvo = new js.underas.controller.InputText("");
		this.itPublicoAlvo.setColumn("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setSize(12);	
		this.itPublicoAlvo.setMaxLength(220);
		
		this.itVestuario = new js.underas.controller.InputText("");
		this.itVestuario.setColumn("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setSize(12);	
		this.itVestuario.setMaxLength(150);

		this.itProposito = new js.underas.controller.TextArea("");
		this.itProposito.setColumn("@proposito");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);	
		this.itProposito.setMaxLength(300);

		this.itDetalhes = new js.underas.controller.TextArea("");
		this.itDetalhes.setColumn("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setSize(12);	
		this.itDetalhes.setMaxLength(300);	

		this.itDsObservacao = new js.underas.controller.TextArea("Sem Pendencias...");
		this.itDsObservacao.setColumn("#dsObservacao");
		this.itDsObservacao.setLabel("observacao");
		this.itDsObservacao.setSize(12);	


		
		this.mainList = new js.underas.controller.ListViewAdv("Evento");
		this.mainList.setItemRender("EventoViewItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"atividade.business.EventoBLL"});
		
		this.btPrintAta = new js.underas.controller.Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		this.mainTb.addButton(this.btPrintAta);

		this.append(this.mainTb);
		this.append(this.itIdEvento);
		this.append(this.itIdTrimestre);				
		this.append(this.itDescricao);	
		this.append(this.itCodRefMLS);
		this.append(this.itIdStatus);			
		this.append(this.itLocal);	
		this.append(this.itMomento);	
		this.append(this.itHora);	
		this.append(this.itIdOrganizacao);
		this.append(this.itIdResponsavel);	
		this.append(this.itOrcamento);	
		this.append(this.itPublicoAlvo);
		this.append(this.itVestuario);
		this.append(this.itProposito);			
		this.append(this.itDetalhes);
		this.append(this.itDsObservacao);
		this.append(this.mainList);

//		this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/evento/view/Evento.js","act":"getByidEvento","puid":this.getVarModule()});
	}
	,"onStart":function(){
		this.itIdResponsavel.fromService("membro.business.MembroBLL.getAtivos");
		this.itIdStatus.fromService("atividade.business.EventoBLL.getPossiveisStatus");
		this.itIdOrganizacao.fromService("organizacao.business.OrganizacaoBLL.get");
		this.itIdTrimestre.fromService("trimestre.business.TrimestreBLL.get");
		this.mainTb.reloadItens(null);
		this.mainTb.activate(true);
	}
	,"printAta":function(){
		var a1 = new ArrayList();
		a1.add(this.getMainList().getSelectedItem());
		_.printDataProvider(a1,'assets/reports/ata_atividade2.json');
	}
	,"beforeQuery":function(p_req){
		p_req["s"]="atividade.business.EventoBLL.getPaginado";
		return p_req;
	}
	,"beforeInsert":function(p_new_obj){
		/*
		p_new_obj.idStatus = 1;
		p_new_obj.idOrganizacao= login.idOrganizacao;
		p_new_obj.idResponsavel=login.idMembro;
		*/
		return p_new_obj;
	}
	,"getByIdEvento":function(p_idEvento){
		this.itIdEvento.setValue(p_idEvento);
		rm.addRequest({
			"puid":this.getVarModule()
			,"s":"evento.business.EventoBLL.getByIdEvento"
			,"p":p_idEvento
			,"onLoad":function(dta){
				eventoview.getMainList().setDataProvider(dta.rs);
			}
		}); 
	}
	,"getByIdTrimestre":function(p_idTrimestre){
		this.itIdTrimestre.setValue(p_idTrimestre);
		rm.addRequest({
			"puid":this.getVarModule()
			,"s":"evento.business.EventoBLL.getByIdTrimestre"
			,"p":p_idTrimestre
			,"onLoad":function(dta){
				eventoview.getMainList().setDataProvider(dta.rs);
			}
		}); 
	}
});