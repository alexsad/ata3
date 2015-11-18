import {Underas} from "../../../../lib/underas/core";
import {ModView} from "../../../../lib/underas/container";
import {RequestManager} from "../../../../lib/underas/net";
import {Login} from "../../usuario/view/Login";


class Main{
	initApp():void{
		var tmpLocation:string = Underas.getLocation();
		//tmpLocation = tmpLocation.replace("8080","8330");
		tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8299"))+"8330/";
		//tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("8080")) + "8330/";

		RequestManager.setRootUrl(tmpLocation);
		//console.log(m);
		//var t = new sub.SubB(45);
		//t.doAnyThing("nova instancia!!!!");
		//$("body").append("<div>!teste</div>");
		var teste:Login = new Login();
		var mdw: ModView = new ModView("cadastro de teste!!!");
		mdw.getEle().addClass("mdwLogin");
		mdw.setIcon("key");
		mdw.show(true);
		mdw.append(teste);
	}

}

var mainTmp: Main = new Main();
export = mainTmp;
