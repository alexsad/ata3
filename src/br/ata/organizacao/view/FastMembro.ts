import {ModWindow,WebContainer} from "lib/underas/container";
import {ListView} from "lib/underas/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "lib/underas/net";
import {IMembro} from "../model/IMembro";

@WebContainer({
	itemViewResource: "assets/html/discursante"
})
export class FastMembro extends ModWindow{
	mainList:ListView;
	constructor(){		
		super("Lista de Discursantes");		
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
	        	this.getMainList().$.find(".tilecell .discursante_drag").draggable({
        			helper : "clone"
     			});
	        }.bind(this)
	    });   
	}
}