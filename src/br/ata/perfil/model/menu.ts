import {IMenu,IItemMenu} from "./IPerfil";
import sequelize = require("../../../../config/sequelizedb");

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
    , "children":{        
        type: sequelize.constructor.VIRTUAL
        ,get: function():IItemMenu[]{
            return this.getDataValue('children')||[];
        }
        , set: function(p_itemmenu: IItemMenu[]):void{
            this.setDataValue('children', p_itemmenu);
        }
    }
}, {
        "timestamps": false
        , "freezeTableName": true
    });

export = MenuDAO;


