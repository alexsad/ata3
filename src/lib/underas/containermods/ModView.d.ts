import { ModContainer } from "./ModContainer";
import { ModWindow } from "./ModWindow";
export declare enum EBlockType {
    SUCCESS = 0,
    INFO = 1,
    PRIMARY = 2,
    WARNING = 3,
    DANGER = 4,
}
export declare class ModView extends ModContainer {
    private _title;
    private _icone;
    private _childrenMods;
    private _appended;
    private _indexmodule;
    constructor(p_title: string);
    private onTogleRequestDetails(evt);
    setProgress(p_config: {
        progress: number;
        typeBar: EBlockType;
    }): void;
    setEnable(p_on: boolean): void;
    nextModule(evt?: Event): void;
    prevModule(evt?: Event): void;
    showModule(p_indexModule: number): void;
    append(p_ele: ModWindow): void;
    destroy(): void;
    clearModules(): void;
    clearModule(p_idmodule: string): void;
    setIcon(p_icon: string): void;
    showNav(on: boolean): ModView;
    show(on: boolean): ModView;
}
