import { WebComponent } from "../core";
export interface IMenuTabConfig {
    domain: string;
    target: string;
}
export interface IMenuTab {
    label: string;
    icone: string;
    children: any[];
}
export interface IItemMenuTab {
    label: string;
    icone: string;
    tela: string;
    funcao: string;
}
export declare class MenuTab extends WebComponent {
    _config: IMenuTabConfig;
    constructor(p_config: IMenuTabConfig);
    addTab(label: string, boxM: JQuery, iconeM: string, tmItens: number, tabid: number): void;
    setIcon(p_src: string): void;
    appendTo(p_idFather: string): void;
    setDataProvider(p_dta: any[]): void;
    criarTabNova(label: string, picone: string, childrens: IItemMenuTab[], tabid: number): void;
}
