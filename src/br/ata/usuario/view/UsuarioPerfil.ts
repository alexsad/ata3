import {ModWindow} from "lib/underas/container";
import {TextInput, AlertMsg, Select, ListView, ItemView} from "lib/underas/controller";
import {RequestManager, ToolBar, IDefaultRequest} from "lib/underas/net";
import {IUsuarioPerfil} from "../model/IUsuario";

@ItemView("assets/html/usuarioperfil.html")
export class UsuarioPerfil extends ModWindow{
	itIdUsuarioPerfil: TextInput;
	itIdUsuario: TextInput;
	itPerfil:Select;
	aviso:AlertMsg;
	mainList:ListView;
	mainTb: ToolBar;
	constructor(){
		super("*Perfis Associados");
		this.setRevision("$Revision: 1 $");
		this.setSize(4);

		this.mainTb = new ToolBar({ "domain": "usuarioperfil" });
		this.append(this.mainTb);

		this.aviso = new AlertMsg("Cadastro");
		this.aviso.setType(AlertMsg.TP_ERROR);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itIdUsuarioPerfil = new TextInput("");
		this.itIdUsuarioPerfil.setColumn("$id");
		this.itIdUsuarioPerfil.setLabel("cod.");
		this.itIdUsuarioPerfil.setEnable(false);
		this.itIdUsuarioPerfil.setSize(6);
		this.append(this.itIdUsuarioPerfil);

		this.itIdUsuario = new TextInput("");
		this.itIdUsuario.setColumn("!idUsuario");
		this.itIdUsuario.setLabel("usua.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(6);
		this.append(this.itIdUsuario);

		this.itPerfil = new Select("pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setValueField("id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setColumn("@idPerfil");
		this.itPerfil.setSize(12);
		this.append(this.itPerfil);


		this.mainList = new ListView("perfis");
		this.append(this.mainList);
	}
	onStart():void{
		this.itPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
	}

	getByIdUsuario(p_idUsuario:number):void{
		this.itIdUsuario.setValue(p_idUsuario + "");
		RequestManager.addRequest({
			url: "usuarioperfil/getbyidusuario/"+p_idUsuario
			,onLoad:function(dta:IUsuarioPerfil[]){
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	
}
