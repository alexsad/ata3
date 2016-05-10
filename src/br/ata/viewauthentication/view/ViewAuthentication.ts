import {ViewPager, Box,StyleResource} from "lib/underas/container";
import {EViewSize, EBasicColorStatus} from "lib/underas/component";
import BannerLogin = require("../../usuario/view/BannerLogin");
import Login = require("../../usuario/view/Login");

@StyleResource("viewauthentication/view/assets/css/view_authentication")
class ViewAuthenticationStatic extends ViewPager{
	private boxLogin: Box;
	public EVENT_AUTHENTICATION_SUCCESS:string="AUTH:SUCCESS";
	constructor(){
		super();
		this.addStyleName("ViewAuthentication");
	}
	init():void{
		this.append(BannerLogin);

		this.boxLogin = new Box();
		this.boxLogin.append(Login);
		this.boxLogin.setSize(4);
		this.boxLogin.setSize(12, EViewSize.EXTRA_SMALL)
		this.boxLogin.setOffSet(4);
		this.boxLogin.setOffSet(0, EViewSize.EXTRA_SMALL);
		this.append(this.boxLogin);

		Login.addEvent(Login.EVENT_LOGIN_SUCCESS, (evt:Event) => this.onAuthentication(evt));
	}
	private onAuthentication(evt:Event):void{
		this.fireEvent(this.EVENT_AUTHENTICATION_SUCCESS);
	}
}

var ViewAuthentication:ViewAuthenticationStatic = new ViewAuthenticationStatic();
export = ViewAuthentication; 