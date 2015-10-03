import {ITrimestre} from "./ITrimestre";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
	"ano": {
		type: Number
		, required: true
	}
	, "nrTrimestre": {
		type: Number
		, required: true
	}
	, "snAberto": {
		type: String
		, required: true
	}
	, "datasLivres": [Date]
	, "lancamentosAtividade": [{
		"valor": {
			type: Number
			, required: true
		}
		, "idOrganizacao": {
			type: mongoose.Schema.Types.ObjectId
			, required: true
		}
	}]
	, "atividades": [{
		"descricao": {
			type: String
			, required: true
		}
		, "detalhes": {
			type: String
			, required: true
		}
		, "local": {
			type: String
			, required: true
		}
		, "momento": {
			type: Date
			, required: true
		}
		, "hora": {
			type: String
			, required: true
		}
		, "idResponsavel": {
			type: mongoose.Schema.Types.ObjectId
			, required: true
		}
		, "orcamento": {
			type: Number
			, required: true
		}
		, "codRefMLS": {
			type: Number
		}
		, "publicoAlvo": {
			type: String
			, required: true
		}
		, "proposito": {
			type: String
			, required: true
		}
		, "idStatus": {
			type: Number
			, required: true
		}
		, "idOrganizacao": {
			type: mongoose.Schema.Types.ObjectId
			, required: true
		}
		, "dsObservacao": {
			type: String
			, required: true
		}
		, "vestuario": {
			type: String
			, required: true
		}
	}]
});

schema.virtual("dsTrimestre").get(function() {
	return this.nrTrimestre + "º de " + this.ano;
});
schema.set('toJSON', {
	virtuals: true
});

export interface ITrimestreModel extends ITrimestre, mongoose.Document { };
export var TrimestreDAO = mongoose.model<ITrimestreModel>("Trimestre", schema);