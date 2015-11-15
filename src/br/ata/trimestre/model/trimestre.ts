
import {ITrimestre} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");

var TrimestreDAO = sequelize.define('trimestre', {
	"ano": {
		type: sequelize.constructor.INTEGER
	}
	, "nrTrimestre": {
		type: sequelize.constructor.INTEGER
		, field: "nr_trimestre"
	}
	, "snAberto": {
		type: sequelize.constructor.STRING
		, field: "sn_aberto"
	}
	, "vtSaldo": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.INTEGER)
		, set: function(p_vl: number) {
			this.setDataValue('vtSaldo', p_vl);
		}
	}
	, "vtTotalLancado": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.INTEGER)
		, set: function(p_vl: number) {
			this.setDataValue('vtTotalLancado', p_vl);
		}
	}
	, "dsTrimestre": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING),
		get: function() {
			return this.get('nrTrimestre') + "º de " + this.get('ano');
		}
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = TrimestreDAO;
