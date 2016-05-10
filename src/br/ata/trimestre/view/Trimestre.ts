import {Box} from "lib/underas/container";
import {TrimestreForm} from "./TrimestreForm";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import {TrimestreDataLivre} from "./TrimestreDataLivre";
import {ITrimestre} from "../model/ITrimestre";

export class Trimestre extends Box {
	private trimestreForm: TrimestreForm;
	private trimestreLancamentoAtividadeForm: TrimestreLancamentoAtividade;
	private trimestreDataLivreForm: TrimestreDataLivre;
	constructor() {
		super();
		this.trimestreForm = new TrimestreForm();
		this.append(this.trimestreForm);

		this.trimestreLancamentoAtividadeForm = new TrimestreLancamentoAtividade();
		this.append(this.trimestreLancamentoAtividadeForm);

		this.trimestreDataLivreForm = new TrimestreDataLivre();
		this.append(this.trimestreDataLivreForm);
	}
	onStart(): void {
		this.trimestreForm.onStart();
		this.trimestreForm.addEvent(
			TrimestreForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: ITrimestre) => {
				this.trimestreLancamentoAtividadeForm.getByIdTrimestre(id);
				this.trimestreDataLivreForm.getByIdTrimestre(id)
			}
		);
		this.trimestreLancamentoAtividadeForm.onStart();
		this.trimestreDataLivreForm.onStart();
	}
}