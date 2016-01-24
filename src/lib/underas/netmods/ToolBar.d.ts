import { WebComponent } from "../core";
import { Button } from "../controller";
import { IDefaultRequest } from "./netmod";
export declare class SimpleToolBar extends WebComponent {
    constructor();
    addButton(nbuttom: Button): void;
}
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
    getDefaultRequest(p_act: string, p_method: string): IDefaultRequest;
    updateItem(p_objToUpdate: Object): void;
    insertItem(p_objToInsert: Object): void;
    deleteItem(event: Event): void;
    activate(p_on: boolean): void;
    reloadItens(event?: Event): void;
    saveItem(event: Event): void;
}
