import {IItemMenu} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");

var ItemMenuDAO = sequelize.define('item_menu', {
  "label": {
    type: sequelize.constructor.STRING
  }
  , "funcao": {
    type: sequelize.constructor.STRING
  }
  , "tela": {
    type: sequelize.constructor.STRING
  }
  , "icone": {
    type: sequelize.constructor.STRING
  }
  , "ordem": {
    type: sequelize.constructor.INTEGER
  }
  , "idMenu": {
    type: sequelize.constructor.INTEGER
    ,field:"id_menu"
  }
}, {
    "timestamps": false
    , "freezeTableName": true
  });

export = ItemMenuDAO;


