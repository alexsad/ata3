import {ITrimestre} from "./ITrimestre";
import mongoose = require("mongoose");

var atividadeSchema = new mongoose.Schema({
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
	, "idPerfil": {
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
	, "dsObservacao": {
		type: String
		, required: true
	}
	, "vestuario": {
		type: String
		, required: true
	}
	, "snEditavel": {
		type: String
		, required: true
	}
	
});


atividadeSchema.virtual("iconStatus").get(function() {
	var tpAlert:string = "info";
	if (this.idStatus == 3 || this.idStatus == 6) {
		tpAlert = "danger";
	} else if (this.idStatus == 5) {
		tpAlert = "warning";
	} else if (this.idStatus == 7) {
		tpAlert = "success";
	};
	return tpAlert;
});



atividadeSchema.set('toJSON', {
	virtuals: true
});


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
	, "trimestreLancamentoAtividade": [{
		"valor": {
			type: Number
			, required: true
		}
		,"idPerfil":{
			type: mongoose.Schema.Types.ObjectId
			,required: true
		}
	}]
	, "atividades": [atividadeSchema]
	, "vtSaldo": {
		type: Number
		, required: false
	}
	, "vtTotalLancado": {
		type: Number
		, required: false
	}
});

schema.virtual("dsTrimestre").get(function() {
	return this.nrTrimestre + "º de " + this.ano;
});



/*
schema.virtual("atividades.iconStatus").get(function() {
	var tpAlert:string = "info";
	if (this.idStatus == 3 || this.idStatus == 6) {
		tpAlert = "danger";
	} else if (this.idStatus == 5) {
		tpAlert = "warning";
	} else if (this.idStatus == 7) {
		tpAlert = "success";
	};
	return tpAlert;
});
*/



schema.set('toJSON', {
	virtuals: true
});

export interface ITrimestreModel extends ITrimestre, mongoose.Document { };
export var TrimestreDAO = mongoose.model<ITrimestreModel>("Trimestre", schema);