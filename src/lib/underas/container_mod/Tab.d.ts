import { AContainer } from "./abstract/AContainer";
import { Box } from "./Box";
import { Painel } from "./Painel";
import { Form } from "./Form";
import { LinkButton } from "../button_mod/LinkButton";
export interface INavTab {
    selector: string;
    addEvent: Function;
    addStyleName: Function;
}
export declare class Tab extends AContainer {
    constructor();
    protected getNavTab(p_nav_tab_selector: string): INavTab;
    navTab: INavTab;
    private showTab(evt);
    private onClickTab(evt);
    private onCloseTab(evt);
    private setActiveIndex();
    prepend(p_button: LinkButton, p_childtoappend: Box | Painel | Form, p_show_on_append?: boolean): void;
    append(p_button: LinkButton, p_childtoappend: Box | Painel | Form, p_show_on_append?: boolean): void;
    private appendElement(p_button, p_childtoappend, p_type_append, p_show_on_append);
}
