import { AVisualComponent } from "../../component_mod/abstract/AVisualComponent";
import { IButton } from "../interface/IButton";
export declare abstract class AButton extends AVisualComponent implements IButton {
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
