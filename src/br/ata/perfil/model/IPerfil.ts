
export enum EPerfilAutorizacaoTP {
  APROVACAO, LIBERACAO
}

export interface IMenu{
  id?:number;
  icone:string;
  label:string;
  ordem:number;
  idPerfil: number;
  children?:IItemMenu[];
}

export interface IItemMenu{
  id?:number;
  _ind?:string;
  label:string;
  funcao:string;
  tela:string;
  icone:string;
  ordem:number;
  idMenu: number;
}
export interface IPerfilNotificacao {
  id?:number;
  idPerfil: number;
  descricao:string;
  mascara:string;
  dtInicial:Date;
  dtFinal:Date;
  limiteMax:number;
  limiteMin:number;
  servicoList:string;
  servicoListAcao:string;
  servicoContagem:string;
  tpNotificacao:number;
}
export interface IPerfil{
  id?:number;
  descricao:string;
  comentario:string;
  snAtivo:string;
  menus?:IMenu[];
  notificacoes?:IPerfilNotificacao[];
}

export interface IPerfilAutorizacao{
  id?: number;
  idPerfil: number;
  idPerfilAlvo: number;
  tpAutorizacao: EPerfilAutorizacaoTP;
}
