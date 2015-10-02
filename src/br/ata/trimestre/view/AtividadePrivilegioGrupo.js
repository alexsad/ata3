
var AtividadePrivilegioGrupoItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){						
		var htmlTmp = '<h4>'+p_obj.idAtividadePrivilegioGrupo+'-'+p_obj.dsGrupo+'</h4>';
		htmlTmp += '<p class="list-group-item-text">'+p_obj.dsAtividadeStatus+'</p>'; 
		htmlTmp += '<p class="list-group-item-text">'+p_obj.dsOrganizacao+'</p>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-6 col-sm-4 col-md-4");
		}
	});



var AtividadePrivilegioGrupo = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdAtividadePrivilegioGrupo":null	 
	,"itIdOrganizacao":null	 
	,"itIdGrupo":null	 
	,"itIdAtividadeStatus":null	 
	,"itSnEdita":null
	,"initialize":function(){
		this.parent("*Configuracao dos eventos por grupo.");
		this.setRevision("$Revision: 138 $");		

		this.itIdAtividadePrivilegioGrupo = new js.underas.controller.InputText("");
		this.itIdAtividadePrivilegioGrupo.setColumn("$idAtividadePrivilegioGrupo");
		this.itIdAtividadePrivilegioGrupo.setLabel("cod.");
		this.itIdAtividadePrivilegioGrupo.setEnable(false);	
		this.itIdAtividadePrivilegioGrupo.setSize(2);	


		
		this.itIdOrganizacao = new js.underas.controller.Select("organizacao");
		this.itIdOrganizacao.setColumn("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setValueField("idOrganizacao");
		this.itIdOrganizacao.setSize(5);	

		this.itIdGrupo = new js.underas.controller.Select("grupo");
		this.itIdGrupo.setColumn("@idGrupo");
		this.itIdGrupo.setLabel("grupo");
		this.itIdGrupo.setLabelField("nome");
		this.itIdGrupo.setValueField("idGrupo");
		this.itIdGrupo.setSize(5);	

		this.itIdAtividadeStatus = new js.underas.controller.Select("etapa");
		this.itIdAtividadeStatus.setColumn("@idAtividadeStatus");
		this.itIdAtividadeStatus.setLabel("etapa");
		this.itIdAtividadeStatus.setLabelField("descricao");
		this.itIdAtividadeStatus.setValueField("idStatus");
		this.itIdAtividadeStatus.setSize(5);	

		
		this.itSnEdita = new js.underas.controller.CheckBox("Permissao","Pode alterar a atividade");
		this.itSnEdita.setLabel("Pode Alterar");
		this.itSnEdita.setColumn("@snEdita");
		this.itSnEdita.setCheckedValue("S");
		this.itSnEdita.setUnCheckedValue("N");
		this.itSnEdita.setSize(7);
		
		this.mainList = new js.underas.controller.ListView("AtividadePrivilegioGrupo");
		this.mainList.setItemRender("AtividadePrivilegioGrupoItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"atividade.business.AtividadePrivilegioGrupoBLL"});

		this.append(this.mainTb);
		this.append(this.itIdAtividadePrivilegioGrupo);	
		this.append(this.itIdOrganizacao);	
		this.append(this.itIdGrupo);	
		this.append(this.itIdAtividadeStatus);	
		this.append(this.itSnEdita);	
		this.append(this.mainList);

//		this.addAssociation({"mod":"AtividadePrivilegioGrupo","url":"js/br/net/atasacramental/atividadeprivilegiogrupo/view/AtividadePrivilegioGrupo.js","act":"getByidAtividadePrivilegioGrupo","puid":this.getVarModule()});

	}
	,"onStart":function(){
		this.itIdOrganizacao.fromService("organizacao.business.OrganizacaoBLL.get");
		this.itIdGrupo.fromService("grupo.business.GrupoBLL.get");
		this.itIdAtividadeStatus.fromService("atividade.business.EventoBLL.getPossiveisStatus");
		this.mainTb.activate(true);
	}
	,"getByIdAtividadePrivilegioGrupo":function(p_idAtividadePrivilegioGrupo){
		this.itIdAtividadePrivilegioGrupo.setValue(p_idAtividadePrivilegioGrupo);
		rm.addRequest({
			"puid":this.getVarModule()
			,"s":"atividade.business.AtividadePrivilegioGrupoBLL.getByIdAtividadePrivilegioGrupo"
			,"p":p_idAtividadePrivilegioGrupo
			,"onLoad":function(dta){
				atividadeprivilegiogrupo.getMainList().setDataProvider(dta.rs);
			}
		}); 
	}
});