import server = require('../../../../service/RestServer');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import DiscursoDAO = require("../model/discurso");
import {IDiscurso} from "../model/IDiscurso";
import {IReuniao} from "../model/IReuniao";
import {Reuniao} from "./Reuniao";

@Controller()
export class Discurso {
	@Get()
	get(req: server.Request, res: server.Response): void {        
		DiscursoDAO
			.findAllAssoc()
			.then((dta: IDiscurso[]) => res.json(dta))
			.catch((error: any) => (res.status(400), res.json(error)));
	}

	@Get("/:id")
	getByIdService(req: server.Request, res: server.Response): void {
        DiscursoDAO
        	.findByIdAssoc(req.params.id)
			.then((dta: IDiscurso) => res.json(dta))
			.catch((error: any) => (res.status(400), res.json(error)));
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
				})
				.catch((error: any) => (res.status(400), res.json(error)));
			}
		)
		.catch((error: any) => (res.status(400), res.json(error)));
	}

	getByIdReuniao(p_idReuniao: number){
		return DiscursoDAO
		.findAllAssoc({
			where: {
				idReuniao: p_idReuniao
			}
		});
	}	

	@Get("/getbyidreuniao/:idreuniao")
	getByIdReuniaoService(req: server.Request, res: server.Response): void {
		this
		.getByIdReuniao(req.params.idreuniao)
		.then((dta: IDiscurso[]) => res.json(dta))
		.catch((error: any) => (res.status(400), res.json(error)));
	}

	@Post()
	add(req: server.Request, res: server.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.create(ndiscurso).then(function(p_ndiscurso: IDiscurso) {		
			this
				.findByIdAssoc(p_ndiscurso.id)
				.then((dta: IDiscurso) => res.json(dta))
				.catch((error: any) => (res.status(400), res.json(error)));
		}.bind(this))
		.catch((error: any) => (res.status(400), res.json(error)));
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var ndiscurso: IDiscurso = <IDiscurso>req.body;
		DiscursoDAO.upsert(ndiscurso).then(function() {
			this
				.findByIdAssoc(ndiscurso.id)
				.then((dta: IDiscurso) => res.json(dta))
				.catch((error: any) => (res.status(400), res.json(error)));
		}.bind(this))
		.catch((error: any) => (res.status(400), res.json(error)));
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		DiscursoDAO.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(() => res.send(true))
		.catch((error: any) => (res.status(400), res.json(error)));
	}

}
