import { WebComponent } from "../core";
export declare class ProgressBar extends WebComponent {
    _vl: number;
    constructor(p_vl?: number);
    setProgress(p_vl: number): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setBarColor(bgc: string): void;
    setToolTip(tooltip: string): void;
    setLabel(nlabel: string): void;
}
