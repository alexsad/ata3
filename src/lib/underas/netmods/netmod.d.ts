import { WebComponent } from "../core";
import { Label } from "../controller";
import { ModWindow } from "../container";
export interface ITaskConfig {
    s: string;
    t?: number;
    idRequest?: number;
}
export interface IRequestConf {
    module?: ModWindow;
    url: string;
    rootUrl?: string;
    format?: string;
    t?: number;
    idRequest?: number;
    data?: any;
    onLoad?: JQueryPromiseCallback<Function>;
    method?: string;
}
export interface IDefaultRequest {
    format: string;
    url: string;
    method: string;
    module?: ModWindow;
    rootUrl?: string;
    data?: any;
    onLoad?: JQueryPromiseCallback<Function>;
}
export declare class Task extends WebComponent {
    s: string;
    t: number;
    idView: string;
    idRequest: number;
    lbMsg: Label;
    constructor(p_dts: ITaskConfig);
    setIdView(p_idView: string): void;
    getIdView(): string;
    finalizar(dtk2: any): void;
    reload(): void;
    cancel(): void;
    setErro(isErr: boolean): void;
    setMSG(strMSG: string): void;
    setTaskDesc(strMSG: string): void;
    getTaskDesc(): string;
    erroState(msge: string[]): void;
}
export declare class RequestManagerImpl {
    private type;
    format: string;
    url: string;
    private _rootUrl;
    private _displayLoad;
    static TP_JSON: string;
    static TP_JSONP: string;
    _log_erro(args: {
        "s": string;
        "e": string[];
    }): void;
    _log_success(args: {
        "s": string;
        "m": string;
    }): void;
    addRequest(req: IRequestConf): void;
    refresh(): void;
    finalizar(): void;
    notifyTaskErro(p_idView: string, erro: string): void;
    showAllTasks(p_idWiew: string): void;
    hideAllTasks(p_idWiew: string): void;
    setFormat(p_format: string): void;
    setUrl(p_url: string): void;
    setRootUrl(p_rootUrl: string): void;
    getRootUrl(): string;
    enableDisplayLoad(p_on: boolean): void;
    removeAllTasks(p_idWinMod: string): void;
}
export declare var RequestManager: RequestManagerImpl;
