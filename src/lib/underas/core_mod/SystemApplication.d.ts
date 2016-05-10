/// <reference path="../../jquery/jquery2.d.ts" />
export declare class SystemApplicationStatic {
    private _uid;
    private _projectVersion;
    relativePathPackage: string;
    constructor();
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
    getInstanceOf<T>(context: Object, name: string, args: any[]): T;
    loadStyleResource(p_url: string[]): void;
}
export declare var SystemApplication: SystemApplicationStatic;
