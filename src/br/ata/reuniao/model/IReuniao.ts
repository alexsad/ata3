export interface IDiscurso{
	_id?:string;
	idMembro: string;
	nmMembro?: string;
	_ind?: number;
	tempo:number
	tema: string;
	fonte: string;
	linkFonte: string;
	idReuniao?:string;
}
export interface IReuniao{
	_id?:string;
	momento: Date;
	frequencia: number;
	obs: string;
	discursos: IDiscurso[];
}
