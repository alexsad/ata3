import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import TrimestreDataLivreDAO = require("../model/trimestredatalivre");
import {ITrimestreDataLivre,IAtividade} from "../model/ITrimestre";
import {Atividade} from "./Atividade";

@Controller()
export class TrimestreDataLivre {
	@Get()
	get(req: express.Request, res: express.Response): void {
		TrimestreDataLivreDAO.findAll().then(function(dta: ITrimestreDataLivre[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getdisponiveisbyidtrimestre/:idtrimestre")
	getDisponiveisByIdTrimestre(req: express.Request, res: express.Response): void {
		var tmpAtivCtrl: Atividade = new Atividade();
		tmpAtivCtrl.getByIdTrimestre(req.params.idtrimestre).then(function(itatividades:IAtividade[]) {
			var tmpArray: number[] = [0];
			itatividades.forEach(function(itatividade:IAtividade){
				if (itatividade.idData) {
					tmpArray.push(itatividade.idData);
				};				
			});
			TrimestreDataLivreDAO.findAll({
				where: {
					idTrimestre: req.params.idtrimestre
					,snDisponivel: "S"
					,id:{
						$notIn: tmpArray
					}
				}
			}).then(function(dta: ITrimestreDataLivre[]) {
				res.json(dta);
			}).catch(function(err: any) {
				res.sendStatus(400).json(err);
			});
		}).catch(function(err: any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getbyidtrimestre/:idtrimestre")
	getByIdTrimestre(req: express.Request, res: express.Response): void {
		TrimestreDataLivreDAO.findAll({
			where: {
				idTrimestre: req.params.idtrimestre
			}
		}).then(function(dta: ITrimestreDataLivre[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.sendStatus(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var ntrimestredatalivre: ITrimestreDataLivre = <ITrimestreDataLivre>req.body;
		TrimestreDataLivreDAO.create(ntrimestredatalivre).then(function(p_ntrimestredatalivre: ITrimestreDataLivre) {
			res.json(p_ntrimestredatalivre.id);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var ntrimestredatalivre: ITrimestreDataLivre = <ITrimestreDataLivre>req.body;
		TrimestreDataLivreDAO.upsert(ntrimestredatalivre).then(function(p_ntrimestredatalivre: ITrimestreDataLivre) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		TrimestreDataLivreDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_ntrimestredatalivre: ITrimestreDataLivre) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
}
