import {Box} from "lib/underas/container";
import {PerfilForm} from "./PerfilForm";
import {Menu} from "./Menu";
import {IPerfil,IMenu} from "../model/IPerfil";
import {ItemMenu} from "./ItemMenu";

export class Perfil extends Box {
	private perfilForm: PerfilForm;
	private menuForm: Menu;
	private itemMenuForm: ItemMenu;
	constructor() {
		super();
		this.perfilForm = new PerfilForm();
		this.append(this.perfilForm);

		this.menuForm = new Menu();
		this.append(this.menuForm);

		this.itemMenuForm = new ItemMenu();
		this.append(this.itemMenuForm);

		
	}
	onStart(): void {
		this.perfilForm.onStart();
		this.perfilForm.addEvent(
			PerfilForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IPerfil) => this.menuForm.getByIdPerfil(id)
		);
		this.menuForm.onStart();
		this.menuForm.addEvent(
			Menu.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IMenu) => this.itemMenuForm.getByIdMenu(id)
		);
		this.itemMenuForm.onStart();
	}
}