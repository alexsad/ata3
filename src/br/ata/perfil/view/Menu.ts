import {ModWindow} from "lib/underas/container";
import {ItemView,NumericStepper,TextInput,Select,ListView} from "lib/underas/controller";
import {ToolBar,IDefaultRequest,RequestManager} from "lib/underas/net";
import {Underas} from "lib/underas/core";
import {IMenu} from "../model/IPerfil";
import {ItemMenu} from "./ItemMenu";

@ItemView("assets/html/menu.html")
export class Menu extends ModWindow{
	itIdMenu: TextInput;
	itIdPerfil: TextInput;
	itLabel: TextInput;
	itIcone: Select;
	itOrdem: NumericStepper;
	mainTb:ToolBar;
	mainList:ListView;
	_items: ItemMenu;
	constructor(){
		super("Menus do Perfil");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"menu"});
		this.append(this.mainTb);

		this.itIdMenu = new TextInput("");
		this.itIdMenu.setColumn("$id");
		this.itIdMenu.setLabel("cod.");
		this.itIdMenu.setEnable(false);
		this.itIdMenu.setSize(2);
		this.append(this.itIdMenu);

		this.itIdPerfil = new TextInput("");
		this.itIdPerfil.setColumn("!idPerfil");
		this.itIdPerfil.setLabel("perf.");
		this.itIdPerfil.setEnable(false);
		this.itIdPerfil.setSize(2);
		this.append(this.itIdPerfil);

		this.itLabel = new TextInput("");
		this.itLabel.setColumn("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(8);
		this.append(this.itLabel);

		this.itIcone = new Select("icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(7);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itOrdem = new NumericStepper(0);
		this.itOrdem.setColumn("@ordem");
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setSize(5);
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setEnable(false,2);
		this.append(this.itOrdem);



		this.mainList = new ListView("Menu");
		this.append(this.mainList);
	}
	onStart():void{
		this._items = new ItemMenu(this);
		this.getModView().append(this._items);
		this.itIcone.fromService({
			rootUrl: Underas.getLocation()
			,url: "assets/icons.json"
		});
	}
	getByIdPerfil(p_idPerfil:number):void{
		this.itIdPerfil.setValue(p_idPerfil+"");
		this._items.mainList.setDataProvider([]);
		RequestManager.addRequest({
			"url":"menu/getbyidperfil/"+p_idPerfil
			,"onLoad":function(dta:IMenu[]){
				this.mainList.setDataProvider(dta);

			}.bind(this)
		});
	}
	onChangeItem(p_obj:IMenu):IMenu{
		this._items.getByIdMenu(p_obj.id);
		return p_obj;
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IMenu): IDefaultRequest{
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IMenu): IDefaultRequest{
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_delete;
	}
}
