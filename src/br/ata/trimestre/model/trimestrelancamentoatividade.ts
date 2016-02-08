import PerfilAR = require("../../perfil/model/perfil");
import sequelize = require("../../../../config/sequelizedb");

var TrimestreLancamentoAtividadeAR = sequelize.define('trimestre_lancamento_atividade', {
	"idTrimestre": {
		type:sequelize.constructor.INTEGER
		,field:"id_trimestre"
	}
	, "valor": {
		type: sequelize.constructor.INTEGER
		, field: "valor"
	}	
	, "idPerfil": {
		type: sequelize.constructor.INTEGER
		, field: "id_perfil"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

TrimestreLancamentoAtividadeAR.belongsTo(PerfilAR, { as: 'perfil', foreignKey: 'idPerfil' });

//DiscursoDAO.belongsTo(MembroDAO, { as: 'membro', foreignKey: 'id_membro' });

export = TrimestreLancamentoAtividadeAR;