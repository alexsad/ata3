import {Render,ICustomComponent,EventEmitter} from "lib/underas/core";
import {ViewPager,Dialog} from "lib/underas/container";

import {$http} from "lib/underas/http";
import {IMenu, IItemMenu} from "../../perfil/model/IPerfil";
import {IUsuarioPerfil} from "../../usuario/model/IUsuario";
import {UsuarioUploadAvatar} from "../../usuario/view/UsuarioUploadAvatar";
import {Form} from "lib/underas/container";

@Render({
	templateResource:"menu/view/assets/html/menu_adm"
	, styleResource: ["menu/view/assets/css/menu_adm"]
	//,noAutoRenderRefresh:true
})
class MenuAdmStatic implements ICustomComponent{
	private menus: IMenu[];
	private menu_selected: number;
	private usuarioPerfis: IUsuarioPerfil[];
	private indPerfil: number;	
	private perfisVisibles: boolean;
	private showMenus: boolean;
	private _avatarcache: number;
	private _dialogAvatar: Dialog;
	public idUsuario: number;
	public loginUsuario: string;
	public onChangeModule: EventEmitter<IItemMenu> = new EventEmitter();
	public onChangePerfil: EventEmitter<number> = new EventEmitter();
	constructor(){
		this.menu_selected = 0;
		this.menus = [];		
		this.usuarioPerfis = [];
		this.indPerfil = 0;
		this.idUsuario=1;
		this.loginUsuario="alex.query";
		this.perfisVisibles = false;
		this._avatarcache = 0;
		this.showMenus = false;
	}
	private showMenu(p_on:boolean):void{
		this.showMenus = p_on;
	}
	private setMenuIndex(p_index:number):void{
		this.perfisVisibles = false;
		this.menu_selected = p_index;
		this.showMenu(true);		
	}
	private togleShowMenu():void{
		this.showMenus = !this.showMenus;
	}
	private loadModule(p_module: string, p_title: string, p_icon: string,p_action:string):void{
		this.showMenu(false);				
		let tmpMod:IItemMenu = {
			label: p_title
			,funcao: p_action
			,tela: p_module
			,icone: p_icon
			,ordem: 0
			,idMenu: 0
		};
		this.onChangeModule.emit(tmpMod);
	}
	private setMenu(p_menu:IMenu[]):void{
		this.menus = p_menu;
		this.menu_selected = 0;
	}
	private setUsuarioPerfis(p_usuarioPerfis: IUsuarioPerfil[]): void {
		this.usuarioPerfis = p_usuarioPerfis;
		this.indPerfil = 0;	
		if(this.usuarioPerfis.length > 0){
			this.setIdPerfil(this.usuarioPerfis[0].idPerfil);
			this.getMenusByIdPerfil(this.usuarioPerfis[0].idPerfil);
		}
		//console.log(this.perfis);
	}
	private setPerfil(p_index:number):void{
		this.indPerfil = p_index;
		this.setIdPerfil(this.usuarioPerfis[p_index].idPerfil);
		this.perfisVisibles = false;
	}
	private setIdPerfil(p_idPerfil:number): void {
		this.getMenusByIdPerfil(p_idPerfil);	
		this.onChangePerfil.emit(p_idPerfil);
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
		if (!this._dialogAvatar) {
			this._dialogAvatar = new Dialog("Escolha uma foto!", "");
			let _setAvatar = new UsuarioUploadAvatar(this.idUsuario);
			_setAvatar.addEvent(UsuarioUploadAvatar.EVENT_UPLOAD_SUCCESS,()=>{
				this._dialogAvatar.show(false);
				this._avatarcache = new Date().getTime();
			});
			this._dialogAvatar.append(_setAvatar);
			this.getViewPager().append(this._dialogAvatar);
		};
		this._dialogAvatar.show(true);
	}
	private getViewPager():ViewPager {
		return require("../../viewapp/view/ViewApp");
	}	
}

var MenuAdm: MenuAdmStatic = new MenuAdmStatic();
export = MenuAdm;