import sequelize = require("../../../../config/sequelizedb");
import PerfilDAO = require("./perfil");

var PerfilAutorizacaoDAO = sequelize.define('perfil_autorizacao', {
	idPerfil:{
		type: sequelize.constructor.INTEGER
		,field:"id_perfil"
	}
	,idPerfilAlvo: {
		type: sequelize.constructor.INTEGER
		, field: "id_perfil_alvo"
	}
	, tpAutorizacao:{
		type: sequelize.constructor.INTEGER
		, field: "tp_autorizacao"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

PerfilAutorizacaoDAO.belongsTo(PerfilDAO, { as: 'perfil', foreignKey: 'idPerfilAlvo' });

export = PerfilAutorizacaoDAO;