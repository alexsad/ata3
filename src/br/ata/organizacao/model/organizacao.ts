import {IOrganizacao} from "./IOrganizacao";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"descricao":{
			type:String
			,required:true
		}
		,"membro":[{
			"nome":{
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
		}]
});
export interface IOrganizacaoModel extends IOrganizacao, mongoose.Document { };
export var OrganizacaoDAO = mongoose.model<IOrganizacaoModel>("Organizacao", schema);
