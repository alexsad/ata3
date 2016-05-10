import { DoubleTextInput } from "./DoubleTextInput";
export declare class FileInput extends DoubleTextInput {
    private isvalid;
    constructor(p_placeholder?: string);
    isValid(): boolean;
    getValue(): string;
    setValue(p_value: string): void;
    clear(): void;
}
