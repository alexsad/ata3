import {ICertificado} from "./ICertificado";
import sequelize = require("../../../../config/sequelizedb");

var CertificadoDAO = sequelize.define('certificado', {
	validade: sequelize.constructor.DATE
	, pin: sequelize.constructor.STRING
});

export = CertificadoDAO;

//sequelize.define


//export interface CertificadoDAO extends sequelize.Instance<CertificadoDAO, RolePojo>, ICertificado { }
