import {Underas} from "lib/underas/core";
import {ModView} from "lib/underas/container";
import {RequestManager} from "lib/underas/net";
import {Login} from "../../usuario/view/Login";

RequestManager.setRootUrl(Underas.getDomain()+":8330/");


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


