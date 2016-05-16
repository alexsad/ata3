import {Render,ICustomComponent} from "lib/underas/core";
import {IAtividade} from "../model/ITrimestre";

@Render({templateResource:"trimestre/view/assets/html/atividadeportrimestre"})
export class AtividadePorTrimestreList implements ICustomComponent{
	atividades: IAtividade[];
	constructor(){
		this.atividades = [];
	}
	onRender(p_target:string):void{}
}