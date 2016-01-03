/// <reference path="../../../../src/lib/jquery/jquery2.d.ts" />
import { ModWindow } from "lib/underas/container";
export declare class UnderasStatic {
    private _uid;
    private _version;
    getUid(): number;
    getLastUid(): number;
    getNextUid(): number;
    setProjectVersion(p_version: string): void;
    getUrlParam(p_name: string): string;
    getLocation(): string;
    getDomain(): string;
    printDataProvider(p_dta: any[], p_url_template: string): void;
    getInstanceOf<T>(context: Object, name: string, args: any[]): T;
    preCompileTemplate(template: string): Function;
    transformPreCompiled(str: string): Function;
}
export declare var Underas: UnderasStatic;
export declare class Component {
    _uid: number;
    _html: JQuery;
    private _modwindow;
    constructor(tagh: string, tagc: string);
    getEle(p_sel?: string): JQuery;
    append(p_childtoappend: Component): void;
    setSize(nsize: number): void;
    addEvent(p_on: string, p_event_fn: Function, p_bind?: any): JQuery;
    show(pshow: boolean): void;
    getModule(): ModWindow;
    setModule(p_modWindow: any): void;
}
