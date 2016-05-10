import { RadioButton } from "../button_mod/RadioButton";
import { ABaseInput } from "../input_mod/abstract/ABaseInput";
export declare class RadioGroup extends ABaseInput {
    constructor(p_label?: string);
    private insertElement(p_radioButtom, p_showlabel, p_where);
    append(p_radioButtom: RadioButton, p_showlabel?: boolean): void;
    prepend(p_radioButtom: RadioButton, p_showlabel?: boolean): void;
    getValue(): string;
    setValue(p_value: string | number): void;
    setEnable(p_on: boolean): void;
}
