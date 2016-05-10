import { AWidget } from "./abstract/AWidget";
import { EBasicColorStatus } from "../core_mod/enum/EBasicColorStatus";
export declare class Alert extends AWidget {
    constructor(p_text?: string);
    setText(p_text: string): void;
    getText(): string;
    setValue(p_text: string): void;
    getValue(): string;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setColor(p_basic_color: EBasicColorStatus): void;
    private insertText(p_text, p_type_append);
    prependText(p_text: string): void;
    appendText(p_text: string): void;
}
