import {ModWindow,WebContainer,ETypeModWindow} from "lib/underas/container";
import {ListView} from "lib/underas/listview";
import {$http,IRequestConfig} from "lib/underas/http";
import {IMembro} from "../model/IMembro";

@WebContainer({
	itemViewResource: "organizacao/view/assets/html/discursante"
})
export class FastMembro extends ModWindow{
	mainList:ListView<IMembro>;
	constructor(){		
		super("Lista de Discursantes");		
		this.setSize(4);
		this.setType(ETypeModWindow.SUCCESS);
		this.mainList = new ListView<IMembro>("discursantes");
		this.append(this.mainList);
	}
	onStart(){
		this.getMembros();
		this.getMainList().setDataProvider([]);
	}
	getMembros():void{
		$http
			.get("membro/getbysnativo/S")
			.done((dta: IMembro[]) => this.mainList.setDataProvider(dta));  
	}
}