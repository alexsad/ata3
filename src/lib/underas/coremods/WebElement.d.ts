export interface IWebElementClass {
    prototype?: any;
    _configWebElement: {
        target?: string;
        templateResource?: string;
    };
    name: string;
    new (): Function;
    renderTo: (p_ele_target: string) => void;
    refreshRender(): void;
}
export interface IWebElementConfig {
    templateResource: string;
    styleResource?: string[];
    noAutoRenderRefresh?: boolean;
}
export declare function WebElement(p_config: IWebElementConfig): ClassDecorator;
