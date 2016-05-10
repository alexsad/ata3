import { AWidget } from "./abstract/AWidget";
import { EBasicColorStatus } from "../core_mod/enum/EBasicColorStatus";
export interface IItemNotify {
    title: string;
    subtitle: string;
    count: number;
    type: EBasicColorStatus;
    icon: string;
    module: string;
    moduleAction?: string;
    moduleTitle: string;
    moduleIcon: string;
}
export declare class DefaultNotifyItemRender extends AWidget {
    constructor(p_obj: IItemNotify);
}
export declare class NotifyPool extends AWidget {
    _vlcount: number;
    constructor(p_title: string);
    executeActionNotify(evt: Event): void;
    showNotifications(evt: Event): void;
    addNotify(p_notify: IItemNotify): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setType(ptype: EBasicColorStatus): void;
    setIcon(p_icon: string): void;
}
