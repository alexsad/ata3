import {ITrimestreDataLivre} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");

var TrimestreDataLivreDAO = sequelize.define('trimestre_data_livre', {
	"momento": sequelize.constructor.DATE
	,"idTrimestre":{
		type: sequelize.constructor.INTEGER
		,field:"id_trimestre"
	}
	,"dsData": {
		type: sequelize.constructor.VIRTUAL(sequelize.constructor.STRING)
		, get: function(): string {
			var tmpDiaSemana: string[] = [
				'Domingo', 'Segunda-Feira', 'Terca-Feira'
				, 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'
				, 'Sabado'
			];			
			var tmpData: Date = this.get('momento');
			var tmpDataSimples: string = tmpData.toISOString();
			tmpDataSimples = tmpDataSimples.replace(/^(\d{4})\D(\d{1,2})\D(\d{1,2})\D.*/, "$3-$2-$1");
			tmpDataSimples += " - " + tmpDiaSemana[tmpData.getDay()];			
			return tmpDataSimples;
		}
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = TrimestreDataLivreDAO;
