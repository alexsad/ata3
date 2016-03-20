export interface IRequestConfig {
    format?: string;
    url?: string;
    method?: string;
    rootUrl?: string;
    queryData?: any;
    body?: any;
    contentType?: string;
}
export declare class TaskRequest {
    private config;
    constructor(p_config: IRequestConfig);
    params(p_data: {}): TaskRequest;
    body(p_data: {}): TaskRequest;
    done(p_onload: Function, p_onError?: Function): JQueryPromise<any>;
}
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
