import {IReuniao} from "./IReuniao";
import sequelize = require("../../../../config/sequelizedb");
import DiscursoDAO = require("../model/discurso");

var ReuniaoDAO = sequelize.define('reuniao', {
	momento: sequelize.constructor.DATE
	, frequencia: sequelize.constructor.INTEGER
	, obs: sequelize.constructor.STRING
}, {
		"timestamps": false
		, "freezeTableName": true
	});

ReuniaoDAO.hasMany(DiscursoDAO, {as: 'discursos', foreignKey: 'id_reuniao'});

export = ReuniaoDAO;
