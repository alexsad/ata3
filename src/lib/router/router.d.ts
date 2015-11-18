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
    $$controllerConfiguration: IControllerConfiguration;
    new (): Function;
}
export declare function Controller(p_root?: string): ClassDecorator;
export declare const Get: (path?: string) => <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
export declare const Post: (path?: string) => <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
export declare const Put: (path?: string) => <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
export declare const Delete: (path?: string) => <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
export declare const Patch: (path?: string) => <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
