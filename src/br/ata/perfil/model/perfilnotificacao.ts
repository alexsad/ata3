import {IPerfilNotificacao} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");

var PerfilNotificacaoDAO = sequelize.define('perfil_notificacao', {
  "idPerfil":{
    type: sequelize.constructor.INTEGER
    ,field:"id_perfil"
  }
  ,"descricao":{
    type: sequelize.constructor.STRING
  }
  ,"mascara":{
    type: sequelize.constructor.STRING
  }
  ,"dtInicial":{
    type: sequelize.constructor.DATE
    ,field:"dt_inicial"
  }
  ,"dtFinal":{
    type: sequelize.constructor.DATE
    ,field:"dt_final"
  }
  ,"limiteMax":{
    type: sequelize.constructor.INTEGER
    ,field:"limite_max"
  }
  ,"limiteMin":{
    type: sequelize.constructor.INTEGER
    ,field:"limite_min"
  }
  ,"modulo":{
    type: sequelize.constructor.STRING
  }
  ,"moduloAcao":{
    type: sequelize.constructor.STRING
    ,field:"modulo_acao"
  }
  , "moduloIcone": {
    type: sequelize.constructor.STRING
    , field: "modulo_icone"
  }
  ,"servicoContagem":{
    type: sequelize.constructor.STRING
    ,field:"servico_contagem"
  }
  , "icone": {
    type: sequelize.constructor.STRING
  }  
  ,"tpNotificacao":{
    type: sequelize.constructor.INTEGER
    ,field:"tp_notificacao"
  }
}, {
    "timestamps": false
    , "freezeTableName": true
  });

export = PerfilNotificacaoDAO;
