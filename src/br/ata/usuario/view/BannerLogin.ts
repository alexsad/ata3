import {WebElement, IWebElementClass} from "lib/underas/core";

@WebElement({
	templateResource: "usuario/view/assets/html/banner_login"
	,styleResource: ["usuario/view/assets/css/banner_login"]
	,noAutoRenderRefresh:true
})
class BannerLoginStatic implements IWebElementClass{
	private visible: boolean;
	constructor() {
		this.visible = true;
	}
	appendTo(p_target: string): void {
		(<IWebElementClass><any>this).renderTo(p_target);
	}
	show(p_on:boolean):void{
		this.visible = p_on;
		(<IWebElementClass><any>this).refreshRender();
	}
	onRender(p_ele:JQuery):void{}
}

var BannerLogin: BannerLoginStatic = new BannerLoginStatic();
export = BannerLogin;