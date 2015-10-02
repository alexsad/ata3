var DinRoute_1 = require("./DinRoute");
/*
export function Route(p_routeConfig:{"url":string,"verb":string}) {
        return function(target:any,methodName:string): void {

            if(!target.$$controllerConfiguration){
                 target.$$controllerConfiguration = {
                         routes:[],
                         root: null
                 };
            };
      p_routeConfig.verb = p_routeConfig.verb.toLowerCase();
            if(!p_routeConfig.verb.match("get|post|delete|put")){
          console.error("verbo  '"+p_routeConfig.verb+"' invalido para a rota '"+p_routeConfig.url+"', verifique se o parametro verb comtem get, post, delete ou put");
      }else{
        target.$$controllerConfiguration.routes.push({
          verb:p_routeConfig.verb
          ,url: p_routeConfig.url
          ,handlerName: methodName
        });
      };

        }
}
*/
function Get(url) {
    return function (target, methodName) {
        if (!target.$$controllerConfiguration) {
            target.$$controllerConfiguration = {
                routes: [],
                root: null
            };
        }
        ;
        target.$$controllerConfiguration.routes.push({
            verb: "get",
            url: url,
            handlerName: methodName
        });
    };
}
exports.Get = Get;
function Post(url) {
    return function (target, methodName) {
        if (!target.$$controllerConfiguration) {
            target.$$controllerConfiguration = {
                routes: [],
                root: null
            };
        }
        ;
        target.$$controllerConfiguration.routes.push({
            verb: "post",
            url: url,
            handlerName: methodName
        });
    };
}
exports.Post = Post;
function Put(url) {
    return function (target, methodName) {
        if (!target.$$controllerConfiguration) {
            target.$$controllerConfiguration = {
                routes: [],
                root: null
            };
        }
        ;
        target.$$controllerConfiguration.routes.push({
            verb: "put",
            url: url,
            handlerName: methodName
        });
    };
}
exports.Put = Put;
function Delete(url) {
    return function (target, methodName) {
        if (!target.$$controllerConfiguration) {
            target.$$controllerConfiguration = {
                routes: [],
                root: null
            };
        }
        ;
        target.$$controllerConfiguration.routes.push({
            verb: "delete",
            url: url,
            handlerName: methodName
        });
    };
}
exports.Delete = Delete;
function Controller(p_root) {
    return function (target) {
        var tmpConfig = target.prototype;
        tmpConfig.$$controllerConfiguration.routes.forEach(function (route) {
            console.log("add rota " + p_root + route.url + " : " + route.verb);
            //var verbS:string = route.verb;
            //DinRoute.getApp()[verbS].push();
            DinRoute_1.DinRoute.getApp()[route.verb](p_root + route.url, target.prototype[route.handlerName]);
        });
    };
}
exports.Controller = Controller;
