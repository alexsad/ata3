import { AContainer } from "./abstract/AContainer";
import { IFormColumn } from "./interface/IFormColumn";
import { IChart } from "../chart_mod/interface/IChart";
import { IWidget } from "../widget_mod/interface/IWidget";
import { IButton } from "../button_mod/interface/IButton";
import { ToolBar } from "./ToolBar";
import { IInput } from "../input_mod/interface/IInput";
import { ICustomComponent } from "../core_mod/interface/ICustomComponent";
import { IBlockContainer } from "./interface/IBlockContainer";
export declare class Form extends AContainer {
    private config;
    private _isforms;
    constructor();
    prepend(p_childtoappend: IChart | IWidget | IButton | IInput | IButton | ToolBar | ICustomComponent): void;
    append(p_childtoappend: IChart | IWidget | IButton | IInput | IButton | ToolBar | ICustomComponent): void;
    private appendElement(p_childtoappend, p_type_append);
    clearFormItem(): void;
    validAllItens(): boolean;
    setFormItem<T>(p_item: T): void;
    getFormItem<T>(): T;
    setIdField(p_field: string): void;
    getIdField(): string;
    private getFieldDescByName(desc);
    getColumns(): IFormColumn[];
    blockContainer: IBlockContainer;
}
