/// <reference path="../../jquery/jquery2.d.ts" />
export declare class SystemStatic {
    private _uid;
    private _projectVersion;
    getUid(): number;
    getLastUid(): number;
    getNextUid(): number;
    setProjectVersion(p_version: string): void;
    getProjectVersion(): string;
    loadModules(p_modules: string[], p_fnhandler: Function): void;
    getUrlParam(p_name: string): string;
    private removeInvalidChars(p_url);
    getLocation(): string;
    getDomain(): string;
    printDataProvider(p_dta: any[], p_url_template: string): void;
    getInstanceOf<T>(context: Object, name: string, args: any[]): T;
    loadStyleResource(p_url: string[]): void;
}
export declare var System: SystemStatic;
