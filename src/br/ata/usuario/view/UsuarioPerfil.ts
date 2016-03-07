import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, AlertMsg, Select} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar} from "lib/underas/net";
import {$http, IRequestConfig} from "lib/underas/http";
import {IUsuarioPerfil} from "../model/IUsuario";
import {IPerfil} from "../../perfil/model/IPerfil";

@WebContainer({
	itemViewResource: "usuario/view/assets/html/usuarioperfil"
})
export class UsuarioPerfil extends ModWindow{
	itIdUsuarioPerfil: TextInput;
	itIdUsuario: TextInput;
	itPerfil:Select;
	aviso:AlertMsg;
	mainList:ListView<IUsuarioPerfil>;
	mainTb: ToolBar;
	constructor(){
		super("*Perfis Associados");		
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


		this.mainList = new ListView<IUsuarioPerfil>("perfis");
		this.append(this.mainList);
	}
	onStart():void{
		this.itPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});	

	}
	afterSave(p_obj: IUsuarioPerfil): IUsuarioPerfil {
		if(!p_obj.perfil){
			p_obj.perfil = <IPerfil>{};
		};
		p_obj.perfil.id = p_obj.idPerfil;
		p_obj.perfil.descricao = this.itPerfil.getText();
		p_obj.perfil.comentario = "";
		p_obj.perfil.snAtivo = "S";
		return p_obj;
	}
	getByIdUsuario(p_idUsuario:number):void{
		this.itIdUsuario.setValue(p_idUsuario + "");
		$http
			.get("usuarioperfil/getbyidusuario/" + p_idUsuario)
			.done((dta: IUsuarioPerfil[]) => this.mainList.setDataProvider(dta));
	}
	
}
