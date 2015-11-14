import {IReuniao} from "./IReuniao";
import sequelize = require("../../../../config/sequelizedb");

var ReuniaoDAO = sequelize.define('reuniao', {
	momento: sequelize.constructor.DATE
	, frequencia: sequelize.constructor.INTEGER
	, obs: sequelize.constructor.STRING
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = ReuniaoDAO;