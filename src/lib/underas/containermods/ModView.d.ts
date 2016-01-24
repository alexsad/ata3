import { WebComponent } from "../core";
import { ModWindow } from "./ModWindow";
export declare class ModView extends WebComponent {
    private _title;
    private _icone;
    private _childrenMods;
    private _appended;
    private _indexmodule;
    constructor(p_title: string);
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
