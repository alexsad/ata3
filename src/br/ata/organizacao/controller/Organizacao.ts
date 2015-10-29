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
			,function(err:any){
				res.status(400).json(err);
			}
		);
	}
	@Get("/membro/getbysnativo/:p_snAtivo")
	getMembroBySnAtivo(req:express.Request,res:express.Response):void{
		OrganizacaoDAO.aggregate([
		{$unwind: "$membro"}
		,{ $match: {
					 "membro.snAtivo": req.params.p_snAtivo
		}}
    ,{$project:
     {
			 	_id:"$membro._id"
				,nome: "$membro.nome"
				,sexo: "$membro.sexo"
				,telefone: "$membro.telefone"
				,celular: "$membro.celular"
				,obs: "$membro.obs"
				,snAtivo: "$membro.snAtivo"
     }
   	}
	], function (err:any, tmpLstMembros:IMembro[]) {
        if (err) {
          	res.status(500).json(err);
        };
				res.json(tmpLstMembros);
    })
	}
	@Get("/membro/getbysnativo_old/:p_snAtivo")
	getMembroBySnAtivo_(req:express.Request,res:express.Response):void{
		OrganizacaoDAO.find(
			{"membro.snAtivo":"S"}
		).exec().then(
			function(dta:IOrganizacao[]){
				var tmpLstMembros: IMembro[] = [];
				dta.forEach(function(itemOrg:IOrganizacao):void{
					itemOrg.membro.forEach(function(itemMemb:IMembro):void{
						if(itemMemb.snAtivo=="S"){
							tmpLstMembros.push(itemMemb);
						};
					});
				});
				//console.log(tmpLstMembros);
				res.json(tmpLstMembros);
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
	@Post("/membro/:idOrganizacao")
	adicionarMembro(req: express.Request, res: express.Response): void {
		var p_membro: IMembro = <IMembro>req.body;
		OrganizacaoDAO.findById(req.params.idOrganizacao, function(err: any, data: IOrganizacao) {
			if (err) {
				res.status(400).json(err);
			} else {
				var newdoc: IMembro = <IMembro>data.membro["create"](p_membro);
				data.membro.push(newdoc);
				//console.log(p_membro);
				data["save"](function(err2: any) {
					if (err2) {
						res.status(400).json(err2);
					} else {
						res.send(newdoc._id);
					};
				});
			};
		});
	}
	@Put()
	atualizar(req:express.Request,res:express.Response):void{
		var p_organizacao:IOrganizacao = <IOrganizacao>req.body;
		var tmpId: string = p_organizacao._id;
		delete p_organizacao._id;
		OrganizacaoDAO.findByIdAndUpdate(tmpId, { $set: p_organizacao }, function(err:any) {
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
