import { ABaseInput } from "./ABaseInput";
import { IInputIcon } from "../interface/IInputIcon";
export declare abstract class AInput extends ABaseInput {
    constructor(tipo: string, valor: string);
    setMaxLength(p_lgt: number): void;
    private setMinLength(p_lgt, p_msgerro);
    setPlaceHolder(p_placeholder: string): void;
    icon: IInputIcon;
    setIcon(p_src: string): void;
    setAddon(p_txt: string): void;
    setEnable(p_on: boolean, p_posi?: number): void;
}
