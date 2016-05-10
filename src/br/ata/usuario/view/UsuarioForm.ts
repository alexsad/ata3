import {StyleResource} from "lib/underas/container";
import {TextInput,CheckBox,TextArea,Select,PassWordInput,EmailInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {UsuarioPerfil} from "./UsuarioPerfil";
import {IUsuario} from "../model/IUsuario";

@StyleResource("usuario/view/assets/css/usuario")
export class UsuarioForm extends CRUDForm<IUsuario>{
	itIdUsuario:TextInput;
	itLogin:EmailInput;
	itSenha:PassWordInput;
	itSnAtivo:CheckBox;
	constructor(){
		super({"domain": "usuario"});
		this.setSize(8);		

		this.buildToolBar();

		this.itIdUsuario = new TextInput("");
		this.itIdUsuario.setName("$id");
		this.itIdUsuario.setLabel("cod.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(2);
		this.append(this.itIdUsuario);

		this.itLogin = new EmailInput("");
		this.itLogin.setName("@login");
		this.itLogin.setLabel("email");
		this.itLogin.setSize(5);
		this.append(this.itLogin);

		this.itSenha = new PassWordInput("");
		this.itSenha.setName("@senha");
		this.itSenha.setLabel("senha");
		this.itSenha.setSize(3);
		this.append(this.itSenha);        

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setName("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.append(this.itSnAtivo);

		this.buildTileList({ itemViewResource: "usuario/view/assets/html/usuario" });
	}
	onStart():void{
		this.reloadItens();
	}
}
