export interface IWebElementClass {
    prototype?: any;
    _configWebElement: {
        _relativeUrlResourceTemplatePath: string;
        _templatePrecompiled?: Function;
        _instanceWaiting?: IWebElementClass[];
    };
    name: string;
    new (): Function;
    loadTemplate: Function;
    refreshRender(): void;
    $: JQuery;
    setModule(): void;
    getColumn(): string;
}
export declare function WebElement(p_relative_resource_template: string, p_relative_resource_css?: string[]): ClassDecorator;
