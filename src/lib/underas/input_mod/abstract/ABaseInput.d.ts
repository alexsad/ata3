import { AVisualComponent } from "../../component_mod/abstract/AVisualComponent";
import { IInput } from "../interface/IInput";
import { IInputIcon } from "../interface/IInputIcon";
export declare abstract class ABaseInput extends AVisualComponent implements IInput {
    setBlankWhenNull(p_on: boolean): void;
    getInput(): JQuery;
    setFocus(): void;
    setLabel(p_label: string): void;
    setValue(p_value: string): void;
    setTransient(p_on: boolean): void;
    isTransient(): boolean;
    isBlankWhenNull(): boolean;
    setFixed(p_on: boolean): void;
    isFixed(): boolean;
    getValue(): string;
    isEnable(p_posi?: number): boolean;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setValid(p_on: boolean): void;
    setName(p_name: string): void;
    getName(): string;
    protected getInputIcon(p_icon_selector: string): IInputIcon;
}
