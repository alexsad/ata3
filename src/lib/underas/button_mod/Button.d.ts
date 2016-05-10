import { AButton } from "./abstract/AButton";
import { EBasicColorStatus } from "../core_mod/enum/EBasicColorStatus";
export declare class Button extends AButton {
    constructor(p_label: string);
    setIcon(psrc: string): void;
    setLabel(p_label: string): void;
    setColor(p_basic_color: EBasicColorStatus): void;
}
