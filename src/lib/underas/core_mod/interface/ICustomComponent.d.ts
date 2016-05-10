import { IEvent } from "../../component_mod/interface/IEvent";
export interface ICustomComponent {
    onRender: (p_seletor_target: string) => void;
    refreshRender?: () => void;
    addEvent?(p_on: string, p_event_fn: Function): void;
    fireEvent?(p_event: string, ...p_params: any[]): IEvent;
    removeEvent?(p_event?: string, p_function?: Function): void;
    $?: JQuery;
}
