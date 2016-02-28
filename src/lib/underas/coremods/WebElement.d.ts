export interface IWebElementClass {
    onRender: (p_seletor_target: string) => void;
    renderTo?: (p_seletor_target: string) => void;
    refreshRender?: () => void;
}
export interface IWebElementConfig {
    templateResource: string;
    styleResource?: string[];
    noAutoRenderRefresh?: boolean;
}
export declare function WebElement(p_config: IWebElementConfig): ClassDecorator;
