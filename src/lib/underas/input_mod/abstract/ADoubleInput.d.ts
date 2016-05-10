import { ABaseInput } from "./ABaseInput";
import { IInputIcon } from "../interface/IInputIcon";
export declare class ADoubleInput extends ABaseInput {
    constructor(tipo: string, valor: string);
    setIcon(psrc: string, posi?: number): void;
    setAddon(ptxt: string, posi?: number): void;
    setPlaceHolder(p_placeholder: string): void;
    setEnable(p_on: boolean, p_posi?: number): void;
    icon1: IInputIcon;
    icon2: IInputIcon;
}
