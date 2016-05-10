import {TextInput, CheckBox} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {IPerfil} from "../model/IPerfil";

export class PerfilForm extends CRUDForm<IPerfil>{
	itIdPerfil:TextInput;	 
	itNome:TextInput;	 
	itComentario:TextInput;
	itSnAtivo:CheckBox;	 
	constructor(){
		super({ "domain": "perfil" });			
		this.setSize(4);

		this.buildToolBar();

		this.itIdPerfil = new TextInput("");
		this.itIdPerfil.setName("$id");
		this.itIdPerfil.setLabel("cod.");
		this.itIdPerfil.setEnable(false);	
		this.itIdPerfil.setSize(4);	
		this.append(this.itIdPerfil);

		this.itNome = new TextInput("");
		this.itNome.setName("@descricao");
		this.itNome.setLabel("descricao");
		this.itNome.setSize(8);	
		this.append(this.itNome);

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setName("@snAtivo");
		this.itSnAtivo.setSize(12);
		this.append(this.itSnAtivo);

		this.itComentario = new TextInput("");
		this.itComentario.setName("@comentario");
		this.itComentario.setLabel("comentario");
		this.itComentario.setSize(12);	
		this.append(this.itComentario);	
		
		this.buildTileList({ itemViewResource: "perfil/view/assets/html/perfil" });
	}
	onStart():void{
		this.reloadItens();
	}
}