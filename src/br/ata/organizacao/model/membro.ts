import {IMembro} from "./IMembro";
import sequelize = require("../../../../config/sequelizedb");

var MembroDAO = sequelize.define('membro', {
	"nome": {
		type: sequelize.constructor.STRING
	}
	, "sexo": {
		type: sequelize.constructor.STRING
	}
	, "telefone": {
		type: sequelize.constructor.STRING
	}
	, "celular": {
		type: sequelize.constructor.STRING
	}
	, "obs": {
		type: sequelize.constructor.STRING
	}
	, "snAtivo": {
		type: sequelize.constructor.STRING
		, field: "sn_ativo"
	}
	, "idOrganizacao": {
		type: sequelize.constructor.INTEGER
		, field: "id_organizacao"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = MembroDAO;
