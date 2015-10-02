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
    $$controllerConfiguration: IControllerConfiguration;
    new (): Function;
}
export declare function Get(url: string): (target: any, methodName: string) => void;
export declare function Post(url: string): (target: any, methodName: string) => void;
export declare function Put(url: string): (target: any, methodName: string) => void;
export declare function Delete(url: string): (target: any, methodName: string) => void;
export declare function Controller(p_root: string): ClassDecorator;
