var ConfigNotificacaoGrupoItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){						
		var htmlTmp = '<h4>'+p_obj.idConfigNotificacaoGrupo+'-'+p_obj.dsGrupo+'</h4>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-6 col-md-6");
		}
	});



var ConfigNotificacaoGrupo = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdConfigNotificacaoGrupo":null	 
	,"itIdConfigNotificacao":null	 
	,"itIdGrupo":null	 
	,"initialize":function(){
		this.parent("*grupos notificados.");
		this.setRevision("$Revision: 138 $");	
		this.setSize(4);

		this.itIdConfigNotificacaoGrupo = new js.underas.controller.InputText("");
		this.itIdConfigNotificacaoGrupo.setColumn("$idConfigNotificacaoGrupo");
		this.itIdConfigNotificacaoGrupo.setLabel("cod.");
		this.itIdConfigNotificacaoGrupo.setEnable(false);	
		this.itIdConfigNotificacaoGrupo.setSize(2);	

		this.itIdConfigNotificacao = new js.underas.controller.InputText("");
		this.itIdConfigNotificacao.setColumn("@idConfigNotificacao");
		this.itIdConfigNotificacao.setLabel("notifi.");
		this.itIdConfigNotificacao.setSize(2);
		this.itIdConfigNotificacao.setEnable(false);

		this.itIdGrupo = new js.underas.controller.Select("id_grupo");
		this.itIdGrupo.setColumn("@idGrupo");
		this.itIdGrupo.setLabel("grupo");
		this.itIdGrupo.setValueField("idGrupo");
		this.itIdGrupo.setLabelField("nome");
		this.itIdGrupo.setSize(8);	
		
		this.mainList = new js.underas.controller.ListView("ConfigNotificacaoGrupo");
		this.mainList.setItemRender("ConfigNotificacaoGrupoItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"notificacao.business.ConfigNotificacaoGrupoBLL"});

		this.append(this.mainTb);
		this.append(this.itIdConfigNotificacaoGrupo);	
		this.append(this.itIdConfigNotificacao);
		this.append(this.itIdGrupo);	
		this.append(this.mainList);

//		this.addAssociation({"mod":"ConfigNotificacaoGrupo","url":"js/br/net/atasacramental/confignotificacaogrupo/view/ConfigNotificacaoGrupo.js","act":"getByidConfigNotificacaoGrupo","puid":this.getVarModule()});
//		this.addAssociation({"mod":"ConfigNotificacaoGrupo","url":"js/br/net/atasacramental/confignotificacaogrupo/view/ConfigNotificacaoGrupo.js","act":"getByidConfigNotificacaoGrupo","puid":this.getVarModule()});
	}
	,"onStart":function(){
		this.itIdGrupo.fromService("grupo.business.GrupoBLL.get");
		this.mainTb.activate(true);
	}
	,"getByIdConfigNotificacaoGrupo":function(p_idConfigNotificacaoGrupo){
		this.itIdConfigNotificacaoGrupo.setValue(p_idConfigNotificacaoGrupo);
		rm.addRequest({
			"puid":this.getVarModule()
			,"s":"notificacao.business.ConfigNotificacaoGrupoBLL.getByIdConfigNotificacaoGrupo"
			,"p":p_idConfigNotificacaoGrupo
			,"onLoad":function(dta){
				confignotificacaogrupo.getMainList().setDataProvider(dta.rs);
			}
		}); 
	}
	,"getByIdConfigNotificacao":function(p_idConfigNotificacao){
		this.itIdConfigNotificacao.setValue(p_idConfigNotificacao);
		rm.addRequest({
			"puid":this.getVarModule()
			,"s":"notificacao.business.ConfigNotificacaoGrupoBLL.getByIdConfigNotificacao"
			,"p":p_idConfigNotificacao
			,"onLoad":function(dta){
				confignotificacaogrupo.getMainList().setDataProvider(dta.rs);
			}
		}); 
	}
});