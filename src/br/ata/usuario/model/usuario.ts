import {IUsuario} from "./IUsuario";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"login":{
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
		,"perfis":[mongoose.Schema.Types.ObjectId]
});
export interface IUsuarioModel extends IUsuario, mongoose.Document { };
export var UsuarioDAO = mongoose.model<IUsuarioModel>("Usuario", schema);
