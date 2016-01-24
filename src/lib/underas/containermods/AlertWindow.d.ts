import { WebComponent } from "../core";
import { Controller, Button } from "../controller";
export declare class AlertWindow extends WebComponent {
    private _title;
    private _urlModule;
    constructor(p_title: string, p_msg?: string);
    addButton(p_ele: Button): void;
    append(childtoappend: WebComponent | Controller): void;
    setTitle(p_title: string): void;
    setMsg(p_msg: string): void;
    setUrlModule(p_url_m: string): void;
}
