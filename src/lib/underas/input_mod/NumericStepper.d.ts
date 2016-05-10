import { DoubleTextInput } from "./DoubleTextInput";
export declare class NumericStepper extends DoubleTextInput {
    maxvl: number;
    minvl: number;
    stepvl: number;
    constructor(p_text?: number);
    getVL(): number;
    setVL(vl: number): void;
    increaseValue(): void;
    reduceValue(): void;
    setMin(vl: number): void;
    setMax(vl: number): void;
    setStep(vl: number): void;
}
