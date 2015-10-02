import express = require('express');
export class DinRoute {
	static app: express.Express;
	static setApp(app: express.Express):void{
		DinRoute.app = app;
	}
	static getApp():express.Express{
		return DinRoute.app;
	}
	constructor(){}
}
