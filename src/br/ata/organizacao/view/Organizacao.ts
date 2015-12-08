import {ModWindow} from "../../../../lib/underas/container";
import {TextInput,DatePicker,ListView,ItemView} from "../../../../lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {IOrganizacao} from "../model/IOrganizacao";
import {Membro} from "./Membro";


@ItemView("assets/html/organizacao.html")
export class Organizacao extends ModWindow{
	itIdOrganizacao:TextInput;
	itDescricao:TextInput;
	mainList:ListView;
	mainTb:ToolBar;
	_modMembro:Membro;
	constructor(){
		super("Organizacoes");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"organizacao"});
		this.append(this.mainTb);

		this.itIdOrganizacao = new TextInput("");
		this.itIdOrganizacao.setColumn("$id");
		this.itIdOrganizacao.setLabel("cod.");
		this.itIdOrganizacao.setEnable(false);
		this.itIdOrganizacao.setSize(4);
		this.append(this.itIdOrganizacao);

		this.itDescricao = new TextInput("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(8);
		this.append(this.itDescricao);

		this.mainList = new ListView("Organizacao");
		this.append(this.mainList);
		//this.addAssociation({"mod":"br.net.atasacramental.organizacao.view.OrganizacaoLancamento","act":"getByIdOrganizacao","puid":this.getVarModule()});
	}
	onStart():void{
		this._modMembro = new Membro();
		this.getModView().append(this._modMembro);
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj: IOrganizacao): IOrganizacao {
		//this._modMembro.mainList.setDataProvider(p_obj.membro);
		this._modMembro.getByIdOrganizacao(p_obj.id);
		return p_obj;
	}
}
