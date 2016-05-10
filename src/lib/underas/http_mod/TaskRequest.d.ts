import { IRequestConfig } from "./interface/IRequestConfig";
export declare class TaskRequest {
    private config;
    constructor(p_config: IRequestConfig);
    params(p_data: {}): TaskRequest;
    body(p_data: {}): TaskRequest;
    done(p_onload: Function, p_onError?: Function): JQueryPromise<any>;
}
