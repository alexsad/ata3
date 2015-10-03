export interface IOrganizacao{
	_id?:string;
	descricao:string;
	perfilAprovacao: string[];
	perfilLiberacao: string[];
}
export interface IOrganizacaoPerfil {
	idPerfil: string;
	descricao: string;
}