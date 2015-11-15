import {ITrimestreLancamentoAtividade} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");

var TrimestreLancamentoAtividadeDAO = sequelize.define('trimestre_lancamento_atividade', {
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

export = TrimestreLancamentoAtividadeDAO;