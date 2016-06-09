import {IconPickerInput,NumericStepper, TextInput, Select} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {IRequestConfig, $http} from "lib/underas/http";
import {SystemApplication,EventEmitter} from "lib/underas/core";
import {IItemMenu, IModulo} from "../model/IPerfil";

export class ItemMenu extends CRUDForm<IItemMenu>{
	private itIdItemMenu: TextInput;
	private itIdMenu: TextInput;
	private itLabel: TextInput;
	private itFuncao: Select;
	private itTela: Select;
	private itIcone: IconPickerInput;
	private itOrdem: NumericStepper;
	constructor() {
		super({ "domain": "itemmenu" });
		this.setSize(3);
		
		this.buildToolBar();

		this.itIdItemMenu = new TextInput("");
		this.itIdItemMenu.setName("$id");
		this.itIdItemMenu.setLabel("cod.");
		this.itIdItemMenu.setEnable(false);
		this.itIdItemMenu.setSize(6);
		this.append(this.itIdItemMenu);

		this.itIdMenu = new TextInput("");
		this.itIdMenu.setName("!idMenu");
		this.itIdMenu.setLabel("menu");
		this.itIdMenu.setEnable(false);
		this.itIdMenu.setSize(6);
		this.append(this.itIdMenu);

		this.itLabel = new TextInput("");
		this.itLabel.setName("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(12);
		this.append(this.itLabel);

		this.itIcone = new IconPickerInput();
		this.itIcone.setLabel("icone");
		this.itIcone.setName("@icone");
		this.itIcone.setSize(3);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itTela = new Select("selecione uma tela");
		this.itTela.setLabel("tela");
		this.itTela.setName("@tela");
		this.itTela.setSize(9);
		this.itTela.setValueField("modulo");
		this.itTela.setLabelField("descricao");
		this.itTela.getInput().on("change", this.getAcoes.bind(this));
		this.append(this.itTela);


		this.itOrdem = new NumericStepper(5);
		this.itOrdem.setEnable(false, 2);
		this.itOrdem.setSize(4);
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setName("@ordem");
		this.append(this.itOrdem);

		this.itFuncao = new Select("acao do modulo:");
		this.itFuncao.setName("#funcao");
		this.itFuncao.setLabel("acao");
		this.itFuncao.setSize(8);
		this.itFuncao.setValueField("comando");
		this.itFuncao.setLabelField("descricao");
		this.itFuncao.setEnable(false);
		this.append(this.itFuncao);

		this.buildTileList({ itemViewResource: "perfil/view/assets/html/itemmenu" });
	}
	onStart(): void {
		var tmpUrl: string = SystemApplication.getLocation();
		this.itIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev="+ SystemApplication.getProjectVersion()
		});
		this.itTela.fromService({
			rootUrl: tmpUrl
			, url: "assets/modulo.json?rev="+ SystemApplication.getProjectVersion()
		});
		this.onBeforeInsert.subscribe(() => this.check(this.onBeforeInsert));
		this.onBeforeUpdate.subscribe(() => this.check(this.onBeforeUpdate));
		this.onBeforeDelete.subscribe(() => this.check(this.onBeforeDelete));
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
			.get("assets/modulo.json?rev=" + SystemApplication.getProjectVersion(), {
				rootUrl:SystemApplication.getLocation()				
			})
			.done((dta: IModulo[]) => this.onReceiveAcoes(dta));
	}
	getByIdMenu(p_idMenu: number): void {
		this.itIdMenu.setValue(p_idMenu + "");
		$http
			.get("itemmenu/getbyidmenu/" + p_idMenu)
			.done((dta: IItemMenu[]) => this.mainList.setDataProvider(dta));
	}
	private check(evt: EventEmitter<IRequestConfig>): void {
		if (!this.itIdMenu.getValue()) {
			evt.cancel();
		};
	}
}