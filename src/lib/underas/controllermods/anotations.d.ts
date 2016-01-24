import { IConfigModWindow } from "../container";
export interface IViewClass {
    prototype: {};
    _configModWindow: IConfigModWindow;
    name: string;
    new (): Function;
    loadTemplate: Function;
}
export declare function ItemView(p_url_source: string, p_relative_resource_css?: string[], p_mainlist_name?: string): ClassDecorator;
