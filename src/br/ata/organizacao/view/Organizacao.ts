import {IOrganizacao} from "../model/IOrganizacao";
import {ModWindow} from "../../../../lib/container";
import {InputText,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";
import {OrganizacaoPerfil, EOrganizacaoPerfilTP} from "./OrganizacaoPerfil";

@ItemView({url:"js/br/ata/organizacao/view/assets/html/organizacao.html","list":"mainList"})
export class Organizacao extends ModWindow{
	itIdOrganizacao:InputText;
	itDescricao:InputText;
	mainList:ListView;
	mainTb:ToolBar;
	_modPerfilAprovacao: OrganizacaoPerfil;
	_modPerfilLiberacao: OrganizacaoPerfil;
	constructor(){
		super("Organizacoes","br.ata.organizacao.view.Organizacao");
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
		this._modPerfilAprovacao = new OrganizacaoPerfil(this, EOrganizacaoPerfilTP.APROVACAO);
		this._modPerfilAprovacao.setTitle("Apravacao");
		this._modPerfilAprovacao.aviso.setText("Lista de perfis que podem aprovar as atividades da organizacao selecionada!");
		this.getModView().append(this._modPerfilAprovacao);

		this._modPerfilLiberacao = new OrganizacaoPerfil(this, EOrganizacaoPerfilTP.LIBERACAO);
		this._modPerfilLiberacao.setTitle("Liberacao");
		this._modPerfilLiberacao.aviso.setText("Lista de perfis que podem liberar as atividades da organizacao selecionada!");
		this.getModView().append(this._modPerfilLiberacao);

		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj: IOrganizacao): IOrganizacao {
		this._modPerfilAprovacao.getPerfis();
		this._modPerfilLiberacao.getPerfis();
		return p_obj;
	}
	beforeUpdate(p_req: IDefaultRequest, p_old_obj: IOrganizacao) {
		if (p_old_obj.perfilAprovacao) {
			p_req.data["perfilAprovacao"] = [];
			p_req.data["perfilAprovacao"] = p_old_obj.perfilAprovacao;
		};
		if (p_old_obj.perfilLiberacao) {
			p_req.data["perfilLiberacao"] = [];
			p_req.data["perfilLiberacao"] = p_old_obj.perfilLiberacao;
		};
		return p_req;
	}

}
