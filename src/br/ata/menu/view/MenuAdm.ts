import {WebElement,IWebElementClass,System} from "lib/underas/core";
import {RequestManager} from "lib/underas/net";
import {ModView,ModWindow} from "lib/underas/container";
import {IMenu, IItemMenu} from "../../perfil/model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";

@WebElement({
	templateResource:"menu/view/assets/html/menu_adm_simples"
	, styleResource: ["menu/view/assets/css/menu_adm"]
	//,noAutoRenderRefresh:true
})
class MenuAdmStatic implements IWebElementClass{
	public menus: IMenu[];
	public menu_selected: number;
	public perfis: IUsuarioPerfil[];
	public idPerfilSelected: number;	
	public idUsuario: number;
	public loginUsuario: string;
	public perfisVisibles: boolean;
	constructor(){
		this.menus = [];
		this.menu_selected = 0;
		this.perfis = [];
		this.idPerfilSelected = 0;
		this.idUsuario=1;
		this.loginUsuario="alex.query";
		this.perfisVisibles = false;
	}
	appendTo(p_target:string):void{	
		(<IWebElementClass><any>this).renderTo(p_target);
	}
	setMenuIndex(p_index:number):void{
		this.perfisVisibles = false;
		this.menu_selected = p_index;		
	}
	loadModule(p_module: string, p_title: string, p_icon: string,p_action:string):void{
		
		var nextload: boolean = true;
		var moduleToLoad: string = p_module;
		var varModuleToLoadTmpM: string[] = moduleToLoad.split(".");
		var varModuleToLoadTmp: string = varModuleToLoadTmpM[varModuleToLoadTmpM.length - 1];
		var varModuleToLoadTmpCapt: string = varModuleToLoadTmp;
		varModuleToLoadTmp = varModuleToLoadTmp.toLowerCase();
		if (nextload) {				
			var urlModuleLoad: string = moduleToLoad;
			System.loadModules([urlModuleLoad.replace(/\./g, "/")]
				, function( _modwindow: any) {
					var tmp_modwindow:ModWindow = new _modwindow[varModuleToLoadTmpCapt]();
					tmp_modwindow.setRevision("1.0.0");
					tmp_modwindow.setUrlModule(p_module);
					var mdw_tmp = new ModView(p_title);
					mdw_tmp.setIcon(p_icon);
					mdw_tmp.show(true);
					mdw_tmp.append(tmp_modwindow);
					if (p_action) {
						tmp_modwindow[p_action]();
					};
				}
			);
		};
	}
	setMenu(p_menu:IMenu[]):void{
		this.menus = p_menu;
		this.menu_selected = 0;
	}
	setPerfis(p_perfis: IUsuarioPerfil[]): void {
		this.perfis = p_perfis;
		this.idPerfilSelected = 0;
	}
	setIdPerfil(p_idPerfil:number): void {
		this.idPerfilSelected = p_idPerfil;
		this.getMenusByIdPerfil(p_idPerfil);
	}
	getMenusByIdPerfil(p_idPerfil: number): void {		
		RequestManager.addRequest({
			"url": "menu/getfullbyidperfil/" + p_idPerfil,
			"onLoad": function(dta: IMenu[]) {							
				this.setMenu(dta);
			}.bind(this)
		});
	}
	showPerfis(){
		//console.log(this.perfisVisibles);
		this.perfisVisibles = !this.perfisVisibles;
	}
	onRender(p_ele:JQuery):void{}
	
}


var MenuAdm: MenuAdmStatic = new MenuAdmStatic();
export = MenuAdm;