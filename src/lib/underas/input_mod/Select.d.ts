import { TextInput } from "./TextInput";
import { IRequestConfig } from "../http";
import { IInputIcon } from "./interface/IInputIcon";
export declare class Select extends TextInput {
    private _valuefield;
    private _labelfield;
    private _urlservice;
    private _rooturlservice;
    itemRender: string;
    constructor(p_placeholder?: string);
    icon: IInputIcon;
    private onMouseOver(evt);
    private onMouseOut(evt);
    private onFocusOut(evt);
    private onFocos(evt);
    onNotFound(evt: Event): void;
    private reSizeList(evt);
    showList(p_on: boolean): JQuery;
    getFromUpList(evt: Event): void;
    setFilter(evt: JQueryEventObject): void;
    setValueField(p_column: string): void;
    setLabelField(p_column: string): void;
    getValueField(): string;
    getLabelField(): string;
    setDataProvider(p_dta: any[]): void;
    getValue(): string;
    getText(): string;
    getDesc(): string;
    isValid(): boolean;
    setValue(p_vl: string): void;
    getDescFromServiceByValue(p_vl: string): string;
    reloadService(evt?: Event): void;
    private onRequestReceive(rs);
    fromService(p_req_service: IRequestConfig): void;
}