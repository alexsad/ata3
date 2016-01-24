import { ModWindow } from "../container";
import { IComponent } from "./IComponent";
import { Controller } from "../controller";
export declare class WebComponent implements IComponent {
    _uid: number;
    $: JQuery;
    private _modwindow;
    constructor(tagh: string, tagc: string);
    append(p_childtoappend: WebComponent | Controller): void;
    setSize(nsize: number): void;
    addEvent(p_on: string, p_event_fn: Function, p_bind?: any): JQuery;
    show(pshow: boolean): void;
    getModule(): ModWindow;
    setModule(p_modWindow: ModWindow): void;
    getColumn(): string;
}
