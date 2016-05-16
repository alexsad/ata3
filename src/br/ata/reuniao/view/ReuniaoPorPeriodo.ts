import {Box} from "lib/underas/container";
import {ReuniaoForm} from "./ReuniaoForm";
import {Discursante} from "./Discursante";
import {IReuniao} from "../model/IReuniao";
import {ReuniaoPorPeriodoForm} from "./ReuniaoPorPeriodoForm";
//import {FastMembro} from "../../organizacao/view/FastMembro";

export class ReuniaoPorPeriodo extends Box {
	private reuniaoPorPeriodoForm: ReuniaoPorPeriodoForm;
	//private fastMembro: FastMembro;
	constructor(){
		super();
		this.reuniaoPorPeriodoForm = new ReuniaoPorPeriodoForm();
		this.append(this.reuniaoPorPeriodoForm);

		//this.fastMembro = new FastMembro();
		//this.append(this.fastMembro);
	}
	onStart(): void {
		this.reuniaoPorPeriodoForm.onStart();
		//this.fastMembro.onStart();
	}
}