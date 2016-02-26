import { WebComponent, IWebElementClass } from "../core";
import { Controller, IListView } from "../controller";
import { ModView } from "./ModView";
import { IDefaultRequest } from "../net";
import { ModContainer } from "./ModContainer";
import { AlertWindow } from "./AlertWindow";
export declare enum ETypeModWindow {
    PRIMARY = 0,
    SUCCESS = 1,
    INFO = 2,
    WARNING = 3,
    DANGER = 4,
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
    styleResource?: string[];
}
export declare class ModWindow extends ModContainer {
    _configModWindow: IConfigModWindow;
    constructor(p_subtitle: string);
    setSize(nsize: number): void;
    getConfigModWindow(): IConfigModWindow;
    showTitle(p_on: boolean): void;
    setTitle(p_title: string): void;
    getTitle(): string;
    setType(p_type: ETypeModWindow): void;
    _onStart(): void;
    onStart(): void;
    validAllItens(): boolean;
    getFormItem<T>(): T;
    setFormItem<T>(p_item: T): void;
    clearFormItem(): void;
    setRevision(p_txt_revision: string): void;
    getRevision(): string;
    setUrlModule(p_url_m: string): void;
    getUrlModule(): string;
    getDsModule(): string;
    setDsModule(): void;
    changeDsModule(): void;
    getModView(): ModView;
    setModView(p_modview: ModView): void;
    private appendElement(childtoappend, p_type_append?);
    prepend(childtoappend: Controller | AlertWindow | WebComponent | IWebElementClass): void;
    append(childtoappend: Controller | AlertWindow | WebComponent | IWebElementClass): void;
    appendTo(p_target: string): void;
    getColumns(): IModWindowColumn[];
    setIdField(p_field: string): void;
    getIdField(): string;
    getMainList(): IListView;
    setMainList(p_main_list: string): void;
    show(on: boolean): void;
    beforeSave<T>(p_obj: T): T;
    afterSave<T>(p_obj: T): T;
    beforeUpdate<T>(p_req_new_obj: IDefaultRequest, p_old_obj: T): IDefaultRequest;
    afterUpdate<T>(p_obj: T): T;
    beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest;
    afterInsert<T>(p_obj: T): T;
    beforeDelete<T>(p_req_delete: IDefaultRequest, p_old_obj: T): IDefaultRequest;
    beforeReload(p_req: IDefaultRequest): IDefaultRequest;
    onChangeItem<T>(p_obj: T): T;
}
