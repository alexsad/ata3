export interface ITrimestre{
	_id?:string;
	ano: number;
	nrTrimestre: number;
	snAberto:string;
	datasLivres: Date[];
	lancamentosAtividade: ILancamentosAtividade[];
	atividades: IAtividades[];
}
export interface IAtividades {

}

export interface ILancamentosAtividade{

}