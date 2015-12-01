import {Underas} from "../../../../lib/underas/core";
import {ModView} from "../../../../lib/underas/container";
import {RequestManager} from "../../../../lib/underas/net";
import {Login} from "../../usuario/view/Login";
import {ReuniaoPorPeriodo} from "../../reuniao/view/ReuniaoPorPeriodo";
//import {AtividadeAutorizacao} from "../../trimestre/view/AtividadeAutorizacao";


class Main{
	initApp():void{
		var tmpLocation:string = Underas.getLocation();
		//tmpLocation = tmpLocation.replace("8080","8330");
		//tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8299"))+"8330/";
		tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("8330")) + "8299/";

		RequestManager.setRootUrl(tmpLocation);
		//console.log(m);
		//var t = new sub.SubB(45);
		//t.doAnyThing("nova instancia!!!!");
		//$("body").append("<div>!teste</div>");
		var teste:ReuniaoPorPeriodo = new ReuniaoPorPeriodo();
		var mdw: ModView = new ModView("cadastro de teste!!!");
		mdw.getEle().addClass("mdwLogin");
		mdw.setIcon("key");
		mdw.show(true);
		mdw.append(teste);
	}

}

var mainTmp: Main = new Main();
export = mainTmp;
