import {IconPickerInput,NumericStepper,TextInput,Select} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {IRequestConfig,$http} from "lib/underas/http";
import {SystemApplication} from "lib/underas/core";
import {IMenu} from "../model/IPerfil";

export class Menu extends CRUDForm<IMenu>{
	itIdMenu: TextInput;
	itIdPerfil: TextInput;
	itLabel: TextInput;
	itIcone: IconPickerInput;
	itOrdem: NumericStepper;
	constructor(){
		super({ "domain": "menu" });		
		this.setSize(5);

		this.buildToolBar();

		this.itIdMenu = new TextInput("");
		this.itIdMenu.setName("$id");
		this.itIdMenu.setLabel("cod.");
		this.itIdMenu.setEnable(false);
		this.itIdMenu.setSize(2);
		this.append(this.itIdMenu);

		this.itIdPerfil = new TextInput("");
		this.itIdPerfil.setName("!idPerfil");
		this.itIdPerfil.setLabel("perf.");
		this.itIdPerfil.setEnable(false);
		this.itIdPerfil.setSize(1);
		this.append(this.itIdPerfil);

		this.itIcone = new IconPickerInput();
		this.itIcone.setLabel("icone");
		this.itIcone.setName("@icone");
		this.itIcone.setSize(2);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itLabel = new TextInput("");
		this.itLabel.setName("@label");
		this.itLabel.setLabel("label");
		this.itLabel.setSize(4);
		this.append(this.itLabel);

		this.itOrdem = new NumericStepper(0);
		this.itOrdem.setName("@ordem");
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setSize(3);
		this.itOrdem.setMin(1);
		this.itOrdem.setMax(100);
		this.itOrdem.setStep(1);
		this.itOrdem.setEnable(false,2);
		this.append(this.itOrdem);

		this.buildTileList({ itemViewResource: "perfil/view/assets/html/menu" });
	}
	onStart():void{
		this.itIcone.fromService({
			rootUrl: SystemApplication.getLocation()
			, url: "assets/icons.json?rev_" + SystemApplication.getProjectVersion()
		});
	}
	getByIdPerfil(p_idPerfil:number):void{
		this.itIdPerfil.setValue(p_idPerfil+"");
		$http
			.get("menu/getbyidperfil/" + p_idPerfil)
			.done((dta: IMenu[]) => this.mainList.setDataProvider(dta));
	}
	beforeInsert(evt:Event,p_req_obj: IRequestConfig):void{
		if (!this.itIdPerfil.getValue()) {
			evt.preventDefault();
		};
	}
	beforeUpdate(evt: Event,p_req_new_obj: IRequestConfig, p_old_obj: IMenu):void {
		if (!this.itIdPerfil.getValue()) {
			evt.preventDefault();
		};
	}
	beforeDelete(evt: Event, p_req_delete: IRequestConfig, p_old_obj: IMenu): void {
		if (!this.itIdPerfil.getValue()) {
			evt.preventDefault();
		};
	}
}
