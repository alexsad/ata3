import {Box} from "lib/underas/container";
import {Atividade} from "./Atividade";
import {TrimestreViewForm} from "./TrimestreViewForm";
import {ITrimestre} from "../model/ITrimestre";
import PerfilBox = require("../../perfil/view/PerfilBox");

export class Usuario extends Box {
	private trimestreViewForm: TrimestreViewForm;
	private atividadeForm: Atividade;
	constructor() {
		super();
		this.trimestreViewForm = new TrimestreViewForm();
		this.append(this.trimestreViewForm);

		this.atividadeForm = new Atividade();
		this.append(this.atividadeForm);
	}
	onStart(): void {
		this.trimestreViewForm.onStart();
		this.trimestreViewForm.addEvent(
			TrimestreViewForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: ITrimestre,saldo:number) => this.atividadeForm.getByIdTrimestreIdPerfil(id, PerfilBox.getIdPerfil(),saldo)
		);
		this.atividadeForm.onStart();
	}
}