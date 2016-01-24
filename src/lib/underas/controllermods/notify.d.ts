import { WebComponent } from "../core";
export declare enum ENotifyType {
    SUCCESS = 0,
    INFO = 1,
    PRIMARY = 2,
    WARNING = 3,
    DANGER = 4,
}
export interface IItemNotify {
    title: string;
    subtitle: string;
    count: number;
    type: ENotifyType;
    icon: string;
    module: string;
    moduleAction?: string;
    moduleTitle: string;
    moduleIcon: string;
}
export declare class DefaultNotifyItemRender extends WebComponent {
    constructor(p_obj: IItemNotify);
}
export declare enum ENotifyPoolType {
    SUCCESS = 0,
    INFO = 1,
    PRIMARY = 2,
    WARNING = 3,
    DANGER = 4,
    DEFAULT = 5,
}
export declare class NotifyPool extends WebComponent {
    _vlcount: number;
    constructor(p_title: string);
    executeActionNotify(evt: Event): void;
    showNotifications(evt: Event): void;
    addNotify(p_notify: IItemNotify): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setType(ptype: ENotifyPoolType): void;
    setIcon(p_icon: string): void;
}
