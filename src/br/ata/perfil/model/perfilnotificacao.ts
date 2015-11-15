import {IPerfilNotificacao} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");

var PerfilNotificacaoDAO = sequelize.define('perfil_notificacao', {
  "descricao": {
    type: sequelize.constructor.STRING
  }
  , "mascara": {
    type: sequelize.constructor.STRING
  }
  , "dtInicial": {
    type: sequelize.constructor.DATE
    , field: "dt_inicial"
  }
  , "dtFinal": {
    type: sequelize.constructor.DATE
    , field: "dt_final"
  }
  , "limiteMax": {
    type: sequelize.constructor.INTEGER
    , field: "limite_max"
  }
  , "limiteMin": {
    type: sequelize.constructor.INTEGER
    , field: "limite_min"
  }
  , "servicoList": {
    type: sequelize.constructor.STRING
    , field: "servico_list"
  }
  , "servicoListAct": {
    type: sequelize.constructor.STRING
    , field: "servico_list_act"
  }
  , "servicoCount": {
    type: sequelize.constructor.STRING
    , field: "servico_count"
  }
  , "tpNotificacao": {
    type: sequelize.constructor.INTEGER
    , field: "tp_notificacao"
  }
  , "idPerfil": {
    type: sequelize.constructor.INTEGER
    , field: "id_perfil"
  }
}, {
    "timestamps": false
    , "freezeTableName": true
  });

export = PerfilNotificacaoDAO;