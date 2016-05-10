import { VisualComponent } from "./VisualComponent";
export declare class AlertMsg extends VisualComponent {
    static TP_SUCCESS: string;
    static TP_INFO: string;
    static TP_WARNING: string;
    static TP_ERROR: string;
    constructor(p_text?: string);
    setText(p_text: string): void;
    getText(): string;
    setValue(p_text: string): void;
    getValue(): string;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setType(p_type: string): void;
}
