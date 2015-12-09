import { Component } from "./core";
import { Controller, Button, IListView } from "./controller";
import { IDefaultRequest } from "./net";
export declare class AlertWindow extends Component {
    private _title;
    private _urlModule;
    constructor(p_title: string, p_msg?: string);
    addButton(p_ele: Button): void;
    append(childtoappend: Component | Controller): void;
    setTitle(p_title: string): void;
    setMsg(p_msg: string): void;
    setUrlModule(p_url_m: string): void;
}
export interface IModWindowColumn {
    column: string;
    field: string;
}
export interface IConfigsLists {
    list: string;
    url: string;
}
export interface IConfigModWindow {
    urlmodule: string;
    revision: string;
    subtitle: string;
    dmap: IModWindowColumn[];
    dmaplenth: number;
    modview?: ModView;
    maintoolbar?: string;
    mainlist?: string;
    modName?: string;
    configListsViews?: IConfigsLists[];
}
export declare class ModWindow extends Component {
    private _configModWindow;
    constructor(p_subtitle: string);
    getConfigModWindow(): IConfigModWindow;
    setTitle(p_title: string): void;
    getTitle(): string;
    _onStart(): void;
    onStart(): void;
    getFormItem(): Object;
    setFormItem(p_item: Object): void;
    clearFormItem(): void;
    setRevision(p_txt_revision: string): void;
    getRevision(): string;
    getDsModule(): string;
    changeDsModule(): void;
    setUrlModule(p_url_m: string): void;
    getUrlModule(): string;
    getModView(): ModView;
    append(childtoappend: Component | Controller): void;
    setDsModule(): void;
    getColumns(): IModWindowColumn[];
    setIdField(p_field: string): void;
    getIdField(): string;
    getMainList(): IListView;
    setMainList(p_main_list: string): void;
    show(on: boolean): void;
    beforeSave(p_obj: Object): Object;
    beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest;
    beforeQuery(p_req: IDefaultRequest): IDefaultRequest;
    onChangeItem(p_obj: Object): Object;
    beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: Object): IDefaultRequest;
    beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: Object): IDefaultRequest;
}
export declare class ModView extends Component {
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
    setIcon(p_icon: string): void;
    showNav(on: boolean): ModView;
    show(on: boolean): ModView;
}
