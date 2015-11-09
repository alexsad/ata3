import {ICertificado} from "./ICertificado";
import sequelize = require("../../../../config/sequelizedb");

var CertificadoDAO = sequelize.define('certificado', {
	validade: sequelize.constructor.DATE
	, pin: sequelize.constructor.STRING
});

export = CertificadoDAO;