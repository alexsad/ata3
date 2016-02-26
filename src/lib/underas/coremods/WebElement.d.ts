export interface IWebElementClass {
    onRender: (p_ele_target: JQuery) => void;
    renderTo?: (p_ele_target: string) => void;
    refreshRender?: () => void;
}
export interface IWebElementConfig {
    templateResource: string;
    styleResource?: string[];
    noAutoRenderRefresh?: boolean;
}
export declare function WebElement(p_config: IWebElementConfig): ClassDecorator;
