import {IAtividade, EAtividadeStatus} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");
import TrimestreDataLivreDAO = require("../model/trimestredatalivre");

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
	, "idData": {
		type: sequelize.constructor.INTEGER
		,field:"id_data"
	}
	, "hora": {
		type: sequelize.constructor.STRING
	}
	, "idResponsavel": {
		type: sequelize.constructor.INTEGER
		,field:"id_responsavel"
	}
	, "idOrganizacao": {
		type: sequelize.constructor.INTEGER
		, field: "id_organizacao"
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
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING)
		,get: function(): string {
			var idStatusn: number = this.get('idStatus');
			var strSnEditavel:string = "N";
			if(idStatusn==EAtividadeStatus.PENDENTE||idStatusn==EAtividadeStatus.ELABORADA){
				strSnEditavel = "S";
			};
			return strSnEditavel;
		}
	}
	,"iconStatus": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING),
		get: function() {
			var idStatusTMP: number = this.get('idStatus');
			var tpAlert: string = "info";
			if (idStatusTMP == EAtividadeStatus.PENDENTE) {
				tpAlert = "danger";
			} else if (idStatusTMP == EAtividadeStatus.ENVIADA) {
				tpAlert = "warning";
			} else if (idStatusTMP == EAtividadeStatus.LIBERADA) {
				tpAlert = "success";
			};
			return tpAlert;
		}
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});
	
TrimestreDataLivreDAO.belongsTo(AtividadeDAO,{
		as: 'datalivre', foreignKey: 'id'
});	
AtividadeDAO.hasOne(TrimestreDataLivreDAO, {as: 'datalivre', foreignKey: 'id'});


export = AtividadeDAO;
