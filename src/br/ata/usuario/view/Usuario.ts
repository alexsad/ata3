import {IUsuario} from "../model/IUsuario";
import {ModWindow} from "../../../../lib/container";
import {InputText,CheckBox,TextArea,Select,InputPassWord,InputEmail,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "../../../../lib/net";
import {UsuarioPerfil} from "./UsuarioPerfil";

@ItemView("assets/html/usuario.html")
export class Usuario extends ModWindow{
	itIdUsuario:InputText;
	itNmMembro:InputText;
	itLogin:InputEmail;
	itSenha:InputPassWord;
	itIdOrganizacao:Select;
	itSnAtivo:CheckBox;
	itTelefone:InputText;
	itCelular:InputText;
	chSexo:CheckBox;
	taObs:TextArea;
	mainTb:ToolBar;
	mainList:ListView;
	_modPerfis: UsuarioPerfil;

	constructor(){
	 	super("*Cadastro de usuarios.");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"usuario"});
		this.append(this.mainTb);

		this.itIdUsuario = new InputText("");
		this.itIdUsuario.setColumn("$_id");
		this.itIdUsuario.setLabel("cod.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(2);
		this.append(this.itIdUsuario);

		this.itNmMembro = new InputText("");
		this.itNmMembro.setColumn("@nmMembro");
		this.itNmMembro.setLabel("Nome");
		this.itNmMembro.setSize(8);
		this.append(this.itNmMembro);

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setColumn("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.append(this.itSnAtivo);

		this.itIdOrganizacao = new Select("selecione uma organizacao");
		this.itIdOrganizacao.setColumn("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao");
		this.itIdOrganizacao.setValueField("_id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(12);
		this.append(this.itIdOrganizacao);

		this.itLogin = new InputEmail("");
		this.itLogin.setColumn("@login");
		this.itLogin.setLabel("email");
		this.itLogin.setSize(8);
		this.append(this.itLogin);



		this.itSenha = new InputPassWord("");
		this.itSenha.setColumn("@senha");
		this.itSenha.setLabel("senha");
		this.itSenha.setSize(4);
		this.append(this.itSenha);

		/*
		this.itIdMembro = new js.underas.controller.Select("selecione um membro");
		this.itIdMembro.setColumn("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("_id");
		this.itIdMembro.setLabelField("nome");
		this.itIdMembro.setSize(4);
		this.append(this.itIdMembro);
		*/
		/*
		this.itIdGrupo = new js.underas.controller.Select("selecione um grupo");
		this.itIdGrupo.setColumn("@idGrupo");
		this.itIdGrupo.setLabel("grupo");
		this.itIdGrupo.setValueField("_id");
		this.itIdGrupo.setLabelField("nome");
		this.itIdGrupo.setSize(4);
		this.append(this.itIdGrupo);
		*/
		this.chSexo = new CheckBox("sacerdocio:","S");
		this.chSexo.setCheckedValue("M");
		this.chSexo.setUnCheckedValue("F");
		this.chSexo.setColumn("@sexo");
		this.chSexo.setSize(4);
		this.append(this.chSexo);

		this.itTelefone = new InputText("");
		this.itTelefone.setLabel("telefone:");
		this.itTelefone.setMaxLength(14);
		this.itTelefone.setColumn("@telefone");
		this.itTelefone.setSize(4);
		this.append(this.itTelefone);

		this.itCelular = new InputText("");
		this.itCelular.setLabel("celular:");
		this.itCelular.setMaxLength(14);
		this.itCelular.setColumn("@celular");
		this.itCelular.setSize(4);
		this.append(this.itCelular);

		this.taObs = new TextArea("");
		this.taObs.setLabel("obs:");
		this.taObs.setMaxLength(124);
		this.taObs.setColumn("@obs");
		this.append(this.taObs);

		this.mainList = new ListView("Usuario");
		this.append(this.mainList);
	}
	onStart():void{
		this._modPerfis = new UsuarioPerfil(this);
		this.getModView().append(this._modPerfis);

		//this.itIdMembro.fromService("membro/membro/getativos");
		//this.itIdGrupo.fromService("grupo/grupo");
		this.mainTb.reloadItens();
		//this.mainTb.activate(true);
		this.itIdOrganizacao.fromService({
			"url":"organizacao"
		});


	}
	onChangeItem(p_obj:IUsuario):IUsuario{
		this._modPerfis.getPerfis();
		return p_obj;
	}
}
