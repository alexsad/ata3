import {ModWindow} from "lib/underas/container";
import {ItemView,NumericStepper,TextInput,Select,ListView} from "lib/underas/controller";
import {ToolBar,IDefaultRequest,RequestManager} from "lib/underas/net";
import {Underas} from "lib/underas/core";
import {IItemMenu,IMenu} from "../model/IPerfil";
import {Menu} from "./Menu";

@ItemView("assets/html/itemmenu.html")
export class ItemMenu extends ModWindow{
	itIdItemMenu:TextInput;
	itIdMenu: TextInput;
	itLabel:TextInput;
	itFuncao:TextInput;
	itTela:Select;
	itIcone:Select;
	itOrdem:NumericStepper;
	mainTb:ToolBar;
	mainList:ListView;
	_menu: Menu;
	constructor(p_menu:Menu){
		super("Itens do Menu");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"itemmenu"});
		this.append(this.mainTb);

		this.itIdItemMenu = new TextInput("");
		this.itIdItemMenu.setColumn("$id");
		this.itIdItemMenu.setLabel("cod.");
		this.itIdItemMenu.setEnable(false);
		this.itIdItemMenu.setSize(2);
		this.append(this.itIdItemMenu);

		this.itIdMenu = new TextInput("");
		this.itIdMenu.setColumn("!idMenu");
		this.itIdMenu.setLabel("menu");
		this.itIdMenu.setEnable(false);
		this.itIdMenu.setSize(2);
		this.append(this.itIdMenu);

		this.itLabel = new TextInput("");
		this.itLabel.setColumn("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(8);
		this.append(this.itLabel);

		this.itTela = new Select("selecione uma tela");
		this.itTela.setLabel("tela");
		this.itTela.setColumn("@tela");
		this.itTela.setSize(5);
		this.itTela.setValueField("modulo");
		this.itTela.setLabelField("descricao");
		this.append(this.itTela);


		this.itIcone = new Select("selecione um icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(4);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itOrdem = new NumericStepper(5);
		this.itOrdem.setEnable(false,2);
		this.itOrdem.setSize(3);
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setColumn("@ordem");
		this.append(this.itOrdem);

		this.itFuncao = new TextInput("");
		this.itFuncao.setColumn("#funcao");
		this.itFuncao.setLabel("funcao");
		this.itFuncao.setSize(12);
		this.append(this.itFuncao);

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
	getByIdMenu(p_idMenu: number): void {
		this.itIdMenu.setValue(p_idMenu+"");
		RequestManager.addRequest({
			"url": "itemmenu/getbyidmenu/" + p_idMenu
			, "onLoad": function(dta: IItemMenu[]) {
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IItemMenu): IDefaultRequest{
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IItemMenu): IDefaultRequest {
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_delete;
	}
}
