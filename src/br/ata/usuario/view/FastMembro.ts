import {IUsuario} from "../model/IUsuario";
import {ModWindow} from "../../../../lib/container";
import {ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "../../../../lib/net";
import {UsuarioPerfil} from "./UsuarioPerfil";


@ItemView({url:"js/br/ata/usuario/view/assets/html/discursante.html","list":"mainList"})
export class FastMembro extends ModWindow{
	mainList:ListView;
	constructor(){		
		super("Lista de Discursantes","br.ata.usuario.view.FastMembro");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);
		this.mainList = new ListView("discursantes");
		this.append(this.mainList);
	}
	onStart(){
		this.getMembros();
		this.getMainList().setDataProvider([]);
	}
	getMembros():void{
		RequestManager.addRequest({
	        "url":"usuario/getbysnativos/S"
	        ,"module":this
	        ,"onLoad":function(dta:IUsuario[]){        	
	        	this.getMainList().setDataProvider(dta);
	        	this.getMainList().getEle(".tilecell .discursante_drag").draggable({
        			helper : "clone"
     			});
	        }.bind(this)
	    });   
	}
}