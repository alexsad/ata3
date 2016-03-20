import { Controller } from "./controllermod";
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
