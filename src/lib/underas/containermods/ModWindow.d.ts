import { WebComponent, IWebElementClass } from "../core";
import { Controller } from "../controller";
import { ModView } from "./ModView";
import { IRequestConfig } from "../http";
import { ModContainer } from "./ModContainer";
import { AlertWindow } from "./AlertWindow";
import { ListView } from "../listview";
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
    setMainList(p_main_list: string): void;
    getMainList(): ListView<any>;
    show(on: boolean): void;
    beforeSave<T>(p_obj: T): T;
    afterSave<T>(p_obj: T): T;
    beforeUpdate<T>(p_req_new_obj: IRequestConfig, p_old_obj: T): IRequestConfig;
    afterUpdate<T>(p_obj: T): T;
    beforeInsert(p_req_obj: IRequestConfig): IRequestConfig;
    afterInsert<T>(p_obj: T): T;
    beforeDelete<T>(p_req_delete: IRequestConfig, p_old_obj: T): IRequestConfig;
    beforeReload(p_req: IRequestConfig): IRequestConfig;
    onChangeItem<T>(p_obj: T): T;
}
