import { IRequestConfig } from "./interface/IRequestConfig";
import { TaskRequest } from "./TaskRequest";
export declare class httpStatic {
    url: string;
    rootUrl: string;
    format: string;
    contentType: string;
    constructor();
    private getDefaultConfig(p_config_to_merge);
    private getDefaultTaskRequest(p_method, p_url, p_config?);
    get(p_url: string, p_config?: IRequestConfig): TaskRequest;
    delete(p_url: string, p_config?: IRequestConfig): TaskRequest;
    post(p_url: string, p_config?: IRequestConfig): TaskRequest;
    put(p_url: string, p_config?: IRequestConfig): TaskRequest;
}
export declare var $http: httpStatic;
