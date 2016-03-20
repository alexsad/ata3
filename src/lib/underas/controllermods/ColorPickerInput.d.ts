import { TextInput } from "./controllermod";
export declare class ColorPickerInput extends TextInput {
    private _boxVisible;
    constructor(p_text?: string);
    private onFocusOut(evt);
    private onFocos(evt);
    private updateColor(p_color);
    private showColors(p_show);
    isValid(): boolean;
    setValue(p_vl: string): void;
    private showColorsToggle(evt);
}
