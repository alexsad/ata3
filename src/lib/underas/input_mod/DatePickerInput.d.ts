import { TextInput } from "./TextInput";
export declare enum EDatePickerStartType {
    month = 0,
    year = 1,
    decade = 2,
}
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
    startView?: EDatePickerStartType;
}
export declare enum EDatePartType {
    day = 0,
    month = 1,
    year = 2,
}
export declare class DatePickerInput extends TextInput {
    private dtaA;
    private _format;
    private _dateRef;
    constructor(p_config?: IConfigDatePicker);
    private setConfig(p_config);
    getValue(): string;
    setValue(p_value: string): void;
    getDate(): Date;
    addDate(typeD: EDatePartType, pluss: number): void;
    setDate(typeD: EDatePartType, vl: number): void;
    refresh(): void;
    isValid(): boolean;
}
