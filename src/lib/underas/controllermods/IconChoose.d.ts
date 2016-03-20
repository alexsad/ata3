import { DoubleInput } from "./controllermod";
import { IRequestConfig } from "../http";
export declare class IconChoose extends DoubleInput {
    private _valuefield;
    private _labelfield;
    private _urlservice;
    private _rooturlservice;
    itemRender: string;
    constructor();
    onNotFound(evt: Event): void;
    reSizeList(evt: Event): void;
    showList(p_on: boolean): JQuery;
    getFromUpList(evt: Event): void;
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
