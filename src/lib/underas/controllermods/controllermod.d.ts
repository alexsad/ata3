import { ModWindow } from "../container";
export declare class Controller {
    _uid: number;
    private _tmp$;
    private _selector_element;
    private _modwindow;
    constructor(tagh: string, tagc: string);
    $: JQuery;
    setBlankWhenNull(on: boolean): void;
    addEvent(p_on: string, p_event_fn: Function, p_bind?: any): JQuery;
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
    setSize(nsize: number): void;
    setMaxLength(p_lgt: number): void;
    setMinLength(p_lgt: number, p_msgerro: string): void;
    setValidation(p_mask: RegExp, p_msgerro: string): void;
    setPlaceHolder(p_placeholder: string): void;
    show(pshow: boolean): void;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setValid(p_on: boolean): void;
    setColumn(p_column: string): void;
    getColumn(): string;
    getModule(): ModWindow;
    setModule(p_modWindow: any): void;
}
export declare class Text extends Controller {
    constructor(p_text: string);
    setText(p_text: string): void;
}
export declare class Input extends Controller {
    constructor(tipo: string, valor: string);
    setIcon(p_src: string): void;
    setAddonText(p_txt: string): void;
}
export declare class DoubleInput extends Controller {
    constructor(tipo: string, valor: string);
    setIcon(psrc: string, posi?: number): void;
    setAddonText(ptxt: string, posi?: number): void;
}
export declare class TextInput extends Input {
    constructor(p_text?: string);
}
export declare class DoubleTextInput extends DoubleInput {
    constructor(p_text?: string);
}
export declare class PassWordInput extends Input {
    constructor(p_text?: string);
}
export declare class PercentInput extends TextInput {
    constructor(p_text?: string);
}
export declare class MoneyInput extends TextInput {
    constructor(p_text?: string);
}
export declare class TimeInput extends TextInput {
    constructor(p_text?: string);
}
export declare class EmailInput extends TextInput {
    constructor(p_text?: string);
    isValid(): boolean;
}
export declare class PhoneInput extends TextInput {
    constructor(p_text?: string);
}
export declare class Label extends Controller {
    constructor(p_text?: string);
    setText(p_text: string): void;
}
export declare class Button extends Controller {
    constructor(p_label: string);
    setIcon(psrc: string): void;
    setLabel(p_label: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
export declare class LinkButton extends Controller {
    constructor(p_label: string);
    setIcon(psrc: string): void;
    setLabel(p_label: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
export declare class FileInput extends DoubleTextInput {
    private isvalid;
    constructor(p_placeholder?: string);
    isValid(): boolean;
    getValue(): string;
    setName(p_name: string): void;
}
export declare class NumericStepper extends DoubleTextInput {
    maxvl: number;
    minvl: number;
    stepvl: number;
    constructor(p_text?: number);
    getVL(): number;
    setVL(vl: number): void;
    aumentar(): void;
    diminuir(): void;
    setMin(vl: number): void;
    setMax(vl: number): void;
    setStep(vl: number): void;
}
export declare class TextArea extends Controller {
    constructor(p_text?: string);
}
