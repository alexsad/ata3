import {Form} from "lib/underas/container";
import {$http, IRequestConfig} from "lib/underas/http";
import {IAtividade} from "../model/ITrimestre";
import {AtividadePorTrimestreList} from "./AtividadePorTrimestreList"

export class AtividadePorTrimestre extends Form {
	private atividadelist: AtividadePorTrimestreList;
	constructor() {
		super();
		this.setSize(12);

		this.atividadelist = new AtividadePorTrimestreList();
		this.append(this.atividadelist);
	}
	setIdTrimestre(p_idTrimestre:number):void{
		$http
			.get("atividade/getaprovadaseliberadasbyidtrimestre/" + p_idTrimestre)
			.done((dta: IAtividade[]) => this.atividadelist.atividades = dta);
	}
}