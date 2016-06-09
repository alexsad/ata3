import { IBlockContainer } from "../interface/IBlockContainer";
import { ABasicContainer } from "./ABasicContainer";
export declare abstract class AContainer extends ABasicContainer {
    private addBlockContainer();
    protected blockContainer: IBlockContainer;
    setEnable(on: boolean): void;
}
