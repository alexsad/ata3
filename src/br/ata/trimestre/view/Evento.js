var EventoItemRender = new Class({
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
		if(!p_obj.dsObservacao){
			p_obj["dsObservacao"]="";
		}
		var htmlTmp = '<h4><span class="alert-'+tpAlert+'">&nbsp;'+p_obj.idEvento+'&nbsp;</span>-'+p_obj.descricao+'</h4>';
		htmlTmp += '<p class="list-group-item-text">PROPOSITO:'+p_obj.proposito+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">LOCAL:'+p_obj.local+' - '+p_obj.vestuario+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">MOMENTO:'+p_obj.momento+' '+p_obj.hora+'Hs</p>';
		htmlTmp += '<p class="list-group-item-text">ORCAMENTO:'+p_obj.orcamento+',00R$</p>'; 
		htmlTmp += '<p class="list-group-item-text">PARA:'+p_obj.dsOrganizacao+'-'+p_obj.publicoAlvo+'</p>';		
		htmlTmp += '<p class="list-group-item-text">RESPONSAVEL:'+p_obj.nmResponsavel+'</p>';
		htmlTmp += '<p class="list-group-item-text alert-'+tpAlert+'">'+p_obj.dsObservacao+'</p>';
		this.parent('div',htmlTmp);
		this.getEle().setStyle("min-height","270px").addClass("col-xs-12 col-sm-4 col-md-4");
		}
	});



var Evento = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdEvento":null
	,"itSnEditavel":null	
	,"itIdTrimestre":null	
	,"itDescricao":null	 
	,"itDetalhes":null	 
	,"itCodRefMLS":null
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
		this.parent("*Cadastro de Atividades ou Eventos.");
		this.setRevision("$Revision: 139 $");
		this.setSize(8);		
		
		/*
		this.amOrcamentoAtual = new js.underas.controller.AlertMsg("Clique 2 vezes na atividade para obter informacoes sobre orcamento...");
		this.amOrcamentoAtual.show(true);
		this.amOrcamentoAtual.setType("i");
		this.amOrcamentoAtual.setSize(12);
		
		this.dtreferencia = new  DatePicker();	 
		this.dtreferencia.setLabel("trimestre:");
		this.dtreferencia.addDate("month",2);
		*/
		
		this.itDsObservacao = new js.underas.controller.AlertMsg("Cadastro de Nova Atividade...");
		this.itDsObservacao.setColumn("#dsObservacao");
		//this.itDsObservacao.setLabel("observacao");
		this.itDsObservacao.setSize(12);	
		//this.itDsObservacao.show(false);
		this.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_WARNING);
		

		this.itIdEvento = new js.underas.controller.InputText("");
		this.itIdEvento.setColumn("$idEvento");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);	
		this.itIdEvento.setSize(2);	
		
		this.itIdTrimestre = new js.underas.controller.InputText("");
		this.itIdTrimestre.setColumn("@idTrimestre");
		this.itIdTrimestre.setLabel("trim.");
		this.itIdTrimestre.setEnable(false);	
		this.itIdTrimestre.setSize(1);
		this.itIdTrimestre.show(false);

		this.itDescricao = new js.underas.controller.InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(4);
		
		this.itSnEditavel = new js.underas.controller.CheckBox("Editavel?","Sim");
		this.itSnEditavel.setColumn("@snEditavel");
		this.itSnEditavel.setCheckedValue("S");
		this.itSnEditavel.setUnCheckedValue("N");
		this.itSnEditavel.setLabel("Editavel");
		this.itSnEditavel.setSize(2);
		this.itSnEditavel.setEnable(false);
		
		this.itCodRefMLS = new js.underas.controller.InputText("");
		this.itCodRefMLS.setColumn("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("codigo ref. MLS");
		this.itCodRefMLS.setSize(2);
		this.itCodRefMLS.setEnable(false);
		
		this.itIdStatus = new js.underas.controller.Select("id_status");
		this.itIdStatus.setColumn("@idStatus");
		this.itIdStatus.setLabel("Status");
		this.itIdStatus.setValueField("idStatus");
		this.itIdStatus.setLabelField("descricao");	
		this.itIdStatus.setEnable(false);
		this.itIdStatus.setSize(2);
		
		this.itDtDisponivel = new js.underas.controller.Select("dtDisponivel");		
		this.itDtDisponivel.setLabel("Dts. Livres");
		this.itDtDisponivel.setValueField("dtEventoData");
		this.itDtDisponivel.setLabelField("dsEventoData");	
		this.itDtDisponivel.setEnable(true);
		this.itDtDisponivel.setSize(3);

		this.itLocal = new js.underas.controller.InputText("capela");
		this.itLocal.setColumn("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("digite o local da atividade");
		this.itLocal.setSize(4);	
		
		this.itMomento = new js.underas.controller.DatePicker();
		this.itMomento.setColumn("@momento");
		this.itMomento.setPlaceHolder("data da atividade ex. 31-12-2015");
		this.itMomento.setLabel("data");
		this.itMomento.setEnable(false);
		//this.itMomento.setSize(3);	

		this.itHora = new js.underas.controller.InputTime("19:00");
		this.itHora.setColumn("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
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
		this.itIdOrganizacao.setEnable(false);

		this.itOrcamento = new js.underas.controller.NumericStepper(0);
		this.itOrcamento.setColumn("@orcamento");
		this.itOrcamento.setLabel("orcamento");
	    this.itOrcamento.setMin(0);
	    this.itOrcamento.setMax(400);
	    this.itOrcamento.setStep(5);
	    this.itOrcamento.setEnable(false,2);
		this.itOrcamento.setSize(3);	

		this.itPublicoAlvo = new js.underas.controller.InputText("");
		this.itPublicoAlvo.setColumn("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");		
		this.itPublicoAlvo.setSize(6);	
		this.itPublicoAlvo.setMaxLength(220);
		
		this.itVestuario = new js.underas.controller.InputText("no padrao");
		this.itVestuario.setColumn("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);	
		this.itVestuario.setMaxLength(150);

		this.itProposito = new js.underas.controller.TextArea("");
		this.itProposito.setColumn("@proposito");
		this.itProposito.setPlaceHolder("digite o proposito da atividade");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);	
		this.itProposito.setMaxLength(300);

		this.itDetalhes = new js.underas.controller.TextArea("");
		this.itDetalhes.setColumn("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setPlaceHolder("digite os detalhes da atividade");
		this.itDetalhes.setSize(12);	
		this.itDetalhes.setMaxLength(300);	
		
		this.mainList = new js.underas.controller.ListView("Evento");
		this.mainList.setItemRender("EventoItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"atividade.business.EventoBLL"});
		
		this.mainTb.btAdd.addEvent('click',function(){
			evento.novaAtividade();		
		});
		
		this.btSubmeter = new js.underas.controller.Button("Enviar");
		this.btSubmeter.setIcon("check");
		this.btSubmeter.addEvent('click',this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.addButton(this.btSubmeter);		
		
		this.btPrintAta = new js.underas.controller.Button("Ata");
		this.btPrintAta.setIcon("print");
		this.btPrintAta.addEvent('click',this.printAta.bind(this));
		this.mainTb.addButton(this.btPrintAta);

		this.append(this.mainTb);	
		this.append(this.itDsObservacao);
		this.append(this.itIdEvento);
		this.append(this.itIdTrimestre);			
		this.append(this.itDescricao);	
		this.append(this.itCodRefMLS);		
		this.append(this.itIdStatus);
		this.append(this.itSnEditavel);		
		this.append(this.itLocal);
		this.append(this.itDtDisponivel);
		this.append(this.itMomento);	
		this.append(this.itHora);	
		this.append(this.itIdOrganizacao);
		this.append(this.itIdResponsavel);	
		this.append(this.itOrcamento);	
		this.append(this.itPublicoAlvo);
		this.append(this.itVestuario);
		this.append(this.itProposito);			
		this.append(this.itDetalhes);		
		this.append(this.mainList);

		//this.addAssociation({"mod":"Evento","url":"js/br/net/atasacramental/atividade/view/Evento.js","act":"habilitarCampos","p":[],"puid":this.getVarModule()});
	}
	,"habilitarCampos":function(on){
		this.itDescricao.setEnable(on);		
		this.itLocal.setEnable(on);
		this.itDtDisponivel.setEnable(on);	
		this.itHora.setEnable(on);			
		this.itIdResponsavel.setEnable(on);
		this.itPublicoAlvo.setEnable(on);
		this.itVestuario.setEnable(on);
		this.itProposito.setEnable(on);			
		this.itDetalhes.setEnable(on);
		this.itCodRefMLS.setEnable(on);		
	}

	,"submeter":function(event){
		event.preventDefault();
		if(evento.itIdEvento.getValue()!=""){		
			if(evento.itIdOrganizacao.getValue() == ""){
				evento.itIdOrganizacao.setValue(login.idOrganizacao);
				evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_ERROR);
	    		evento.itDsObservacao.setText("Por favor, escolha uma organizacao!");			
			}else if(evento.itIdResponsavel.getValue() == ""){
				evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_ERROR);
	    		evento.itDsObservacao.setText("Por favor, escolha um responsavel!");
			}else{
				//evento.tbMain.sync(evento.dtgMain,evento.htmlX[0]["dta"]);
				
				//evento.getMainList().saveItem(event);
				
				var mybojS = evento.mainTb.syncItem();
				if(mybojS){				
					evento.getMainList().updateItem(mybojS);					
				    mybojS["s"] = "atividade.business.EventoBLL.submeter";
				    mybojS["puid"] = "evento";
				    mybojS["onLoad"] = function(dta){
				    	if(dta.rs){
				    		var evtrs = dta.rs;
					    	evento.itDsObservacao.setText(evtrs.dsObservacao);
					    	evento.itIdStatus.setValue(evtrs.idStatus);	
					    	evento.getMainList().updateItem(evtrs);
					    	if(evtrs.idStatus == 2 || evtrs.idStatus == 4 || evtrs.idStatus == 7){
					    		evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_SUCCESS);
					    		evento.habilitarCampos(false);
					    		//evento.itDtDisponivel.reloadService();
					    	}else{				    		
					    		evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_ERROR);
					    		evento.habilitarCampos(true);
					    	}
				    	}
				    };
				    rm.addRequest(mybojS); 
				}else{
					evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_ERROR);
					evento.itDsObservacao.setText("existe campos invalidos ou nao preenchidos!");
				}
			}
		}else{
			evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_ERROR);
			evento.itDsObservacao.setText("Primeiro salve a atividade!");
		}
		evento.itDsObservacao.show(true);
	}
	,"beforeQuery":function(p_req){
		p_req["s"]="atividade.business.EventoBLL.getByUsuarioPrivilegio";
		p_req["idGrupo"]=login.idGrupo;
		p_req["email"]=login.itlogin.getValue();
		p_req["idUsuario"]=login.idUsuario;
		p_req["idOrganizacao"]=login.idOrganizacao;	
		p_req["idTrimestre"] = this.itIdTrimestre.getValue();	
		return p_req;
	}
	,"onStart":function(){
		this.itIdResponsavel.fromService("membro.business.MembroBLL.getAtivos");
		this.itIdStatus.fromService("atividade.business.EventoBLL.getPossiveisStatus");
		this.itIdOrganizacao.fromService("organizacao.business.OrganizacaoBLL.get");		
		//this.mainTb.reloadItens();		
		this.itDtDisponivel.getInput().addEvent("change",this.setDtEvento.bind(this));
		this.mainTb.activate(true);
	}
	,"onChangeItem":function(p_item){	
		var on = false;
		this.btSubmeter.setEnable(false);
		if(p_item.snEditavel=="S"){
			on = true;
			this.btSubmeter.setEnable(true);
		}
		this.habilitarCampos(on);

	}
	,"setDtEvento":function(evt){
		this.itMomento.setValue(this.itDtDisponivel.getValue());
	}
	,"beforeSave":function(p_obj){	
		if(p_obj["local"]==""){
			p_obj["local"] = "capela";
		}		
		if(p_obj["vestuario"]==""){
			p_obj["vestuario"] = "no padrao";
		}	
		return p_obj;
	}
	,"beforeInsert":function(p_new_obj){		
		p_new_obj.idStatus = 1;
		p_new_obj.idOrganizacao= login.idOrganizacao;
		return p_new_obj;
	}
	,"beforeUpdate":function(p_new_obj,p_old_obj){		
		if(p_old_obj.snEditavel=="N"){
			return null;
		}		
		return p_new_obj;
	}
	,"beforeDelete":function(p_new_obj,p_old_obj){
		if(p_old_obj.snEditavel=="N"){
			return null;
		}	
		return p_new_obj;	
	}
	,"novaAtividade":function(){
		
		evento.itDsObservacao.setValue("Cadastro de Nova Atividade...");		
		evento.itDsObservacao.setType(js.underas.controller.AlertMsg.TP_WARNING);
		evento.itIdEvento.setValue("");		
		evento.itDescricao.setValue("");	
		evento.itPublicoAlvo.setValue("");
		evento.itVestuario.setValue("");
		evento.itProposito.setValue("");			
		evento.itDetalhes.setValue("");
		
		evento.habilitarCampos(true);
		evento.btSubmeter.setEnable(false);
		evento.itIdStatus.setValue(1);
		evento.itIdOrganizacao.setValue(login.idOrganizacao);
		evento.itIdResponsavel.setValue(login.idMembro);
		evento.itSnEditavel.setValue("S");
		evento.itOrcamento.setMax(trimestreview.getSaldo());
		evento.itOrcamento.setValue(trimestreview.getSaldo());
		
		evento.itMomento.setValue(evento.itDtDisponivel.getValue());
	}
	,"getByIdTrimestre":function(p_idTrimestre){
		this.itIdTrimestre.setValue(p_idTrimestre);
		this.itDtDisponivel.setDataProvider(trimestreview.getMainList().getSelectedItem().dtDisponivel);	
		rm.addRequest({
			"idGrupo":login.idGrupo
			,"email":login.itlogin.getValue()
			,"idUsuario":login.idUsuario
			,"idOrganizacao":login.idOrganizacao	
			,"idTrimestre":p_idTrimestre			
			,"puid":this.getVarModule()
			,"s":"atividade.business.EventoBLL.getByUsuarioPrivilegio"
			,"onLoad":function(dta){
				evento.getMainList().setDataProvider(dta.rs);				
				evento.novaAtividade();
			}
		}); 
	}
	,"printAta":function(){
		var a1 = new ArrayList();
		a1.add(this.getMainList().getSelectedItem());
		_.printDataProvider(a1,'assets/reports/ata_atividade2.json');
	}
});