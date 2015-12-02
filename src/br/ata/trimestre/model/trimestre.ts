import {ITrimestre} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");
import AtividadeDAO = require("../model/atividade");

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
		type: sequelize.constructor.VIRTUAL
		, get: function(): number {
			return this.getDataValue('vtSaldo') || 0;
		}
		,set:function(p_vl: number) {
			this.setDataValue('vtSaldo', p_vl);
		}
	}
	, "vtTotalLancado": {
		type: sequelize.constructor.VIRTUAL
		,get:function():number{
			return this.getDataValue('vtTotalLancado') || 0;
		}
		,set:function(p_vl: number){
			this.setDataValue('vtTotalLancado', p_vl);
		}
	}
	, "dsTrimestre": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING),
		get: function():string{
			return this.get('nrTrimestre') + "º de " + this.get('ano');
		}
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

TrimestreDAO.hasMany(AtividadeDAO, { as: 'atividades', foreignKey: 'id_trimestre' });

export = TrimestreDAO;