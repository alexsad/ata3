import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TrimestreLancamentoAtividadeDAO = require("../model/trimestrelancamentoatividade");
import {ITrimestreLancamentoAtividade} from "../model/ITrimestre";

@Controller()
export class TrimestreLancamentoAtividade{
		@Get()
		get(req:express.Request,res:express.Response):void{
			TrimestreLancamentoAtividadeDAO.findAll().then(function(dta:ITrimestreLancamentoAtividade[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}	
		@Get("/getbyidtrimestre/:idtrimestre")
		getByIdTrimestre(req: express.Request, res: express.Response): void {
			TrimestreLancamentoAtividadeDAO.findAll({
				where:{
					idTrimestre:req.params.idtrimestre
				}
			}).then(function(dta: ITrimestreLancamentoAtividade[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		getTotalByIdTrimestreIdPerfil(p_idTrimestre:number,p_idPerfil:number){
			return TrimestreLancamentoAtividadeDAO.sum('valor', {
				where: {
					'id_trimestre': p_idTrimestre
					,'id_perfil':p_idPerfil
				}
			})
		}			
		@Post()
		add(req:express.Request,res:express.Response):void{
			var ntrimestrelancamentoatividade:ITrimestreLancamentoAtividade = <ITrimestreLancamentoAtividade>req.body;
			TrimestreLancamentoAtividadeDAO.create(ntrimestrelancamentoatividade).then(function(p_ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade) {
				res.json(p_ntrimestrelancamentoatividade.id);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}		
		@Put()
		atualizar(req:express.Request,res:express.Response):void{
			var ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade = <ITrimestreLancamentoAtividade>req.body;
			TrimestreLancamentoAtividadeDAO.upsert(ntrimestrelancamentoatividade).then(function(p_ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade) {
				res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Delete("/:id")
		delete(req:express.Request,res:express.Response):void{
			TrimestreLancamentoAtividadeDAO.destroy({
				where: {
					id:req.params.id
				}
			}).then(function(p_ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade) {
				res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		
}
