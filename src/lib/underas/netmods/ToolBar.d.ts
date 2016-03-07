import { Button } from "../controller";
import { IRequestConfig } from "./http";
import { SimpleToolBar } from "./SimpleToolBar";
export declare class ToolBar extends SimpleToolBar {
    _config: {
        "domain": string;
    };
    _istoolbar: boolean;
    _isactive: boolean;
    btAdd: Button;
    btDel: Button;
    btSave: Button;
    constructor(p_config: {
        "domain": string;
    });
    private onAddRecord(evt);
    getDefaultRequest(p_act: string, p_method: string): IRequestConfig;
    private onUpdateItem(ObjectResp);
    updateItem(p_objToUpdate: {}): void;
    private onInsertItem(dta_new);
    insertItem(p_objToInsert: {}): void;
    private onErrorHandler(p_error);
    private onDeleteItem();
    deleteItem(event: Event): void;
    activate(p_on: boolean): void;
    private onReloadItens(dta_ret);
    reloadItens(event?: Event): void;
    saveItem(event: Event): void;
}
