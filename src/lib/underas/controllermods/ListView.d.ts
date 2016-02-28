import { WebComponent, IComponent } from "../core";
export declare class ListView<T> extends WebComponent implements IComponent {
    private _tmpDataProvider;
    private _dataProvider;
    private _urlTemplate;
    private _islistview;
    private _onItemChangeHandler;
    private _selected_index;
    private _itFilter;
    activate: boolean;
    constructor(p_list_name: string);
    private refreshRender();
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
    changeToIndex(p_index: number): void;
    private _changeSelectedItem(tgt);
    setChangeItemHandler(p_handler: (p_item: T) => void): void;
}
