import {Tab} from "lib/underas/container";
import {LinkButton} from "lib/underas/button";
import {TrimestreForm} from "./TrimestreForm";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import {TrimestreDataLivre} from "./TrimestreDataLivre";
import {ITrimestre} from "../model/ITrimestre";

export class Trimestre extends Tab{
	private trimestreForm: TrimestreForm;
	private trimestreLancamentoAtividadeForm: TrimestreLancamentoAtividade;
	private trimestreDataLivreForm: TrimestreDataLivre;
	constructor() {
		super();
		this.setSize(12);
		
		this.trimestreForm = new TrimestreForm();

		this.append(new LinkButton("Trimestre"),this.trimestreForm);

		this.trimestreLancamentoAtividadeForm = new TrimestreLancamentoAtividade();
		this.append(new LinkButton("Lancamentos"), this.trimestreLancamentoAtividadeForm);

		this.trimestreDataLivreForm = new TrimestreDataLivre();
		this.append(new LinkButton("Datas Disponiveis"), this.trimestreDataLivreForm);
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
	}
}