export interface IUsuario{
	id?:number;
	login:string;
	senha: string;
	snAtivo: string;		
	perfis: string[];
}

export interface IUsuarioPerfil {
	idUsuario: number;
	idPerfil: number;
}

