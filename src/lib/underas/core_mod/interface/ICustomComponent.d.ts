export interface ICustomComponent {
    onRender: (p_seletor_target: string) => void;
    refreshRender?: () => void;
    $?: JQuery;
    show?(p_on: boolean): void;
    setCssProperties?(p_properties: {
        [s: string]: string;
    }): void;
    addStyleName?(p_class_names: string): void;
    removeStyleName?(p_class_names: string): void;
    setStyleName?(p_class_names: string): void;
}
