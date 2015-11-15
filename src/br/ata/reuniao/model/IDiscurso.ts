export interface IDiscurso {
	id?: number;
	idReuniao: number;
	idMembro: number;
	nmMembro?: string;
	_ind?: number;
	tempo: number
	tema: string;
	fonte: string;
	linkFonte: string;
}