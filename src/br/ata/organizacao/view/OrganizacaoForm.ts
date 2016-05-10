import {CRUDForm} from "../../form/view/CRUDForm";
import {TextInput,DatePickerInput} from "lib/underas/input";
import {IOrganizacao} from "../model/IOrganizacao";

export class OrganizacaoForm extends CRUDForm<IOrganizacao>{
	itIdOrganizacao:TextInput;
	itDescricao:TextInput;
	constructor(){
		super({ "domain": "organizacao" });		
		this.setSize(4);
		
		this.buildToolBar();

		this.itIdOrganizacao = new TextInput("");
		this.itIdOrganizacao.setName("$id");
		this.itIdOrganizacao.setLabel("cod.");
		this.itIdOrganizacao.setEnable(false);
		this.itIdOrganizacao.setSize(4);
		this.append(this.itIdOrganizacao);

		this.itDescricao = new TextInput("");
		this.itDescricao.setName("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(8);
		this.append(this.itDescricao);

		this.buildTileList({ itemViewResource: "organizacao/view/assets/html/organizacao" });
	}
	onStart():void{
		this.reloadItens();
	}
}
