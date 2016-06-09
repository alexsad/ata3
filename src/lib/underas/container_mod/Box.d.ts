import { AContainer } from "./abstract/AContainer";
import { IChart } from "../chart_mod/interface/IChart";
import { IWidget } from "../widget_mod/interface/IWidget";
import { ICustomComponent } from "../core_mod/interface/ICustomComponent";
import { Painel } from "./Painel";
import { Form } from "./Form";
export declare class Box extends AContainer {
    constructor();
    prepend(p_childtoappend: Painel | ICustomComponent | IWidget | Form | IChart): void;
    append(p_childtoappend: Painel | ICustomComponent | IWidget | Form | IChart): void;
    private appendElement(p_childtoappend, p_type_append);
}
