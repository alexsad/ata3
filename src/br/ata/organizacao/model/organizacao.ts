import {IOrganizacao} from "./IOrganizacao";
import sequelize = require("../../../../config/sequelizedb");

var OrganizacaoDAO = sequelize.define('organizacao', {
	descricao: sequelize.constructor.STRING
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = OrganizacaoDAO;