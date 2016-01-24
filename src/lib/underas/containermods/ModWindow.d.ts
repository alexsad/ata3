import { WebComponent } from "../core";
import { Controller, IListView } from "../controller";
import { ModView } from "./ModView";
import { IDefaultRequest } from "../net";
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
export declare class ModWindow extends WebComponent {
    _configModWindow: IConfigModWindow;
    constructor(p_subtitle: string);
    setSize(nsize: number): void;
    getConfigModWindow(): IConfigModWindow;
    setTitle(p_title: string): void;
    getTitle(): string;
    _onStart(): void;
    onStart(): void;
    validAllItens(): boolean;
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
    setModView(p_modview: ModView): void;
    append(childtoappend: Controller | WebComponent | any): void;
    setDsModule(): void;
    getColumns(): IModWindowColumn[];
    setIdField(p_field: string): void;
    getIdField(): string;
    getMainList(): IListView;
    setMainList(p_main_list: string): void;
    show(on: boolean): void;
    beforeSave(p_obj: Object): Object;
    beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest;
    afterInsert(p_obj: Object): Object;
    beforeQuery(p_req: IDefaultRequest): IDefaultRequest;
    onChangeItem(p_obj: Object): Object;
    beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: Object): IDefaultRequest;
    beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: Object): IDefaultRequest;
}
