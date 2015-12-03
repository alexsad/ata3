import {IReuniao} from "./IReuniao";
import sequelize = require("../../../../config/sequelizedb");
import DiscursoDAO = require("../model/discurso");

var ReuniaoDAO = sequelize.define('reuniao', {
	"momento": sequelize.constructor.DATE
	, "frequencia": sequelize.constructor.INTEGER
	, "obs": sequelize.constructor.STRING
	, "dsData": {
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

ReuniaoDAO.hasMany(DiscursoDAO, {as: 'discursos', foreignKey: 'id_reuniao'});

export = ReuniaoDAO;
