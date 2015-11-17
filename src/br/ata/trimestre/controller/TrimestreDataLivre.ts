import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router";
import TrimestreDataLivreDAO = require("../model/trimestredatalivre");
import {ITrimestreDataLivre} from "../model/ITrimestre";

@Controller()
export class TrimestreDataLivre {
	@Get()
	get(req: express.Request, res: express.Response): void {
		TrimestreDataLivreDAO.findAll().then(function(dta: ITrimestreDataLivre[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
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
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var ntrimestredatalivre: ITrimestreDataLivre = <ITrimestreDataLivre>req.body;
		TrimestreDataLivreDAO.create(ntrimestredatalivre).then(function(p_ntrimestredatalivre: ITrimestreDataLivre) {
			res.json(p_ntrimestredatalivre.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var ntrimestredatalivre: ITrimestreDataLivre = <ITrimestreDataLivre>req.body;
		TrimestreDataLivreDAO.upsert(ntrimestredatalivre).then(function(p_ntrimestredatalivre: ITrimestreDataLivre) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
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
			res.status(400).json(err);
		});
	}
	deleteByData(p_data:Date){
		return 	TrimestreDataLivreDAO.destroy({
				where: {
					momento:p_data
				}
			});
	}
}
