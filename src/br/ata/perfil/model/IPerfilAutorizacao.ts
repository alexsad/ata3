export enum EPerfilAutorizacaoTP {
	APROVACAO, LIBERACAO
}
export interface IPerfilAutorizacao {
	id?: number;
	idPerfil: number;
	idPerfilAlvo: number;
	tpAutorizacao: EPerfilAutorizacaoTP;
}