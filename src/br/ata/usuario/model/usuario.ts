import {IUsuario} from "./IUsuario";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"nmMembro":{
			type:String
			,required:true
		}
		,"login":{
			type:String
			,required:true
		}
		,"senha":{
			type:String
			,required:true
		}
		,"snAtivo":{
			type:String
			,required:true
		}
		,"sexo":{
			type:String
			,required:true
		}
		,"telefone":{
			type:String
			,required:true
		}
		,"celular":{
			type:String
			,required:true
		}
		,"obs":{
			type:String
			,required:true
		}
		,"idOrganizacao":{
			type:mongoose.Schema.Types.ObjectId
			,required:true
		}
		,"perfis":[mongoose.Schema.Types.ObjectId]
});
export interface IUsuarioModel extends IUsuario, mongoose.Document { };
export var UsuarioDAO = mongoose.model<IUsuarioModel>("Usuario", schema);