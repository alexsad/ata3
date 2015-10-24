import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {OrganizacaoDAO} from "../model/organizacao";
import {IOrganizacao} from "../model/IOrganizacao";
import {IMembro} from "../model/IMembro";

@Controller()
class Organizacao{
	@Get()
	get(req:express.Request,res:express.Response):void{
		OrganizacaoDAO.find({}).exec().then(
			function(dta:IOrganizacao[]){
				res.json(dta);
			}
			,function(err){
				res.status(400).json(err);
			}
		);
	}
	@Get("/membro/getbysnativo/:p_snAtivo")
	getMembroBySnAtivo(req:express.Request,res:express.Response):void{
		OrganizacaoDAO.find(
			{"membro.snAtivo":"S"}
			,{_id: 0, 'membro.$': 1}
		).exec().then(
			function(dta:IOrganizacao[]){
				console.log(dta);
				res.json(dta);
			}
			,function(err:any){
				res.status(500).json(err);
			}
		);
	}
	@Post()
	add(req:express.Request,res:express.Response):void{
		var norganizacao:IOrganizacao = <IOrganizacao>req.body;
		OrganizacaoDAO.create(norganizacao).then(
			function(p_norganizacao:IOrganizacao) {
					res.json(p_norganizacao._id);
			}
			,function(error:any){
				if(error){
					res.status(400).json(error);
				}
			}
		);
	}
	@Put()
	atualizar(req:express.Request,res:express.Response):void{
		var p_organizacao:IOrganizacao = <IOrganizacao>req.body;
		var tmpId: string = p_organizacao._id;
		delete p_organizacao._id;
		OrganizacaoDAO.findByIdAndUpdate(tmpId, { $set: p_organizacao }, function(err) {
			if(err){
				res.status(400).json(err);
			}else{
				res.send(true);
			}
		});
	}
	@Delete("/:_id")
	delete(req:express.Request,res:express.Response):void{
		OrganizacaoDAO.findByIdAndRemove(req.params._id).exec().then(
			function(){
					res.send(true);
			}
			,function(err:any) {
					res.status(400).json(err);
			}
		);
	}
}
