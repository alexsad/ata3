import {Render, ICustomComponent} from "lib/underas/core";

@Render({
	templateResource: "usuario/view/assets/html/banner_login"
	,styleResource: ["usuario/view/assets/css/banner_login"]
	,noAutoRenderRefresh:true
})
class BannerLoginStatic implements ICustomComponent{
	private _visible: boolean;
	constructor() {
		this._visible = true;
	}
	set visible(p_on: boolean){
		this._visible = p_on;
		(<ICustomComponent><any>this).refreshRender();
	}
	get visible():boolean{
		return this._visible;
	}
	onRender(p_ele:string):void{}
}

var BannerLogin: BannerLoginStatic = new BannerLoginStatic();
export = BannerLogin;