import { IConfigModWindow } from "./ModWindow";
export interface IViewClass {
    prototype: {};
    _configModWindow: IConfigModWindow;
    name: string;
    new (): Function;
}
export interface IWebContainer {
    itemViewResource?: string;
    mainList?: string;
    styleResource?: string[];
}
export declare function WebContainer(config: IWebContainer): ClassDecorator;
