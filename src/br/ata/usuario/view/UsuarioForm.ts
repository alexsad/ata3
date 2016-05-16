import {StyleResource} from "lib/underas/container";
import {EViewSize} from "lib/underas/component";
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
		this.setSize(7, EViewSize.EXTRA_SMALL);		

		this.buildToolBar();

		this.itIdUsuario = new TextInput("");
		this.itIdUsuario.setName("$id");
		this.itIdUsuario.setLabel("cod.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(2);
		this.itIdUsuario.setSize(3, EViewSize.EXTRA_SMALL);
		this.append(this.itIdUsuario);

		this.itLogin = new EmailInput("");
		this.itLogin.setName("@login");
		this.itLogin.setLabel("email");
		this.itLogin.setSize(5);
		this.itLogin.setSize(9, EViewSize.EXTRA_SMALL);
		this.append(this.itLogin);

		this.itSenha = new PassWordInput("");
		this.itSenha.setName("@senha");
		this.itSenha.setLabel("senha");
		this.itSenha.setSize(3);
		this.itSenha.setSize(7, EViewSize.EXTRA_SMALL);
		this.append(this.itSenha);        

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setName("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.itSnAtivo.setSize(5,EViewSize.EXTRA_SMALL);
		this.append(this.itSnAtivo);

		this.buildTileList({ itemViewResource: "usuario/view/assets/html/usuario" });
	}
	onStart():void{
		this.reloadItens();
	}
}
