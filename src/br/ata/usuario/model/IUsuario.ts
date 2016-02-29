import {IPerfil} from "../../perfil/model/IPerfil";

export interface IUsuario{
	id?:number;
	login:string;
	senha: string;
	snAtivo: string;		
	perfis: string[];
}

export interface IUsuarioPerfil {
	id?: number;
	idUsuario: number;
	idPerfil: number;
	perfil?: IPerfil;
}

