import {Render,ICustomComponent} from "lib/underas/core";
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
	private idPerfilSelected: number;	
	public idUsuario: number;
	public loginUsuario: string;
	private perfisVisibles: boolean;
	private showMenus: boolean;
	private _setAvatar: UsuarioUploadAvatar;
	private _avatarcache: number;
	public EVENT_CHANGE_PERFIL: string = "perfil:change";
	public EVENT_SELECT_MODULE: string = "module:click";
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
		(<ICustomComponent>this).fireEvent(this.EVENT_SELECT_MODULE,tmpMod);
	}
	private setMenu(p_menu:IMenu[]):void{
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
		(<ICustomComponent>this).fireEvent(this.EVENT_CHANGE_PERFIL,p_idPerfil);
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
			//$("body").append(this._setAvatar.$);
			//this._setAvatar.$.on("avatarchanged",this.onChangeAvatar.bind(this));
		};
		//this._setAvatar.show(true);
	}
	private onChangeAvatar():void{
		//this._setAvatar.show(false);
		this._avatarcache = new Date().getTime();
	}	
}

var MenuAdm: MenuAdmStatic = new MenuAdmStatic();
export = MenuAdm;