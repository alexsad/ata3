import { EViewSize } from "../enum/EViewSize";
import { IVisualComponent } from "../interface/IVisualComponent";
import { IEvent } from "../interface/IEvent";
export interface IViewSizeAttr {
    extra_small?: number;
    small?: number;
    medium?: number;
    large?: number;
}
export declare abstract class AVisualComponent implements IVisualComponent {
    _uid: number;
    protected _tmp$: JQuery;
    protected _selector_element: string;
    static EVENT_BEFORE_DESTROY: string;
    constructor(tagh: string, tagc: string);
    $: JQuery;
    getUID(): string;
    setCssProperties(p_properties: {
        [s: string]: string;
    }): void;
    addStyleName(p_class_names: string): void;
    removeStyleName(p_class_names: string): void;
    setStyleName(p_class_names: string): void;
    private setSizeIndividual(p_size, p_view?);
    private getSizeDesc(p_view);
    private setOffSetIndividual(p_size, p_view?);
    private sizesToArray();
    addSize(p_sizes: IViewSizeAttr): void;
    addOffSet(p_sizes: IViewSizeAttr): void;
    setSize(p_size: number, ...p_views: EViewSize[]): void;
    setOffSet(p_size: number, ...p_views: EViewSize[]): void;
    show(p_show: boolean): void;
    isVisible(): boolean;
    addEvent(p_on: string, p_event_fn: Function): void;
    fireEvent(p_event: string, ...p_params: any[]): IEvent;
    removeEvent(p_event?: string, p_function?: Function): void;
    destroy(): void;
}
