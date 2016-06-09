import { AContainer } from "./abstract/AContainer";
import { Form } from "./Form";
import { Dialog } from "./Dialog";
import { Tab } from "./Tab";
import { EBasicColorStatus } from "../core_mod/enum/EBasicColorStatus";
export declare class Painel extends AContainer {
    title: string;
    constructor(p_subtitle: string);
    showTitle(p_on: boolean): void;
    setTitle(p_title: string): void;
    getTitle(): string;
    setColor(p_basic_color: EBasicColorStatus): void;
    private appendElement(p_childtoappend, p_type_append?);
    prepend(p_childtoappend: Form | Dialog | Tab | Painel): void;
    append(p_childtoappend: Form | Dialog | Tab | Painel): void;
}
