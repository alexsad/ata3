import {IAtividade} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");

var AtividadeDAO = sequelize.define('atividade', {
	"descricao": {
		type: sequelize.constructor.STRING
	}
	, "detalhes": {
		type: sequelize.constructor.STRING
	}
	, "local": {
		type: sequelize.constructor.STRING
	}
	, "momento": {
		type: sequelize.constructor.DATE
	}
	, "hora": {
		type: sequelize.constructor.STRING
	}
	, "idResponsavel": {
		type: sequelize.constructor.INTEGER
		,field:"id_responsavel"
	}
	, "idPerfil": {
		type: sequelize.constructor.INTEGER
		, field: "id_perfil"
	}
	, "idTrimestre": {
		type: sequelize.constructor.INTEGER
		, field: "id_trimestre"
	}
	, "orcamento": {
		type: sequelize.constructor.INTEGER
	}
	, "codRefMLS": {
		type: sequelize.constructor.INTEGER
		,field:"cod_ref_mls"
	}
	, "publicoAlvo": {
		type: sequelize.constructor.STRING
		, field: "publico_alvo"
	}
	, "proposito": {
		type: sequelize.constructor.STRING
	}
	, "idStatus": {
		type: sequelize.constructor.INTEGER
		, field:"id_status"
	}
	, "dsObservacao": {
		type: sequelize.constructor.STRING
		, field: "ds_observacao"
	}
	, "vestuario": {
		type: sequelize.constructor.STRING
	}
	, "snEditavel": {
		type: sequelize.constructor.STRING
		, field: "sn_editavel"
	}
	,"iconStatus": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING),
		get: function() {
			var idStatusTMP: number = this.get('idStatus');
			var tpAlert: string = "info";
			if (idStatusTMP == 3 || idStatusTMP == 6) {
				tpAlert = "danger";
			} else if (idStatusTMP == 5) {
				tpAlert = "warning";
			} else if (idStatusTMP == 7) {
				tpAlert = "success";
			};
			return tpAlert;
		}
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = AtividadeDAO;