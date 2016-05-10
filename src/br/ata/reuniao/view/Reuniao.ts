import {Box} from "lib/underas/container";
import {ReuniaoForm} from "./ReuniaoForm";
import {Discursante} from "./Discursante";
import {IReuniao} from "../model/IReuniao";

export class Reuniao extends Box {
	private reuniaoForm: ReuniaoForm;
	private discursanteForm: Discursante;
	constructor() {
		super();
		this.reuniaoForm = new ReuniaoForm();
		this.append(this.reuniaoForm);

		this.discursanteForm = new Discursante();
		this.append(this.discursanteForm);
	}
	onStart(): void {
		this.reuniaoForm.onStart();
		this.reuniaoForm.addEvent(
			ReuniaoForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IReuniao) => this.discursanteForm.getByIdReuniao(id)
		);
		this.discursanteForm.onStart();
	}
}