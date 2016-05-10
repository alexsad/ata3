export interface IWebElementConfig {
    templateResource: string;
    styleResource?: string[];
    noAutoRenderRefresh?: boolean;
}
export declare function Render(p_config: IWebElementConfig): ClassDecorator;
