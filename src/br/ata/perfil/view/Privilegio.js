var PrivilegioItemRender = new Class({
	"Extends":js.underas.controller.ListViewItemRender
	,"initialize":function(p_obj){		
		var tmpLabel = privilegio.itIdItemMenu.getDescFromServiceByValue(p_obj.idItemMenu);			
		var htmlTmp = '<h4>'+tmpLabel+'</h4>';
		this.parent('div',htmlTmp);
		this.getEle().addClass("col-xs-12 col-sm-6 col-md-6");
		}
	});



var Privilegio = new Class({
	"Extends":js.underas.container.ModWindow
	,"itIdGrupoItem":null	 
	,"itIdItemMenu":null	 
	,"itIdGrupo":null	 
	,"initialize":function(){
		this.parent("Privilegios");
		this.setRevision("$Revision: 138 $");	
		this.setSize(4);

		this.itIdGrupoItem = new js.underas.controller.InputText("");
		this.itIdGrupoItem.setColumn("$_id");
		this.itIdGrupoItem.setLabel("cod.");
		this.itIdGrupoItem.setEnable(false);	
		this.itIdGrupoItem.setSize(2);	

		this.itIdItemMenu = new js.underas.controller.Select("selecione um menu");
		this.itIdItemMenu.setColumn("@idItemMenu");
		this.itIdItemMenu.setLabel("item do menu");
		this.itIdItemMenu.setValueField("_id");
		this.itIdItemMenu.setLabelField("label");
		this.itIdItemMenu.setSize(10);	

		this.itIdGrupo = new js.underas.controller.Select("selecione um grupo");
		this.itIdGrupo.setColumn("@idGrupo");
		this.itIdGrupo.setLabel("grupo");
		this.itIdGrupo.setValueField("_id");
		this.itIdGrupo.setLabelField("nome");
		this.itIdGrupo.setSize(12);	
		
		this.mainList = new js.underas.controller.ListView("GrupoItem");
		this.mainList.setItemRender("PrivilegioItemRender");
		this.setMainList("mainList");
		this.mainTb = new js.underas.net.ToolBar({"domain":"grupoitem/grupoitem"});

		this.append(this.mainTb);
		this.append(this.itIdGrupoItem);	
		this.append(this.itIdItemMenu);	
		this.append(this.itIdGrupo);	
		this.append(this.mainList);

//		this.addAssociation({"mod":"GrupoItem","url":"js/br/net/atasacramental/grupoitem/view/GrupoItem.js","act":"getByidGrupoItem","puid":this.getVarModule()});
//		this.addAssociation({"mod":"GrupoItem","url":"js/br/net/atasacramental/grupoitem/view/GrupoItem.js","act":"getByidGrupoItem","puid":this.getVarModule()});
	}
	,"onStart":function(){
		this.itIdItemMenu.fromService("menu/itemmenu");
		this.itIdGrupo.fromService("grupo/grupo");
		this.mainTb.activate(true);
	}
	,"getByIdGrupo":function(p_idGrupo){		
		this.itIdGrupo.setValue(p_idGrupo);
		js.underas.net.RequestManager.addRequest({
			"puid":this.getVarModule()
			,"url":"grupoitem/grupoitem/getbyidgrupo/"+this.itIdGrupo.getValue()
			,"onLoad":function(dta){
				this.getMainList().setDataProvider(dta);				
			}.bind(this)
		}); 
	}
	,"beforeQuery":function(p_req){		
		p_req["url"] = "grupoitem/grupoitem/getbyidgrupo/"+this.itIdGrupo.getValue();
		p_req["puid"] = this.getVarModule();		
		return p_req;
	}
});