export interface IRender {
    onRender: (p_seletor_target: string) => void;
    renderTo?: (p_seletor_target: string) => void;
    refreshRender?: () => void;
}
