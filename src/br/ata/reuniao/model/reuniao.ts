import {IReuniao} from "./IReuniao";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"momento":{
			type:Date
			,required:true
		}
		, "frequencia":{
			type:Number
			,required:true
		}
		, "obs":{
			type:String
			,required:true
		}
		,"discursos":[{
			"idMembro":{
				type:mongoose.Schema.Types.ObjectId
				,required:true
			}
			, "tempo":{
				type:Number
				,required:true
			}
			, "tema":{
				type:String
				,required:true
			}
			, "fonte":{
				type:String
				,required:true
			}
			, "linkFonte":{
				type:String
				,required:true
			}
		}]
});
export interface IReuniaoModel extends IReuniao, mongoose.Document { };
export var ReuniaoDAO = mongoose.model<IReuniaoModel>("Reuniao", schema);