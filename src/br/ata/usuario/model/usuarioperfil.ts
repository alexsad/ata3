import {IUsuarioPerfil} from "./IUsuario";
import PerfilDAO = require("../../perfil/model/perfil");
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

UsuarioPerfilDAO.belongsTo(PerfilDAO, { as: 'perfil', foreignKey: 'idPerfil' });


export = UsuarioPerfilDAO;
