import {IUsuarioPerfil} from "./IUsuario";
import sequelize = require("../../../../config/sequelizedb");

var UsuarioPerfilDAO = sequelize.define('usuario_perfil', {
	 "idUsuario": {
		type: sequelize.constructor.INTEGER
		, field: "id_usuario"
	}
	, "idPerfil": {
		type: sequelize.constructor.INTEGER
		, field: "id_perfil"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = UsuarioPerfilDAO;
