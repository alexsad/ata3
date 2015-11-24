export interface WebSocketMessage {
    body : string;
}

export declare class WebSocketJS{
  constructor(p_url_conection:string);
  connect(p_onConnect:()=>any,p_onError?:()=>any):void;
  disconnect():void;
  subscribe(p_relative_url:string,p_handler:(message:WebSocketMessage)=>any):void;
  send(p_relative_url:string,p_value:string):void;
  sendJSON(p_relative_url:string,p_object:Object):void;
  subscribeJSON(p_relative_url:string,p_handler:(message:Object)=>any):void;
}
