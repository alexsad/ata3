import {WebElement,IWebElementClass,System} from "lib/underas/core";
import {$http} from "lib/underas/http";
import {ModView,ModWindow} from "lib/underas/container";
import {IMenu, IItemMenu} from "../../perfil/model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import {UsuarioUploadAvatar} from "../../usuario/view/UsuarioUploadAvatar";


@WebElement({
	templateResource:"menu/view/assets/html/menu_adm"
	, styleResource: ["menu/view/assets/css/menu_adm"]
	//,noAutoRenderRefresh:true
})
class MenuAdmStatic implements IWebElementClass{
	private menus: IMenu[];
	private menu_selected: number;
	private usuarioPerfis: IUsuarioPerfil[];
	private idPerfilSelected: number;	
	public idUsuario: number;
	public loginUsuario: string;
	private perfisVisibles: boolean;
	private showMenus: boolean;
	public onChangePerfil: (p_idPerfil:number) => void;
	private _setAvatar: UsuarioUploadAvatar;
	private _avatarcache: number;
	constructor(){
		this.menu_selected = 0;
		this.menus = [];		
		this.usuarioPerfis = [];
		this.idPerfilSelected = 0;
		this.idUsuario=1;
		this.loginUsuario="alex.query";
		this.perfisVisibles = false;
		this._avatarcache = 0;
		this.showMenus = false;
	}
	private showMenu(p_on:boolean):void{
		this.showMenus = p_on;
	}
	appendTo(p_target:string):void{	
		(<IWebElementClass><any>this).renderTo(p_target);
	}
	setMenuIndex(p_index:number):void{
		this.perfisVisibles = false;
		this.menu_selected = p_index;
		this.showMenu(true);		
	}
	togleShowMenu():void{
		this.showMenus = !this.showMenus;
	}
	loadModule(p_module: string, p_title: string, p_icon: string,p_action:string):void{
		this.showMenu(false);
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
	private setUsuarioPerfis(p_usuarioPerfis: IUsuarioPerfil[]): void {
		this.usuarioPerfis = p_usuarioPerfis;
		this.idPerfilSelected = 0;		
		if(this.usuarioPerfis.length > 0){
			this.setIdPerfil(this.usuarioPerfis[0].idPerfil);
			this.getMenusByIdPerfil(this.usuarioPerfis[0].idPerfil);
		}
		//console.log(this.perfis);
	}
	setIdPerfil(p_idPerfil:number): void {
		this.idPerfilSelected = p_idPerfil;
		this.getMenusByIdPerfil(p_idPerfil);
		if(this.onChangePerfil){
			this.onChangePerfil(p_idPerfil);
		}		
	}
	getPerfisUsuarioByIdUsuario(p_idUsuario: number): void {		
		$http
			.get("usuarioperfil/getbyidusuario/" + p_idUsuario)
			.done((dta: IUsuarioPerfil[]) => this.setUsuarioPerfis(dta));
	}
	getMenusByIdPerfil(p_idPerfil: number): void {
		$http
			.get("menu/getfullbyidperfil/" + p_idPerfil)
			.done((dta: IMenu[]) => this.setMenu(dta));
	}
	showPerfis(){
		//console.log(this.perfisVisibles);
		this.perfisVisibles = !this.perfisVisibles;
	}
	onRender(p_ele:string):void{}
	private setAvatar(): void {
		if (!this._setAvatar) {
			this._setAvatar = new UsuarioUploadAvatar(this.idUsuario);
			$("body").append(this._setAvatar.$);
			this._setAvatar.$.on("avatarchanged",this.onChangeAvatar.bind(this));
		};
		this._setAvatar.show(true);
	}
	private onChangeAvatar():void{
		this._setAvatar.show(false);
		this._avatarcache = new Date().getTime();
	}
	
}


var MenuAdm: MenuAdmStatic = new MenuAdmStatic();
export = MenuAdm;