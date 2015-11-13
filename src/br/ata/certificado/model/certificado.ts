import {ICertificado} from "./ICertificado";
import sequelize = require("../../../../config/sequelizedb");

var CertificadoDAO = sequelize.define('certificado', {
	validade: sequelize.constructor.DATE
	, pin: sequelize.constructor.STRING
}, {
		"timestamps": false
		, "freezeTableName": true
});

export = CertificadoDAO;