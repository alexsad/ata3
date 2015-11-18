import express = require('express');
export declare class DinRoute {
    static app: express.Express;
    static setApp(app: express.Express): void;
    static getApp(): express.Express;
    constructor();
}
