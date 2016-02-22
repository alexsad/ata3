import { DoubleInput } from "./controllermod";
import { IRequestConf } from "../net";
export declare class Select extends DoubleInput {
    private _valuefield;
    private _labelfield;
    private _urlservice;
    private _rooturlservice;
    constructor(p_placeholder?: string);
    onNotFound(evt: Event): void;
    reSizeList(evt: Event): void;
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
    fromService(p_req_service: IRequestConf): void;
}
