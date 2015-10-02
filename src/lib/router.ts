import {DinRoute} from "./DinRoute";

export interface IRoute {
    verb: string;
    url: string;
    handlerName: string;
}

export interface IControllerConfiguration {
    routes: IRoute[];
    root: string;
}

export interface IControllerClass extends Function {
    prototype: {};
		$$controllerConfiguration:IControllerConfiguration;
    new (): Function;
}

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

export function Get(url:string) {
	return function(target:any,methodName:string): void {
		if(!target.$$controllerConfiguration){
			 target.$$controllerConfiguration = {
					 routes:[],
					 root: null
			 };
		};
		target.$$controllerConfiguration.routes.push({
		  verb:"get"
		  ,url: url
		  ,handlerName: methodName
		});
	}
}

export function Post(url:string) {
	return function(target:any,methodName:string): void {
		if(!target.$$controllerConfiguration){
			 target.$$controllerConfiguration = {
					 routes:[],
					 root: null
			 };
		};
		target.$$controllerConfiguration.routes.push({
		  verb:"post"
		  ,url: url
		  ,handlerName: methodName
		});
	}
}

export function Put(url:string) {
	return function(target:any,methodName:string): void {
		if(!target.$$controllerConfiguration){
			 target.$$controllerConfiguration = {
					 routes:[],
					 root: null
			 };
		};
		target.$$controllerConfiguration.routes.push({
		  verb:"put"
		  ,url: url
		  ,handlerName: methodName
		});
	}
}

export function Delete(url:string) {
	return function(target:any,methodName:string): void {
		if(!target.$$controllerConfiguration){
			 target.$$controllerConfiguration = {
					 routes:[],
					 root: null
			 };
		};
		target.$$controllerConfiguration.routes.push({
		  verb:"delete"
		  ,url: url
		  ,handlerName: methodName
		});
	}
}


export function Controller(p_root: string): ClassDecorator {
    return function (target: IControllerClass) {
		  var tmpConfig:IControllerClass = <IControllerClass> target.prototype;
		  tmpConfig.$$controllerConfiguration.routes.forEach(route => {
          console.log("add rota "+p_root+route.url+" : "+route.verb);
        //var verbS:string = route.verb;
        //DinRoute.getApp()[verbS].push();
				DinRoute.getApp()[route.verb](p_root+route.url,target.prototype[route.handlerName]);
		  });
    }
}
