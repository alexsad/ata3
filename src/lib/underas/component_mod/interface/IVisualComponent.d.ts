import { EViewSize } from "../enum/EViewSize";
export interface IVisualComponent {
    setSize(p_size: number, ...p_size_views: EViewSize[]): void;
    setOffSet(p_size: number, ...p_size_views: EViewSize[]): void;
    show(p_on: boolean): void;
    addEvent(p_on: string, p_handler: Function): void;
    removeEvent(p_event?: string, p_function?: Function): void;
    setCssProperties(p_properties: {
        [s: string]: string;
    }): void;
    addStyleName(p_class_names: string): void;
    removeStyleName(p_class_names: string): void;
    setStyleName(p_class_names: string): void;
    isVisible(): boolean;
}
export interface IViewSize {
    col: string;
    size: string;
}
