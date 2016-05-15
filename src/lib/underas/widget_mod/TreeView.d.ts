import { AWidget } from "./abstract/AWidget";
export interface INodeTreeView {
    id?: string | number;
    text: string;
    icon?: string;
    state?: {
        opened?: boolean;
        disabled?: boolean;
        selected?: boolean;
    };
    children?: INodeTreeView[];
    a_attr?: {
        href: string;
        id?: string;
    };
}
export interface INodeTreeViewExtended extends INodeTreeView {
    parent: string;
}
export declare enum ETreeViewPosition {
    LAST = 0,
    FIRST = 1,
}
export declare class TreeView extends AWidget {
    private _loaded;
    static EVENT_NODE_CLICK: string;
    constructor();
    refresh(): void;
    clear(): void;
    addNode(p_node: INodeTreeView, p_posi?: ETreeViewPosition, p_parent?: any): void;
    getSelectedNode(): INodeTreeView;
    setDataProvider(p_data: INodeTreeView[]): void;
}
