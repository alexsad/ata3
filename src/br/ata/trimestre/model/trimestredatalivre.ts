import {ITrimestreDataLivre} from "./ITrimestre";
import sequelize = require("../../../../config/sequelizedb");

var TrimestreDataLivreDAO = sequelize.define('trimestre_data_livre', {
	"momento": sequelize.constructor.DATE
	, "idTrimestre":{
		type: sequelize.constructor.INTEGER
		,field:"id_trimestre"
	}
}, {
		"timestamps": false
		, "freezeTableName": true
	});

export = TrimestreDataLivreDAO;
