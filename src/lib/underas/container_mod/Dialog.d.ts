import { AContainer } from "./abstract/AContainer";
import { Form } from "./Form";
export declare class Dialog extends AContainer {
    private _title;
    private _urlModule;
    static EVENT_CLOSE: string;
    constructor(p_title: string, p_msg?: string);
    private onCloseEvent(evt);
    private appendElement(p_childtoappend, p_type_append?);
    prepend(p_childtoappend: Form): void;
    append(p_childtoappend: Form): void;
    setTitle(p_title: string): void;
    setMsg(p_msg: string): void;
    setUrlModule(p_url_m: string): void;
}
