export interface ITrimestre{
	id?:number;
	ano: number;
	nrTrimestre: number;
	snAberto:string;
	vtSaldo?: number;
	vtTotalLancado?: number;
}
export interface ITrimestreLancamentoAtividade {
	id?: number;
	idTrimestre: number;
	valor: number;
	idPerfil: number;
}
export interface ITrimestreDataLivre{
	id?: number;
	idTrimestre: number;
	momento:Date;
}
export interface IAtividade {
	id?: number;
	idTrimestre: number;
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
	vestuario: string;
	snEditavel?:string;
	iconStatus?:string;
}

export enum EAtividadeStatus{
	ELABORADA = 1
    ,ENVIADA = 2
    ,APROVADA = 3
    ,PENDENTE = 4 
    ,LIBERADA = 5  
}