var mongoose = require("mongoose");
module.exports = function(){
	var Schema = mongoose.Schema;
	var schema = new Schema({
		"ano":{
			type:Number
			,required:true
		}
		, "nrTrimestre":{
			type:Number
			,required:true
		}
		, "snAberto":{
			type:String
			,required:true
		}
		,"datasLivres":[Date]
		,"lancamentosAtividade":[{	
			"valor":{
				type:Number
				,required:true
			}
			,"idOrganizacao":{
				type:Schema.ObjectId
				,required:true
			}
		}]
		,"atividades":[{
			"descricao":{
				type:String
				,required:true
			}
			, "detalhes":{
				type:String
				,required:true
			}
			, "local":{
				type:String
				,required:true
			}
			, "momento":{
				type:Date
				,required:true
			}
			, "hora":{
				type:String
				,required:true
			}
			, "idResponsavel":{
				type:Schema.ObjectId
				,required:true
			}
			, "orcamento":{
				type:Number
				,required:true
			}
			, "codRefMLS":{
				type:Number
			}
			, "publicoAlvo":{
				type:String
				,required:true
			}
			, "proposito":{
				type:String
				,required:true
			}
			, "idStatus":{
				type:Number
				,required:true
			}
			, "idOrganizacao":{
				type:Schema.ObjectId
				,required:true
			}
			, "dsObservacao":{
				type:String
				,required:true
			}
			, "vestuario":{
				type:String
				,required:true
			}
		}]
	});
	schema.virtual("dsTrimestre").get(function() {
		return this.nrTrimestre+"º de "+this.ano;
	});
	schema.set('toJSON', {
		virtuals: true
	}); 
	return mongoose.model("Trimestre",schema);
};