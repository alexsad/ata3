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
	dsPerfil?: string;
}

