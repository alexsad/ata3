import {Box} from "lib/underas/container";
import {IPerfil} from "../model/IPerfil";
import {PerfilViewForm} from "./PerfilViewForm";
import {PerfilAutorizacao} from "./PerfilAutorizacao";

export class PerfilView extends Box {
	private perfilViewForm: PerfilViewForm;
	private perfilAutorizacao: PerfilAutorizacao;
	constructor() {
		super();
		this.perfilViewForm = new PerfilViewForm();
		this.append(this.perfilViewForm);

		this.perfilAutorizacao = new PerfilAutorizacao();
		this.append(this.perfilAutorizacao);
		this.perfilAutorizacao.aviso.setText("Lista de perfis que o perfil selecionado pode aprovar ou liberar as atividades!");

	}
	onStart(): void {
		this.perfilViewForm.onStart();
		this.perfilViewForm.addEvent(
			PerfilViewForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IPerfil) => this.perfilAutorizacao.getByIdPerfil(id)
		);
		this.perfilAutorizacao.onStart();
	}
}