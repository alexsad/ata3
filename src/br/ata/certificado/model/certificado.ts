import {ICertificado} from "./ICertificado";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"validade":{
			type:Date
			,required:true
		}
		, "pin":{
			type:String
			,required:true
		}
});
export interface ICertificadoModel extends ICertificado, mongoose.Document { };
export var CertificadoDAO = mongoose.model<ICertificadoModel>("Certificado", schema);