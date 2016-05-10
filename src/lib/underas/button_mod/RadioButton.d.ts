import { AButton } from "./abstract/AButton";
export declare class RadioButton extends AButton {
    constructor(p_label: string, p_value: string | number);
    setLabel(p_label: string): void;
    setEnable(p_on: boolean): void;
}
