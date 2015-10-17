import {IOrganizacao} from "../model/IOrganizacao";
import {ModWindow} from "../../../../lib/container";
import {InputText,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";

@ItemView("assets/html/organizacao.html")
export class Organizacao extends ModWindow{
	itIdOrganizacao:InputText;
	itDescricao:InputText;
	mainList:ListView;
	mainTb:ToolBar;
	constructor(){
		super("Organizacoes");
		this.setRevision("$Revision: 138 $");
		this.setSize(6);

		this.mainTb = new ToolBar({"domain":"organizacao"});
		this.append(this.mainTb);

		this.itIdOrganizacao = new InputText("");
		this.itIdOrganizacao.setColumn("$_id");
		this.itIdOrganizacao.setLabel("cod.");
		this.itIdOrganizacao.setEnable(false);
		this.itIdOrganizacao.setSize(4);
		this.append(this.itIdOrganizacao);

		this.itDescricao = new InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(8);
		this.append(this.itDescricao);

		this.mainList = new ListView("Organizacao");
		this.append(this.mainList);
		//this.addAssociation({"mod":"br.net.atasacramental.organizacao.view.OrganizacaoLancamento","act":"getByIdOrganizacao","puid":this.getVarModule()});
	}
	onStart():void{
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj: IOrganizacao): IOrganizacao {
		return p_obj;
	}
	beforeUpdate(p_req: IDefaultRequest, p_old_obj: IOrganizacao) {
		return p_req;
	}

}
