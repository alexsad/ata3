export interface IInput {
    setBlankWhenNull(on: boolean): void;
    getInput(): JQuery;
    setFocus(): void;
    setLabel(nlabel: string): void;
    setValue(vl: string): void;
    setTransient(on: boolean): void;
    isTransient(): boolean;
    isBlankWhenNull(): boolean;
    setFixed(on: boolean): void;
    isFixed(): boolean;
    getValue(): string;
    isEnable(p_posi?: number): boolean;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setValid(p_on: boolean): void;
    setName(p_name: string): void;
    getName(): string;
}
