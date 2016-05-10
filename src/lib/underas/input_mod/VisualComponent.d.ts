import { BasicVisualComponent } from "./BasicVisualComponent";
import { ModWindow } from "../container";
export declare class VisualComponent extends BasicVisualComponent {
    private _modwindow;
    constructor(tagh: string, tagc: string);
    setBlankWhenNull(on: boolean): void;
    getInput(): JQuery;
    setFocus(): void;
    setLabel(nlabel: string): void;
    setValue(vl: string): void;
    setTransient(on: boolean): void;
    isTransient(): boolean;
    isBlankWhenNull(): boolean;
    setFixed(on: boolean): void;
    isFixed(): boolean;
    getValue(): string;
    setEnable(on: boolean, p_posi?: number): void;
    isEnable(p_posi?: number): boolean;
    setValidation(p_mask: RegExp, p_msgerro: string): void;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setValid(p_on: boolean): void;
    setColumn(p_column: string): void;
    getColumn(): string;
    getModule(): ModWindow;
    setModule(p_modWindow: any): void;
}
