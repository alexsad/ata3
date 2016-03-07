import {System} from "lib/underas/core";
import {ModView} from "lib/underas/container";
import {$http} from "lib/underas/http";
import Login =require("../../usuario/view/Login");

$http.rootUrl= System.getDomain()+":8330/";

var mdw: ModView = new ModView("cadastro de teste!!!");
mdw.$.addClass("mdwLogin");
mdw.setIcon("key");
mdw.show(true);
mdw.append(Login);
Login.autoLogin();
/*
var mdw: ModView = new ModView("cadastro de teste!!!");
mdw.$.addClass("mdwLogin");
mdw.setIcon("key");
mdw.show(true);
//mdw.append(teste);
*/