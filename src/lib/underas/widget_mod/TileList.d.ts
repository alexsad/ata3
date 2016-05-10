import { AWidget } from "./abstract/AWidget";
export declare class TileList<T> extends AWidget {
    private _tmpDataProvider;
    private _dataProvider;
    private _urlTemplate;
    private _islistview;
    private _selected_index;
    private _itFilter;
    activate: boolean;
    static EVENT_ITEM_CHANGE: string;
    constructor(p_list_name: string);
    setItemViewResource(p_url_item_view_resource: string): void;
    refresh(): void;
    private refreshItemRender();
    private onLoadRender(tmp, _IDOM);
    private setFilter(evt);
    setDataProvider(p_dta: T[]): void;
    getDataProvider(): T[];
    updateItem(p_item: T): void;
    insertItem(p_item: T): void;
    removeItem(p_item: T): void;
    getSelectedIndex(): number;
    getSelectedItem(): T;
    private onChangeItemHandler(evt);
    private getRowCell();
    private removeSelecteds();
    changeToIndex(p_index: number, p_change_item?: boolean): void;
    private _changeSelectedItem(tgt, p_change_item?);
}
