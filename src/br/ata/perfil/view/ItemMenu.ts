import {ModWindow, WebContainer} from "lib/underas/container";
import {NumericStepper, TextInput, Select} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar} from "lib/underas/net";
import {IRequestConfig, $http} from "lib/underas/http";
import {System} from "lib/underas/core";
import {IItemMenu, IModulo} from "../model/IPerfil";
import {Menu} from "./Menu";

@WebContainer({
	itemViewResource: "perfil/view/assets/html/itemmenu"
})
export class ItemMenu extends ModWindow {
	itIdItemMenu: TextInput;
	itIdMenu: TextInput;
	itLabel: TextInput;
	itFuncao: Select;
	itTela: Select;
	itIcone: Select;
	itOrdem: NumericStepper;
	mainTb: ToolBar;
	mainList: ListView<IItemMenu>;
	_menu: Menu;
	constructor(p_menu: Menu) {
		super("Itens do Menu");
		this.setSize(5);

		this.mainTb = new ToolBar({ "domain": "itemmenu" });
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
		this.itTela.getInput().on("change", this.getAcoes.bind(this));
		this.append(this.itTela);


		this.itIcone = new Select("selecione um icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(4);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itOrdem = new NumericStepper(5);
		this.itOrdem.setEnable(false, 2);
		this.itOrdem.setSize(3);
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setColumn("@ordem");
		this.append(this.itOrdem);

		this.itFuncao = new Select("acao do modulo:");
		this.itFuncao.setColumn("#funcao");
		this.itFuncao.setLabel("acao");
		this.itFuncao.setSize(12);
		this.itFuncao.setValueField("comando");
		this.itFuncao.setLabelField("descricao");
		this.itFuncao.setEnable(false);
		this.append(this.itFuncao);

		this.mainList = new ListView<IItemMenu>("ItemMenu");
		this.append(this.mainList);

		this._menu = p_menu;
	}
	onStart(): void {
		var tmpUrl: string = System.getLocation();
		this.itIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev="+ System.getProjectVersion()
		});
		this.itTela.fromService({
			rootUrl: tmpUrl
			, url: "assets/modulo.json?rev="+ System.getProjectVersion()
		});
	}
	private onReceiveAcoes(dta: IModulo[]): void {
		var tmpIdModule: string = this.itTela.getValue();
		dta.every(function(itmod: IModulo, index: number): boolean {
			if (itmod.modulo == tmpIdModule) {
				if (itmod.acao.length > 0) {
					this.itFuncao.setEnable(true);
					this.itFuncao.setDataProvider(itmod.acao);
				};
				return false;
			};
			return true;
		}.bind(this));
	}
	getAcoes(evt: Event): void {
		//evt.preventDefault();
		this.itFuncao.setEnable(false);
		this.itFuncao.setDataProvider([]);
		this.itFuncao.setValue("");
		$http
			.get("assets/modulo.json?rev=" + this.getRevision(), {
				rootUrl:System.getLocation()				
			})
			.done((dta: IModulo[]) => this.onReceiveAcoes(dta));
	}
	getByIdMenu(p_idMenu: number): void {
		this.itIdMenu.setValue(p_idMenu + "");
		$http
			.get("itemmenu/getbyidmenu/" + p_idMenu)
			.done((dta: IItemMenu[]) => this.mainList.setDataProvider(dta));
	}
	beforeInsert(p_req_obj: IRequestConfig): IRequestConfig {
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IRequestConfig, p_old_obj: IItemMenu): IRequestConfig {
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IRequestConfig, p_old_obj: IItemMenu): IRequestConfig {
		if (!this.itIdMenu.getValue()) {
			return null;
		};
		return p_req_delete;
	}
}