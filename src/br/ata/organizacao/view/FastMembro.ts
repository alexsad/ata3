import {Form} from "lib/underas/container";
import {TileList} from "lib/underas/widget_mod/TileList";
import {$http,IRequestConfig} from "lib/underas/http";
import {IMembro} from "../model/IMembro";

export class FastMembro extends Form{
	mainList:TileList<IMembro>;
	constructor(){		
		super();		
		this.setSize(4);
				
		this.mainList = new TileList<IMembro>("discursantes");
		this.mainList.setItemViewResource("organizacao/view/assets/html/discursante");
		this.append(this.mainList);
	}
	onStart(){
		this.getMembros();
		this.mainList.setDataProvider([]);
	}
	getMembros():void{
		$http
			.get("membro/getbysnativo/S")
			.done((dta: IMembro[]) => this.mainList.setDataProvider(dta));  
	}
}