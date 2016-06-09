import { AVisualComponent } from "../../component_mod/abstract/AVisualComponent";
import { IContainer } from "../interface/IContainer";
import { ICustomComponent } from "../../core_mod/interface/ICustomComponent";
export declare abstract class ABasicContainer extends AVisualComponent implements IContainer {
    protected insertCustomComponent(p_custom_component: ICustomComponent, p_type_append: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
