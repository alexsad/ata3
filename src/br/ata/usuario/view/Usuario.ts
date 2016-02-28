import {ModWindow, WebContainer} from "lib/underas/container";
import {TextInput,CheckBox,TextArea,Select,PassWordInput,EmailInput} from "lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import {ListView} from "lib/underas/listview";
import {UsuarioPerfil} from "./UsuarioPerfil";
import {IUsuario} from "../model/IUsuario";

@WebContainer({
	itemViewResource: "usuario/view/assets/html/usuario"
})
export class Usuario extends ModWindow{
	itIdUsuario:TextInput;
	itLogin:EmailInput;
	itSenha:PassWordInput;
	itSnAtivo:CheckBox;
	mainTb:ToolBar;
	mainList:ListView<IUsuario>;
	_modPerfis: UsuarioPerfil;
    

	constructor(){
	 	super("*Cadastro de usuarios.");
		this.setSize(8);
		this.showTitle(false);

		this.mainTb = new ToolBar({"domain":"usuario"});
		this.append(this.mainTb);

		this.itIdUsuario = new TextInput("");
		this.itIdUsuario.setColumn("$id");
		this.itIdUsuario.setLabel("cod.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(2);
		this.append(this.itIdUsuario);

		this.itLogin = new EmailInput("");
		this.itLogin.setColumn("@login");
		this.itLogin.setLabel("email");
		this.itLogin.setSize(5);
		this.append(this.itLogin);

		this.itSenha = new PassWordInput("");
		this.itSenha.setColumn("@senha");
		this.itSenha.setLabel("senha");
		this.itSenha.setSize(3);
		this.append(this.itSenha);        

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setColumn("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.append(this.itSnAtivo);

		this.mainList = new ListView<IUsuario>("Usuario");
		this.append(this.mainList);
	}
	onStart():void{
		this._modPerfis = new UsuarioPerfil();
		this.getModView().append(this._modPerfis);
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj:IUsuario):IUsuario{
		this._modPerfis.getByIdUsuario(p_obj.id);
		return p_obj;
	}
}
