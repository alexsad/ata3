export interface IUsuario{
	_id?:string;
	nmMembro: string;
	login:string;
	senha: string;
	snAtivo: string;
	sexo: string;
	telefone: string;
	celular: string;
	obs: string;
	idOrganizacao: string;			
	perfis: string[];
}