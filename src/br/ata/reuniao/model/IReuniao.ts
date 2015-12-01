import {IDiscurso} from "./IDiscurso";
export interface IReuniao{
	id?:number;
	momento: Date;
	frequencia: number;
	obs: string;
	discursos?:IDiscurso[];
}
