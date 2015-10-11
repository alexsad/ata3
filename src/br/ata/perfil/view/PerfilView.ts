import {ModWindow} from "../../../../lib/container";
import {ItemView, InputText, CheckBox, ListView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";
import {PerfilAutorizacao, EPerfilAutorizacaoTP} from "./PerfilAutorizacao";

@ItemView("assets/html/perfil.html")
export class PerfilView extends ModWindow {
	mainList: ListView;
	_modPerfilAprovacao: PerfilAutorizacao;
	_modPerfilLiberacao: PerfilAutorizacao;
	constructor() {
		super("Perfil", "br.ata.perfil.view.PerfilView");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainList = new ListView("Perfil");
		this.append(this.mainList);
	}
	onStart(): void {

		this._modPerfilAprovacao = new PerfilAutorizacao(this, EPerfilAutorizacaoTP.APROVACAO);
		this._modPerfilAprovacao.setTitle("Apravacao");
		this._modPerfilAprovacao.aviso.setText("Lista de perfis que podem aprovar as atividades do perfil selecionado!");
		this.getModView().append(this._modPerfilAprovacao);

		this._modPerfilLiberacao = new PerfilAutorizacao(this, EPerfilAutorizacaoTP.LIBERACAO);
		this._modPerfilLiberacao.setTitle("Liberacao");
		this._modPerfilLiberacao.aviso.setText("Lista de perfis que podem liberar as atividades do perfil selecionado!");
		this.getModView().append(this._modPerfilLiberacao);

		//this.mainTb.reloadItens();

		RequestManager.addRequest({
			"module":this
			,"url":"perfil/getAutorizacao"
			,"onLoad":function(dta:IPerfil[]):void{
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this._modPerfilAprovacao.getPerfis();
		this._modPerfilLiberacao.getPerfis();
		return p_obj;
	}
}
