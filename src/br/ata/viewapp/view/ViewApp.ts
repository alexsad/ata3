import {SystemApplication,ICustomComponent} from "lib/underas/core";
import {ViewPager,Tab, Box, StyleResource,Form} from "lib/underas/container";
import {LinkButton} from "lib/underas/button";
import {EViewSize, EBasicColorStatus} from "lib/underas/component";
import MenuAdm = require("../../menu/view/MenuAdm");
import {IItemMenu} from "../../perfil/model/IPerfil";

interface IBasicModule{
	onStart(): void;
}

@StyleResource("viewapp/view/assets/css/view_app")
class ViewAppStatic extends ViewPager {
	private tabApps:Tab;
	//public EVENT_AUTHENTICATION_SUCCESS: string = "AUTH:SUCCESS";
	constructor() {
		super();
		this.addStyleName("ViewApp");
	}
	init(): void {
		this.append(MenuAdm);
		
		this.tabApps = new Tab();
		this.tabApps.addStyleName("bg-primary");
		this.append(this.tabApps);

		(<ICustomComponent>MenuAdm).addEvent(MenuAdm.EVENT_SELECT_MODULE,(evt:Event,p_mod:IItemMenu)=>this.loadModule(p_mod))
		this.autoLoadModule();
	}
	private loadModule({label,funcao,icone,tela}:IItemMenu): void {
		var nextload: boolean = true;
		var moduleToLoad: string = tela;
		var varModuleToLoadTmpM: string[] = moduleToLoad.split(".");
		var varModuleToLoadTmp: string = varModuleToLoadTmpM[varModuleToLoadTmpM.length - 1];
		var varModuleToLoadTmpCapt: string = varModuleToLoadTmp;
		varModuleToLoadTmp = varModuleToLoadTmp.toLowerCase();
		if (nextload) {
			var urlModuleLoad: string = moduleToLoad;
			SystemApplication.loadModules([urlModuleLoad.replace(/\./g, "/")]
				,(_Form: any)=>{
					let tmp_Form:Box = new _Form[varModuleToLoadTmpCapt]();
					let tmpLink: LinkButton = new LinkButton(label);
					tmpLink.setIcon("glyphicon glyphicon-remove-sign");
					
					this.tabApps.append(tmpLink, tmp_Form,true);
					if (funcao){
						tmp_Form[funcao]();
					};
					if ((<IBasicModule><any>tmp_Form).onStart) {
						(<IBasicModule><any>tmp_Form).onStart();
					}					
				}
			);
		};
	}
	private autoLoadModule(): void {		
		let moduleToLoad: string = SystemApplication.getUrlParam("module");
		if (moduleToLoad){
			this.loadModule({
				label:""
				,funcao:""				
				,idMenu:0
				,tela: moduleToLoad
				,icone:""
				,ordem:0
			});
		}
		
		//this.fireEvent(this.EVENT_AUTHENTICATION_SUCCESS);
	}
}

var ViewApp: ViewAppStatic = new ViewAppStatic();
export = ViewApp; 