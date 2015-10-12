export interface ITrimestre{
	_id?:string;
	ano: number;
	nrTrimestre: number;
	snAberto:string;
	datasLivres: Date[];
	trimestreLancamentoAtividade: ITrimestreLancamentoAtividade[];
	atividades: IAtividade[];
	vtSaldo?: number;
	vtTotalLancado?: number;
}
export interface ITrimestreLancamentoAtividade {
	_id?: string;
	valor: number;
	idPerfil: string;
}
export interface ITrimestreDataLivre{
	idData:number;
	momento:Date;
}
export interface IAtividade {
	_id?: string;
	descricao:  string;
	detalhes:string;
	local:string;
	momento: Date;
	hora: string;
	idResponsavel:string;
	idPerfil: string;
	orcamento:number;
	codRefMLS: number;
	publicoAlvo:string;
	proposito:string;
	idStatus: number;
	dsObservacao: string;
	vestuario: string
}

export enum EAtividadeStatus{
	ELABORADA = 1
    ,ENVIADA = 2
    ,REPROVADA = 3
    ,APROVADA = 4
    ,PENDENTE = 5
    ,CANCELADA = 6  
    ,LIBERADA = 7  
}