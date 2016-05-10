import { AWidget } from "./abstract/AWidget";
import { EBasicColorStatus } from "../core_mod/enum/EBasicColorStatus";
export declare class ProgressBar extends AWidget {
    _vl: number;
    constructor(p_vl?: number);
    setProgress(p_vl: number): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setBarColor(bgc: EBasicColorStatus): void;
    setToolTip(tooltip: string): void;
    setLabel(nlabel: string): void;
}
