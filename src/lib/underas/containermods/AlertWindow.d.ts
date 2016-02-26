import { WebComponent, IWebElementClass } from "../core";
import { Controller, Button } from "../controller";
import { ModContainer } from "./ModContainer";
export declare class AlertWindow extends ModContainer {
    private _title;
    private _urlModule;
    constructor(p_title: string, p_msg?: string);
    addButton(p_ele: Button): void;
    private appendElement(childtoappend, p_type_append?);
    prepend(childtoappend: Controller | WebComponent | IWebElementClass): void;
    append(childtoappend: Controller | WebComponent | IWebElementClass): void;
    setTitle(p_title: string): void;
    setMsg(p_msg: string): void;
    setUrlModule(p_url_m: string): void;
}
