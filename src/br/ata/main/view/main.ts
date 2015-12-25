import {Underas} from "lib/underas/core";
import {ModView} from "lib/underas/container";
import {RequestManager} from "lib/underas/net";
import {Login} from "../../usuario/view/Login";


var tmpLocation:string = Underas.getLocation();
//console.log(tmpLocation);
//tmpLocation = tmpLocation.replace("8080","8330");
//tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8299"))+"8330/";
tmpLocation = tmpLocation.substring(0, tmpLocation.indexOf("8330")) + "8299/";
RequestManager.setRootUrl(tmpLocation);


var teste: Login = new Login();
var mdw: ModView = new ModView("cadastro de teste!!!");
mdw.getEle().addClass("mdwLogin");
mdw.setIcon("key");
mdw.show(true);
mdw.append(teste);

/*
var mdw: ModView = new ModView("cadastro de teste!!!");
mdw.getEle().addClass("mdwLogin");
mdw.setIcon("key");
mdw.show(true);
//mdw.append(teste);
*/


