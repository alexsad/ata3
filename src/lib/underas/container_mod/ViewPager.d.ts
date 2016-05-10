import { AContainer } from "./abstract/AContainer";
import { Painel } from "./Painel";
import { Tab } from "./Tab";
import { Box } from "./Box";
import { Dialog } from "./Dialog";
import { IBlockContainer } from "./interface/IBlockContainer";
import { ICustomComponent } from "../core_mod/interface/ICustomComponent";
export declare class ViewPager extends AContainer {
    constructor();
    private appendElement(p_childtoappend, p_type_append?);
    prepend(p_childtoappend: Box | Dialog | Tab | Painel | ICustomComponent): void;
    append(p_childtoappend: Box | Dialog | Tab | Painel | ICustomComponent): void;
    appendTo(p_target: string): void;
    blockContainer: IBlockContainer;
}
