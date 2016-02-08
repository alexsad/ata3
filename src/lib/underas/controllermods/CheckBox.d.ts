import { Controller } from "./controllermod";
export declare class CheckBox extends Controller {
    checkedValue: string;
    unCheckedValue: string;
    private checked;
    constructor(p_label: string, p_innerLabel: string);
    setIcon(p_src: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
    setHandlerCheck(evt: Event): void;
    setCheckedValue(p_vl: string): void;
    setUnCheckedValue(p_vl: string): void;
    isValid(): boolean;
    setValue(p_vl: string): void;
    getValue(): string;
}
