import {ModWindow} from "lib/underas/container";
import {ItemView, TextInput, CheckBox, ListView} from "lib/underas/controller";
import {ToolBar,RequestManager} from "lib/underas/net";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";



@ItemView("assets/html/perfil.html")
export class Perfil extends ModWindow{
	itIdPerfil:TextInput;	 
	itNome:TextInput;	 
	itComentario:TextInput;
	itSnAtivo:CheckBox;	 
	mainTb:ToolBar;
	mainList:ListView;
	_menus: Menu;
	constructor(){
		super("Perfil");
		this.setRevision("$Revision: 138 $");	
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"perfil"});
		this.append(this.mainTb);

		this.itIdPerfil = new TextInput("");
		this.itIdPerfil.setColumn("$id");
		this.itIdPerfil.setLabel("cod.");
		this.itIdPerfil.setEnable(false);	
		this.itIdPerfil.setSize(4);	
		this.append(this.itIdPerfil);

		this.itNome = new TextInput("");
		this.itNome.setColumn("@descricao");
		this.itNome.setLabel("descricao");
		this.itNome.setSize(8);	
		this.append(this.itNome);

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setColumn("@snAtivo");
		this.itSnAtivo.setSize(12);
		this.append(this.itSnAtivo);

		this.itComentario = new TextInput("");
		this.itComentario.setColumn("@comentario");
		this.itComentario.setLabel("comentario");
		this.itComentario.setSize(12);	
		this.append(this.itComentario);	
		
		this.mainList = new ListView("Perfil");
		this.append(this.mainList);	
	}
	onStart():void{
		this._menus = new Menu();
		this.getModView().append(this._menus);
		this.mainTb.reloadItens();
	}
	onChangeItem(p_obj:IPerfil):IPerfil{
		this._menus.getByIdPerfil(p_obj.id);
		return p_obj;
	}
}