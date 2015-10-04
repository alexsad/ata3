import {IPerfil} from "./IPerfil";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
  "descricao":{
    type:String
    ,required:true
  }
  ,"comentario":{
    type:String
    ,required:true
  }
  ,"snAtivo":{
    type:String
    ,required:true
  }
  , "perfilAprovacao": [mongoose.Schema.Types.ObjectId]
  , "perfilLiberacao": [mongoose.Schema.Types.ObjectId]
  ,"menus":[{
    "icone":{
        type:String
        ,required:true
    }
    ,"label":{
        type:String
        ,required:true
    }
    ,"ordem":{
      type:Number
      ,required:true
    }
    ,"children":[{
      "label":{
        type:String
        }
        ,"funcao":{
          type:String
        }
        ,"tela":{
          type:String
        }
        ,"icone":{
          type:String
        }
        ,"ordem":{
        type:Number
      }
    }]
  }]
  ,"notificacoes":[{
    "descricao":{
      type:String
      ,required:true
    }
    , "mascara":{
      type:String
      ,required:true
    }
    , "dtInicial":{
      type:Date
      ,required:true
    }
    , "dtFinal":{
      type:Date
      ,required:true
    }
    , "limiteMax":{
      type:Number
      ,required:true
    }
    , "limiteMin":{
      type:Number
      ,required:true
    }
    ,"servicoList":{
      type:String
      ,required:true
    }
    ,"servicoListAct":{
      type:String
      ,required:true
    }
    ,"servicoCount":{
      type:String
      ,required:true
    }
    ,"tpNotificacao":{
      type:Number
      ,required:true
    }
  }]
});
export interface IPerfilModel extends IPerfil, mongoose.Document { };
export var PerfilDAO = mongoose.model<IPerfilModel>("Perfil", schema);
