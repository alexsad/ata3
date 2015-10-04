import {IOrganizacao} from "./IOrganizacao";
import mongoose = require("mongoose");

var schema = new mongoose.Schema({
		"descricao":{
			type:String
			,required:true
		}
});
export interface IOrganizacaoModel extends IOrganizacao, mongoose.Document { };
export var OrganizacaoDAO = mongoose.model<IOrganizacaoModel>("Organizacao", schema);
