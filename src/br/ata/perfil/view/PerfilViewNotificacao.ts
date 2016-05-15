import {Box} from "lib/underas/container";
import {IPerfil} from "../model/IPerfil";
import {PerfilViewNotificacaoForm} from "./PerfilViewNotificacaoForm";
import {PerfilNotificacao} from "./PerfilNotificacao";


export class PerfilViewNotificacao extends Box{
	private perfilViewNotificacaoForm: PerfilViewNotificacaoForm;
	private perfilNotificacao: PerfilNotificacao;
	constructor() {
		super();
		this.perfilViewNotificacaoForm = new PerfilViewNotificacaoForm();
		this.append(this.perfilViewNotificacaoForm);

		this.perfilNotificacao = new PerfilNotificacao();
		this.append(this.perfilNotificacao);
	}
	onStart(): void {
		this.perfilViewNotificacaoForm.onStart();
		this.perfilViewNotificacaoForm.addEvent(
			PerfilViewNotificacaoForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IPerfil) => this.perfilNotificacao.getByIdPerfil(id)
		);
		this.perfilNotificacao.onStart();
	}
}