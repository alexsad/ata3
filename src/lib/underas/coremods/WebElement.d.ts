export interface IWebElementClass {
    prototype?: any;
    _configWebElement: {
        _relativeUrlResourceTemplatePath: string;
        _templatePrecompiled?: Function;
        _instanceWaiting?: IWebElementClass[];
    };
    name: string;
    new (): Function;
    load: Function;
    refreshRender(): void;
    $: JQuery;
    setModule(): void;
    getColumn(): string;
}
export interface IWebElementConfig {
    templateResource: string;
    styleResource?: string[];
}
export declare function WebElement(p_config: IWebElementConfig): ClassDecorator;
