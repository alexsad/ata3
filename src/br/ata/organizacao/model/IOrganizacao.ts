import {IMembro} from "./IMembro";

export interface IOrganizacao{
	_id?:string;
	descricao:string;
	membro:IMembro[];
}
