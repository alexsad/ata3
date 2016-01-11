import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import DiscursoDAO = require("../model/discurso");
import {IDiscurso} from "../model/IDiscurso";
import {IReuniao} from "../model/IReuniao";
import {Reuniao} from "./Reuniao";
import MembroDAO = require("../../organizacao/model/membro");

@Controller()
export class Discurso {
	@Get()
	get(req: server.Request, res: server.Response): void {
		DiscursoDAO.findAll({
			include: [ {
				all: true
				,nested: false
				,model:MembroDAO
				,required: false
			}]
		}).then(function(dta: IDiscurso[]) {
			res.json(dta);
		}.bind(this)).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getultimosdiscursos")
	getUltimosDiscursosTotal(req: server.Request, res: server.Response): void {
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
					res.json({count:total||0});
				}).catch(function(err: any) {
					res.status(400);
			res.json(err);
				});
				//res.json(dta);
			}
		).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	getByIdReuniao(p_idReuniao: number){
		return DiscursoDAO.findAll({
			where: {
				idReuniao: p_idReuniao
			}
			,include: [{
				all: true
				, nested: false
				, model: MembroDAO
				, required: false
			}]
		});
	}	
	@Get("/getbyidreuniao/:idreuniao")
	getByIdReuniaoService(req: server.Request, res: server.Response): void {
		this.getByIdReuniao(req.params.idreuniao)
		.then(function(dta: IDiscurso[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.create(ndiscurso).then(function(p_ndiscurso: IDiscurso) {
			res.json(p_ndiscurso);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.upsert(ndiscurso).then(function() {
			res.json(ndiscurso);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		DiscursoDAO.destroy({
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
