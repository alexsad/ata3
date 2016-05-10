import { AVisualComponent } from "../component_mod/abstract/AVisualComponent";
import { Button } from "../button_mod/Button";
export declare class ToolBar extends AVisualComponent {
    constructor();
    private insertElement(p_buttom, p_showlabel, p_where);
    append(p_buttom: Button, p_showlabel?: boolean): void;
    prepend(p_buttom: Button, p_showlabel?: boolean): void;
}
