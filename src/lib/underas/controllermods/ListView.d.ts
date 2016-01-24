import { WebComponent } from "../core";
import { TextInput } from "./controllermod";
import { Select } from "./Select";
import { IPaginationParam } from "../util";
export interface IListView {
    getSelectedItem(): Object;
    updateItem(p_item: Object): void;
    insertItem(p_item: Object, p_where: string): void;
    getPaginationParam(): IPaginationParam;
    setDataProvider(p_data: any[]): void;
    getDataProvider(): any[];
    changeToIndex(p_index: number): void;
    itemChange?: Function;
    pageRequest?: Function;
}
export interface IOrderColumnListView {
    idColumn: string;
    column: string;
}
export declare class ListView extends WebComponent implements IListView {
    dataProvider: any[];
    private tmpDataProvider;
    private maxCells;
    _urlTemplate: string;
    _itemTemplatePrecompiled: Function;
    private _classItemTemplateHtml;
    _ind: number;
    _itFilter: TextInput;
    _itOrderBy: Select;
    itemChange: Function;
    _islistview: boolean;
    private _pag;
    constructor(p_title: string);
    getPaginationParam(): IPaginationParam;
    setDataProvider(p_dta: any[]): ListView;
    getDataProvider(): any[];
    setHeight(p_height: number): void;
    clear(): void;
    private changePg(evt);
    private getRowCell();
    private setPage(p_page);
    refresh(): ListView;
    private getTmpUrl(fnAfter);
    setFilter(evt: JQueryEventObject): void;
    setOrderField(evt: Event): void;
    setOrder(evt: Event): void;
    orderDesc(p_campo: string): void;
    orderAsc(p_campo: string): void;
    getSelectedIndex(): number;
    getSelectedItem(): Object;
    setSelectedItem(p_item: Object): void;
    setSelectedIndex(p_index: number): void;
    changeToIndex(p_index: number): void;
    updateItem(p_item: Object): void;
    replaceItem(p_item: Object, p_index?: number): void;
    insertItem(p_item: Object, p_where?: string): void;
    removeSelectedItem(): void;
    removeItem(p_item: Object): void;
    onChangeSelectedItem(evt: Event): void;
    changeSelectedItem(tgt: JQuery): void;
}
