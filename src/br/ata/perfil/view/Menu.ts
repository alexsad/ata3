import {ModWindow} from "../../../../lib/container";
import {ItemView,NumericStepper,InputText,Select,ListView} from "../../../../lib/controller";
import {ToolBar,IDefaultRequest,RequestManager} from "../../../../lib/net";
import {Underas} from "../../../../lib/core";
import {IMenu} from "../model/IPerfil";
import {ItemMenu} from "./ItemMenu";

@ItemView("assets/html/menu.html")
export class Menu extends ModWindow{
	itIdMenu: InputText;	 
	itLabel: InputText; 
	itIcone: Select;	 
	itOrdem: NumericStepper;
	mainTb:ToolBar;
	mainList:ListView;
	_idPerfil: string;
	_items: ItemMenu;

	constructor(){	
		super("*cadastro e configuracao dos menus.");
		this.setRevision("$Revision: 138 $");		
		this.setSize(5);

		this.mainTb = new ToolBar({"domain":"perfil/menu"});
		this.append(this.mainTb);	

		this.itIdMenu = new InputText("");
		this.itIdMenu.setColumn("$_id");
		this.itIdMenu.setLabel("cod.");
		this.itIdMenu.setEnable(false);	
		this.itIdMenu.setSize(3);	
		this.append(this.itIdMenu);	

		this.itLabel = new InputText("");
		this.itLabel.setColumn("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(6);	
		this.append(this.itLabel);

		this.itOrdem = new NumericStepper(0);
		this.itOrdem.setColumn("@ordem");
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setSize(3);	
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setEnable(false,2);
		this.append(this.itOrdem);

		this.itIcone = new Select("selecione um icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(12);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);	
		
		this.mainList = new ListView("Menu");		
		this.append(this.mainList);		
	}
	onStart():void{
		this.itIcone.fromService({ 
			rootUrl: Underas.getLocation()
			,url: "assets/icons.json"
		});
		this._items = new ItemMenu(this);
		this.getModView().append(this._items);
	}
	onChangeItem(p_obj:IMenu):IMenu{
		this._items.getMainList().setDataProvider(p_obj.children);
		return p_obj;
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this._idPerfil) {
			return null;
		};
		p_req_obj.url="perfil/menu/"+ this._idPerfil;
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IMenu): IDefaultRequest{
		if (!this._idPerfil) {
			return null;
		};
		p_req_new_obj.url="perfil/menu/"+ this._idPerfil;
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IMenu): IDefaultRequest{
		if (!this._idPerfil) {
			return null;
		};
		p_req_delete.url="perfil/menu/"+ this._idPerfil + "," + p_old_obj._id;
		return p_req_delete;
	}
}