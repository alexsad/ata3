import {ModWindow} from "../../../../lib/underas/container";
import {ListView,ItemView} from "../../../../lib/underas/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "../../../../lib/underas/net";
import {IMembro} from "../model/IMembro";

@ItemView("assets/html/discursante.html")
export class FastMembro extends ModWindow{
	mainList:ListView;
	constructor(){		
		super("Lista de Discursantes");
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
			"url": "membro/getbysnativo/S"
	        ,"onLoad":function(dta:IMembro[]){        	
	        	this.getMainList().setDataProvider(dta);
	        	this.getMainList().getEle(".tilecell .discursante_drag").draggable({
        			helper : "clone"
     			});
	        }.bind(this)
	    });   
	}
}