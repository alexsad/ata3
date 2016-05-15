import { AWidget } from "./abstract/AWidget";
export interface INode {
    id: string;
    text: string;
    icon: string;
    state?: {
        opened?: boolean;
        disabled?: boolean;
        selected?: boolean;
    };
    children?: INode[];
}
export declare class Tree extends AWidget {
    constructor();
    refresh(): void;
    setDataProvider(p_dta: INode[]): void;
}
