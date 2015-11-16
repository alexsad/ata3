import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import PerfilAutorizacaoDAO = require("../model/perfilautorizacao");
import {IPerfilAutorizacao,EPerfilAutorizacaoTP} from "../model/IPerfil";

@Controller()
export class PerfilAutorizacao{
	@Get()
	get(req:express.Request,res:express.Response):void{
		PerfilAutorizacaoDAO.findAll().then(function(dta:IPerfilAutorizacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidperfil/:idperfil")
	getByIdPerfil(req: express.Request, res: express.Response): void {
		PerfilAutorizacaoDAO.findAll({
			where:{
				idPerfil:req.params.idperfil
			}
		}).then(function(dta: IPerfilAutorizacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}	
	getByIdPerfilTpAutorizacao(p_idPerfil:number,p_tpAutorizacao:EPerfilAutorizacaoTP){
		return PerfilAutorizacaoDAO.findAll({
			where: {
				idPerfil: p_idPerfil
				, tpAutorizacao:p_tpAutorizacao
			}
		});
	}	
	@Post()
	add(req:express.Request,res:express.Response):void{
		var nperfilautorizacao:IPerfilAutorizacao = <IPerfilAutorizacao>req.body;
		PerfilAutorizacaoDAO.create(nperfilautorizacao).then(function(p_nperfilautorizacao: IPerfilAutorizacao) {
			res.json(p_nperfilautorizacao.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}		
	@Put()
	atualizar(req:express.Request,res:express.Response):void{
		var nperfilautorizacao: IPerfilAutorizacao = <IPerfilAutorizacao>req.body;
		PerfilAutorizacaoDAO.upsert(nperfilautorizacao).then(function(p_nperfilautorizacao: IPerfilAutorizacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req:express.Request,res:express.Response):void{
		PerfilAutorizacaoDAO.destroy({
			where: {
				id:req.params.id
			}
		}).then(function(p_nperfilautorizacao: IPerfilAutorizacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
		
}
