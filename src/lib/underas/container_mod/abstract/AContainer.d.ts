import { AVisualComponent } from "../../component_mod/abstract/AVisualComponent";
import { IContainer } from "../interface/IContainer";
import { IBlockContainer } from "../interface/IBlockContainer";
import { ICustomComponent } from "../../core_mod/interface/ICustomComponent";
export declare abstract class AContainer extends AVisualComponent implements IContainer {
    protected addBlockContainer(): void;
    protected getBlockContainer(): IBlockContainer;
    protected insertCustomComponent(p_custom_component: ICustomComponent, p_type_append: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
