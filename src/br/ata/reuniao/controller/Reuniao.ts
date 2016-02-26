import server = require('../../../../service/RestServer');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import ReuniaoDAO = require("../model/reuniao");
import {IReuniao} from "../model/IReuniao";
import DiscursoDAO = require("../model/discurso");
import MembroDAO = require("../../organizacao/model/membro");

@Controller()
export class Reuniao {
	@Get()
	get(req: server.Request, res: server.Response): void {	
		ReuniaoDAO.findAll({
			include: [ {
				all: true
				,nested: false
				,model:DiscursoDAO
				,required: false
				,include: [{
					all: true
					, nested: false
					, model: MembroDAO
					, required: false
				}]
			}]		
		}).then(function(dta: IReuniao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyperiodo")
	getByPeriodo(req: server.Request, res: server.Response):void{
		var queryParams:{inicio:string,fim:string} = req.query;	
		ReuniaoDAO.findAll({
			include: [ {
				all: true
				,nested: false
				,model:DiscursoDAO
				,required: false
				, include: [{
					all: true
					, nested: false
					, model: MembroDAO
					, required: false
				}]
			}]
			,order: [
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
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getatuais")
	getAtuaisServico(req: server.Request, res: server.Response) {
		this.getAtuais().then(
			function(dta: IReuniao[]) {
				res.json(dta);
			}
		).catch(function(err: any) {
			res.status(400);
			res.json(err);
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
	add(req: server.Request, res: server.Response): void {
		var nreuniao: IReuniao = <IReuniao>req.body;
		ReuniaoDAO.create(nreuniao).then(function(p_nreuniao: IReuniao) {
			res.json(p_nreuniao);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nreuniao: IReuniao = <IReuniao>req.body;
		ReuniaoDAO.upsert(nreuniao).then(function() {
			res.json(nreuniao);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		ReuniaoDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

}
