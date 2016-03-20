import { TextInput } from "./controllermod";
export interface IConfigDatePicker {
    format?: string;
    startDate?: string;
    endDate?: string;
    todayBtn?: string;
    daysOfWeekDisabled?: number[];
    daysOfWeekHighlighted?: number[];
    autoclose?: boolean;
    language?: string;
    todayHighlight?: boolean;
}
export declare enum DatePartType {
    day = 0,
    month = 1,
    year = 2,
}
export declare class DatePicker extends TextInput {
    private dtaA;
    private _format;
    private _dateRef;
    constructor(p_config?: IConfigDatePicker);
    private setConfig(p_config);
    getValue(): string;
    setValue(p_value: string): void;
    getDate(): Date;
    addDate(typeD: DatePartType, pluss: number): void;
    setDate(typeD: DatePartType, vl: number): void;
    refresh(): void;
    isValid(): boolean;
}
