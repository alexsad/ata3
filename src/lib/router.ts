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
    name: string;
	$$controllerConfiguration:IControllerConfiguration;
    new (): Function;
}
/*
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
*/
function methodDecoratorFactory(verbName: string): (path?: string) => MethodDecorator {
    return function (path?: string): MethodDecorator {
        return function (target: any, handlerName: string, descriptor: TypedPropertyDescriptor<Function>) {            
			if(!target.$$controllerConfiguration){
				target.$$controllerConfiguration = {
					routes:[],
					root: null
				};
			};
			if(!path){
				path="/";
			};
			target.$$controllerConfiguration.routes.push({
				"verb":verbName
				,"url": path
				,"handlerName": handlerName
			});
        };
    }
}

export function Controller(p_root?: string): ClassDecorator {
    return function (target: IControllerClass) {
		  var tmpConfig:IControllerClass = <IControllerClass> target.prototype;
		  if (!p_root) {
			  p_root = "/" + target.name.toLowerCase();
		  };
		  tmpConfig.$$controllerConfiguration.routes.forEach(route => {
          console.log(p_root+route.url+" "+route.verb);
        //var verbS:string = route.verb;
        //DinRoute.getApp()[verbS].push();
				DinRoute.getApp()[route.verb](p_root+route.url,target.prototype[route.handlerName]);
		  });
    }
}

export const Get = methodDecoratorFactory('get');
export const Post = methodDecoratorFactory('post');
export const Put = methodDecoratorFactory('put');
export const Delete = methodDecoratorFactory('delete');
export const Patch = methodDecoratorFactory('patch');