import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import DiscursoDAO = require("../model/discurso");
import {IDiscurso} from "../model/IDiscurso";
import {IReuniao} from "../model/IReuniao";
import {Reuniao} from "./Reuniao";

@Controller()
export class Discurso {
	contteste: number;
	constructor(){
		this.contteste = 1;
	}
	@Get()
	get(req: express.Request, res: express.Response): void {
		DiscursoDAO.findAll().then(function(dta: IDiscurso[]) {
			this.contteste++;
			dta[0].tempo += this.contteste;
			res.json(dta);
		}.bind(this)).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	getByIdReuniao(p_idReuniao: number) {
		return DiscursoDAO.findAll({
			where: {
				idReuniao: p_idReuniao
			}
		});
	}	
	@Get("/getultimosdiscursos")
	getUltimosDiscursosTotal(req: express.Request, res: express.Response): void {
		var tmpReuniaoCtrl: Reuniao = new Reuniao();
		tmpReuniaoCtrl.getAtuais().then(
			function(dtaReuniao: IReuniao[]) {
				var tmpIdsReuniaoArray: number[] = [0];
				dtaReuniao.forEach(function(itReuniao:IReuniao){
					tmpIdsReuniaoArray.push(itReuniao.id);
				});
				DiscursoDAO.count({
					where: {
						idReuniao: {
							$in: tmpIdsReuniaoArray
						}
					}
				}).then(function(total:number) {
					res.json(total);
				}).catch(function(err: any) {
					res.sendStatus(400).json(err);
				});
				//res.json(dta);
			}
		).catch(function(err: any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getbyidreuniao/:idreuniao")
	getByIdReuniaoService(req: express.Request, res: express.Response): void {
		DiscursoDAO.findAll({
			where: {
				idReuniao: req.params.idreuniao
			}
		}).then(function(dta: IDiscurso[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.create(ndiscurso).then(function(p_ndiscurso: IDiscurso) {
			res.json(p_ndiscurso.id);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.upsert(ndiscurso).then(function(p_ndiscurso: IDiscurso) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		DiscursoDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_ndiscurso: IDiscurso) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}

}
