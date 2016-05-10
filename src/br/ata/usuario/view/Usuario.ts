import {Box} from "lib/underas/container";
import {UsuarioForm} from "./UsuarioForm";
import {UsuarioPerfil} from "./UsuarioPerfil";
import {IUsuario} from "../model/IUsuario";

export class Usuario extends Box {
	private usuarioForm: UsuarioForm;
	private usuarioPerfilForm: UsuarioPerfil;
	constructor() {
		super();
		this.usuarioForm = new UsuarioForm();
		this.append(this.usuarioForm);

		this.usuarioPerfilForm = new UsuarioPerfil();
		this.append(this.usuarioPerfilForm);
	}
	onStart(): void {
		this.usuarioForm.onStart();
		this.usuarioForm.addEvent(
			UsuarioForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IUsuario) => this.usuarioPerfilForm.getByIdUsuario(id)
		);
		this.usuarioPerfilForm.onStart();
	}
}