import {EBasicColorStatus} from "lib/underas/component";
import {TextInput, Select} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {Alert} from "lib/underas/widget";
import {$http, IRequestConfig} from "lib/underas/http";
import {IUsuarioPerfil} from "../model/IUsuario";
import {IPerfil} from "../../perfil/model/IPerfil";

export class UsuarioPerfil extends CRUDForm<IUsuarioPerfil>{
	itIdUsuarioPerfil: TextInput;
	itIdUsuario: TextInput;
	itPerfil:Select;
	aviso:Alert;
	constructor(){
		super({ "domain": "usuarioperfil" });		
		this.setSize(4);

		this.buildToolBar();

		this.aviso = new Alert("Cadastro");
		this.aviso.setColor(EBasicColorStatus.DANGER);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itIdUsuarioPerfil = new TextInput("");
		this.itIdUsuarioPerfil.setName("$id");
		this.itIdUsuarioPerfil.setLabel("cod.");
		this.itIdUsuarioPerfil.setEnable(false);
		this.itIdUsuarioPerfil.setSize(6);
		this.append(this.itIdUsuarioPerfil);

		this.itIdUsuario = new TextInput("");
		this.itIdUsuario.setName("!idUsuario");
		this.itIdUsuario.setLabel("usua.");
		this.itIdUsuario.setEnable(false);
		this.itIdUsuario.setSize(6);
		this.append(this.itIdUsuario);

		this.itPerfil = new Select("pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setValueField("id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setName("@idPerfil");
		this.itPerfil.setSize(12);
		this.append(this.itPerfil);

		this.buildTileList({ itemViewResource: "usuario/view/assets/html/usuarioperfil" });
	}
	onStart():void{
		this.itPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
		this.addEvent(CRUDForm.EVENT_AFTER_SAVE, (evt: Event, p_obj: IUsuarioPerfil) => this.afterSave(p_obj));
	}
	private afterSave(p_obj: IUsuarioPerfil):void {
		if(!p_obj.perfil){
			p_obj.perfil = <IPerfil>{};
		};
		p_obj.perfil.id = p_obj.idPerfil;
		p_obj.perfil.descricao = this.itPerfil.getText();
		p_obj.perfil.comentario = "";
		p_obj.perfil.snAtivo = "S";
	}
	getByIdUsuario(p_idUsuario:number):void{
		this.itIdUsuario.setValue(p_idUsuario + "");
		$http
			.get("usuarioperfil/getbyidusuario/" + p_idUsuario)
			.done((dta: IUsuarioPerfil[]) => this.mainList.setDataProvider(dta));
	}	
}
