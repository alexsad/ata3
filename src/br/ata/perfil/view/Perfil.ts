import {ModWindow} from "../../../../lib/container";
import {ItemView,InputText,CheckBox,ListView} from "../../../../lib/controller";
import {ToolBar,RequestManager} from "../../../../lib/net";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";



@ItemView({url:"js/br/ata/perfil/view/assets/html/perfil.html",list:"mainList"})
export class Perfil extends ModWindow{
	itIdPerfil:InputText;	 
	itNome:InputText;	 
	itComentario:InputText;
	itSnAtivo:CheckBox;	 
	mainTb:ToolBar;
	mainList:ListView;
	_menus: Menu;
	constructor(){
		super("Perfil","br.ata.perfil.view.Perfil");
		this.setRevision("$Revision: 138 $");	
		this.setSize(3);

		this.mainTb = new ToolBar({"domain":"perfil"});
		this.append(this.mainTb);

		this.itIdPerfil = new InputText("");
		this.itIdPerfil.setColumn("$_id");
		this.itIdPerfil.setLabel("cod.");
		this.itIdPerfil.setEnable(false);	
		this.itIdPerfil.setSize(4);	
		this.append(this.itIdPerfil);

		this.itNome = new InputText("");
		this.itNome.setColumn("@descricao");
		this.itNome.setLabel("descricao");
		this.itNome.setSize(8);	
		this.append(this.itNome);

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setColumn("@snAtivo");
		this.itSnAtivo.setSize(12);
		this.append(this.itSnAtivo);

		this.itComentario = new InputText("");
		this.itComentario.setColumn("@comentario");
		this.itComentario.setLabel("comentario");
		this.itComentario.setSize(12);	
		this.append(this.itComentario);	
		
		this.mainList = new ListView("Perfil");
		this.append(this.mainList);	
	}
	onStart():void{
		//this.mainTb.activate(true);
		this.mainTb.reloadItens();	
		/*	
		RequestManager.addRequest({
				"url":"perfil/menu",
				"module":this,
				"onLoad" : function(dta) {
					//var mainMenu = new MenuTab({"title":"InfoAta 3.1","target":"#sidebar"});
					//mainMenu.setDataProvider(dta[1].menus);
					//mainMenu.setIcon('assets/logo_title.jpg');
				}.bind(this)
		});
		*/
		this._menus = new Menu();
		this.getModView().append(this._menus);
	}
	onChangeItem(p_obj:IPerfil):IPerfil{
		this._menus._idPerfil = this.itIdPerfil.getValue();
		this._menus.getMainList().setDataProvider(p_obj.menus);
		if(p_obj.menus){
			if (p_obj.menus.length == 0) {
				this._menus._items.getMainList().setDataProvider([]);
			};			
		};
		return p_obj;
	}
}