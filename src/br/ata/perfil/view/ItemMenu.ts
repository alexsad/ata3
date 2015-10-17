import {ModWindow} from "../../../../lib/container";
import {ItemView,NumericStepper,InputText,Select,ListView} from "../../../../lib/controller";
import {ToolBar,IDefaultRequest,RequestManager} from "../../../../lib/net";
import {Underas} from "../../../../lib/core";
import {IItemMenu,IMenu} from "../model/IPerfil";
import {Menu} from "Menu";

@ItemView("assets/html/itemmenu.html")
export class ItemMenu extends ModWindow{
	itIdItemMenu:InputText;	 
	itLabel:InputText; 
	itFuncao:InputText;	 
	itTela:Select; 
	itIcone:Select;	
	itOrdem:NumericStepper;	
	mainTb:ToolBar;
	mainList:ListView;
	_menu: Menu;
	constructor(p_menu:Menu){
		super("*Itens do menu.");
		this.setRevision("$Revision: 138 $");		
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"perfil/menu/menuitem"});
		this.append(this.mainTb);	

		this.itIdItemMenu = new InputText("");
		this.itIdItemMenu.setColumn("$_id");
		this.itIdItemMenu.setLabel("cod.");
		this.itIdItemMenu.setEnable(false);	
		this.itIdItemMenu.setSize(4);	
		this.append(this.itIdItemMenu);	

		this.itLabel = new InputText("");
		this.itLabel.setColumn("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(8);	
		this.append(this.itLabel);

		this.itFuncao = new InputText("");
		this.itFuncao.setColumn("#funcao");
		this.itFuncao.setLabel("funcao");
		this.itFuncao.setSize(12);
		this.append(this.itFuncao);	

		this.itTela = new Select("selecione uma tela");
		this.itTela.setLabel("tela");
		this.itTela.setColumn("@tela");
		this.itTela.setSize(12);
		this.itTela.setValueField("modulo");
		this.itTela.setLabelField("descricao");
		this.append(this.itTela);

		this.itIcone = new Select("selecione um icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(8);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);
		
		this.itOrdem = new NumericStepper(5);
		this.itOrdem.setEnable(false,2);
		this.itOrdem.setSize(4);
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setColumn("@ordem");
		this.append(this.itOrdem);
		
		this.mainList = new ListView("ItemMenu");
		this.append(this.mainList);	

		this._menu = p_menu;	
	}
	onStart():void{
		var tmpUrl:string= Underas.getLocation();
		this.itIcone.fromService({ 
			rootUrl: tmpUrl
			,url: "assets/icons.json"
		});
		this.itTela.fromService({ 
			rootUrl: tmpUrl
			,url: "assets/modulo.json" 
		});
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this._menu._idPerfil || !this._menu.itIdMenu.getValue()) {
			return null;
		};
		var tmpMenu: IMenu = <IMenu>this._menu.getMainList().getSelectedItem();
		if (!tmpMenu.children) {
			tmpMenu.children = [];
		};
		tmpMenu.children.push(<IItemMenu>p_req_obj.data);
		p_req_obj.url="perfil/menu/menuitem/"+this._menu._idPerfil+","+ this._menu.itIdMenu.getValue();
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IItemMenu): IDefaultRequest{
		if (!this._menu._idPerfil || !this._menu.itIdMenu.getValue()) {
			return null;
		};
		var tmpMenu: IMenu = <IMenu> this._menu.getMainList().getSelectedItem();
		if(!tmpMenu.children){
			tmpMenu.children = [];
		};
		//tmpMenu.children[0] =  p_req_new_obj.data;
		var indx: number = parseInt(p_old_obj._ind);
		tmpMenu.children[indx] = <IItemMenu>p_req_new_obj.data;
		this._menu.mainTb.saveItem(null);
		return null;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IItemMenu): IDefaultRequest {
		
		if (!this._menu._idPerfil || !this._menu.itIdMenu.getValue()) {
			return null;
		};

		p_req_delete.url = "perfil/menu/menuitem/" + this._menu._idPerfil + "," + this._menu.itIdMenu.getValue() + "," + p_old_obj._id;
		var tmpMenu: IMenu = <IMenu>this._menu.getMainList().getSelectedItem();

		var indx: number = parseInt(p_old_obj._ind);
		//tmpMenu.children[indx] = <IItemMenu>p_req_new_obj.data;

		tmpMenu.children.splice(indx, 1);

		this._menu.mainTb.saveItem(null);

		return null;
	}
}