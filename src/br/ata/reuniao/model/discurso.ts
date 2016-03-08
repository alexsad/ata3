import MembroDAO = require("../../organizacao/model/membro");
import sequelize = require("../../../../config/sequelizedb");

var DiscursoDAO = sequelize.define('discurso', {
	"idReuniao": {
		type: sequelize.constructor.INTEGER
		, field: "id_reuniao"
	}
	,"idMembro": {
		type: sequelize.constructor.INTEGER
		, field: "id_membro"
	}
	, "tempo": {
		type: sequelize.constructor.INTEGER
		, required: true
	}
	, "tema": {
		type: sequelize.constructor.STRING
		, required: true
	}
	, "fonte": {
		type: sequelize.constructor.STRING
		, required: true
	}
	, "linkFonte": {
		type: sequelize.constructor.STRING
		, field: "link_fonte"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
});

DiscursoDAO.belongsTo(MembroDAO, { as: 'membro', foreignKey: 'idMembro' });


export = DiscursoDAO;