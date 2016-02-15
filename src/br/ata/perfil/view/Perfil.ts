import {ModWindow,WebContainer} from "lib/underas/container";
import {TextInput, CheckBox, ListView} from "lib/underas/controller";
import {ToolBar,RequestManager} from "lib/underas/net";
import {Menu} from "./Menu";
import {IPerfil} from "../model/IPerfil";

@WebContainer({
	itemViewResource: "assets/html/perfil"
})
export class Perfil extends ModWindow{
	itIdPerfil:TextInput;	 
	itNome:TextInput;	 
	itComentario:TextInput;
	itSnAtivo:CheckBox;	 
	mainTb:ToolBar;
	mainList:ListView<IPerfil>;
	_menus: Menu;
	constructor(){
		super("Perfil");			
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
		
		this.mainList = new ListView<IPerfil>("Perfil");
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