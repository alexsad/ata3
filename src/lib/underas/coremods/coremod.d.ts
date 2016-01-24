/// <reference path="../../../../src/lib/jquery/jquery2.d.ts" />
export declare class UnderasStatic {
    private _uid;
    private _projectVersion;
    getUid(): number;
    getLastUid(): number;
    getNextUid(): number;
    setProjectVersion(p_version: string): void;
    getProjectVersion(): string;
    loadModules(p_modules: string[], p_fnhandler: Function): void;
    getUrlParam(p_name: string): string;
    getLocation(): string;
    getDomain(): string;
    printDataProvider(p_dta: any[], p_url_template: string): void;
    getInstanceOf<T>(context: Object, name: string, args: any[]): T;
    preCompileTemplate(template: string): Function;
    transformPreCompiled(str: string): Function;
}
export declare var Underas: UnderasStatic;
