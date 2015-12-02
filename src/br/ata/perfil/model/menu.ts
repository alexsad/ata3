import {IMenu,IItemMenu} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");
import ItemMenuDAO = require("../model/itemmenu");

var MenuDAO = sequelize.define('menu', {
    "icone": {
        type: sequelize.constructor.STRING
    }
    , "label": {
        type: sequelize.constructor.STRING
    }
    , "ordem": {
        type: sequelize.constructor.INTEGER
    }
    , "idPerfil": {
        type: sequelize.constructor.INTEGER
        , field: "id_perfil"
    }
}, {
        "timestamps": false
        , "freezeTableName": true
    });

MenuDAO.hasMany(ItemMenuDAO, { as: 'children', foreignKey: 'id_menu' });

export = MenuDAO;


