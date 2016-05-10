import { EViewSize } from "../enum/EViewSize";
import { IController } from "../interface/IController";
export declare abstract class AController implements IController {
    _uid: number;
    protected _tmp$: JQuery;
    protected _selector_element: string;
    constructor(tagh: string, tagc: string);
    $: JQuery;
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
    setSize(p_size: number, ...p_views: EViewSize[]): void;
    setOffSet(p_size: number, ...p_views: EViewSize[]): void;
    show(p_show: boolean): void;
    addEvent(p_on: string, p_event_fn: Function): void;
}
