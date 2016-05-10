import {SystemApplication} from "lib/underas/core";
import {$http} from "lib/underas/http";
import ViewAuthentication = require("../../viewauthentication/view/ViewAuthentication");
import ViewApp = require("../../viewapp/view/ViewApp");


$http.rootUrl= SystemApplication.getDomain()+":8330/";

ViewAuthentication.appendTo('body:first');
ViewAuthentication.init();

ViewAuthentication.addEvent(ViewAuthentication.EVENT_AUTHENTICATION_SUCCESS, 
	(evt:Event) => { 
		ViewAuthentication.show(false);
		ViewApp.appendTo('body:first');
		ViewApp.init();
		ViewApp.show(true); 
});