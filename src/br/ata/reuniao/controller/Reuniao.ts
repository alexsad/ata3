import express = require('express');
import url = require('url');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import ReuniaoDAO = require("../model/reuniao");
import {IReuniao} from "../model/IReuniao";

@Controller()
export class Reuniao {
	@Get()
	get(req: express.Request, res: express.Response): void {
		ReuniaoDAO.findAll().then(function(dta: IReuniao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getbyperiodo")
	getByPeriodo(req: express.Request, res: express.Response):void{
		var queryParams = url.parse(req.url, true).query;
		ReuniaoDAO.findAll({
			order: [
				["momento","asc"]
			]
			,where:{
				"momento": { $between: [
					new Date(queryParams.inicio)
					, new Date(queryParams.fim)
				] }
			}
		}).then(
			function(dta: IReuniao[]) {
				res.json(dta);
			}
		).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getatuais")
	getAtuaisServico(req: express.Request, res: express.Response) {
		ReuniaoDAO.findAll({
			order: [
				["momento", "asc"]
			]
			, where: {
				"momento": {
					$gte: new Date()
				}
			}
		}).then(
			function(dta: IReuniao[]) {
				res.json(dta);
			}
		).catch(function(err: any) {
			res.sendStatus(400).json(err);
		});
	}	
	getAtuais() {
		return ReuniaoDAO.findAll({
			order: [
				["momento", "asc"]
			]
			, where: {
				"momento": {
					$gte: new Date()
				}
			}
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nreuniao: IReuniao = <IReuniao>req.body;
		ReuniaoDAO.create(nreuniao).then(function(p_nreuniao: IReuniao) {
			res.json(p_nreuniao.id);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nreuniao: IReuniao = <IReuniao>req.body;
		ReuniaoDAO.upsert(nreuniao).then(function(p_nreuniao: IReuniao) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		ReuniaoDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nreuniao: IReuniao) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}

}
