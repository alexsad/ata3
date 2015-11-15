import {IUsuario} from "./IUsuario";
import sequelize = require("../../../../config/sequelizedb");

var UsuarioDAO = sequelize.define('usuario', {
	"login": {
		type: sequelize.constructor.STRING
	}
	,"senha": {
		type: sequelize.constructor.STRING
	}
	,"snAtivo": {
		type: sequelize.constructor.STRING
		, field: "sn_ativo"
	}
}, {
	"timestamps": false
	, "freezeTableName": true
});

export = UsuarioDAO;
