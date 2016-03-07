import { WebComponent } from "../core";
export declare enum EBarColorType {
    SUCCESS = 0,
    INFO = 1,
    WARNING = 2,
    DANGER = 3,
}
export declare class ProgressBar extends WebComponent {
    _vl: number;
    constructor(p_vl?: number);
    setProgress(p_vl: number): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setBarColor(bgc: EBarColorType): void;
    setToolTip(tooltip: string): void;
    setLabel(nlabel: string): void;
}
