export interface IMenu{
  _id?:string;
  icone:string;
  label:string;
  ordem:number;
  children:IItemMenu[];
}

export interface IItemMenu{
  _id?:string;
  _ind?:string;
  label:string;
  funcao:string;
  tela:string;
  icone:string;
  ordem:number;
}
export interface INotificacao{
  _id?:string;
  descricao:string;
  mascara:string;
  dtInicial:Date;
  dtFinal:Date;
  limiteMax:number;
  limiteMin:number;
  servicoList:string;
  servicoListAct:string;
  servicoCount:string;
  tpNotificacao:number;
}
export interface IPerfil{
  _id?:string;
  descricao:string;
  comentario:string;
  snAtivo:string;
  menus:IMenu[];
  notificacoes:INotificacao[];
}
