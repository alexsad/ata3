import {Box} from "lib/underas/container";
import {Membro} from "./Membro";
import {OrganizacaoForm} from "./OrganizacaoForm";
import {IOrganizacao} from "../model/IOrganizacao";

export class Organizacao extends Box{
	private organizacaoForm: OrganizacaoForm;
	private membroForm: Membro;
	constructor(){
		super();
		this.organizacaoForm = new OrganizacaoForm();
		this.append(this.organizacaoForm);

		this.membroForm = new Membro();
		this.append(this.membroForm);
	}
	onStart():void{
		this.organizacaoForm.onStart();
		this.organizacaoForm.addEvent(
			OrganizacaoForm.EVENT_ITEM_CHANGE
			, (evt: Event, {id}: IOrganizacao) => this.membroForm.getByIdOrganizacao(id)
		)
	}
}