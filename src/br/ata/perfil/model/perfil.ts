import {IPerfil} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");

var PerfilDAO = sequelize.define('perfil', {
  "descricao": {
    type: sequelize.constructor.STRING
  }
  , "comentario": {
    type: sequelize.constructor.STRING
  }
  , "snAtivo": {
    type: sequelize.constructor.STRING
    , field: "sn_ativo"
  }
}, {
    "timestamps": false
    , "freezeTableName": true
  });

export = PerfilDAO;
