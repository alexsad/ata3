export interface ITrimestre{
	_id?:string;
	ano: number;
	nrTrimestre: number;
	snAberto:string;
	datasLivres: Date[];
	trimestreLancamentoAtividade: ITrimestreLancamentoAtividade[];
	atividades: IAtividades[];
}
export interface IAtividades {

}

export interface ITrimestreLancamentoAtividade {
	_id?: string;
	valor: number;
	idPerfil: string;
}