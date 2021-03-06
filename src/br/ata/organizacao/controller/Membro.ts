import server = require('../../../../service/RestServer');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import MembroDAO = require("../model/membro");
import {IMembro} from "../model/IMembro";

@Controller()
export class Membro {
	@Get()
	get(req: server.Request, res: server.Response): void {
		MembroDAO.findAll().then(function(dta: IMembro[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbysnativo/:p_snativo")
	getBySnAtivo(req: server.Request, res: server.Response): void {
		MembroDAO.findAll({
			where: { "snAtivo": req.params.p_snativo }
		}).then(function(dta: IMembro[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyidorganizacao/:idOrganizacao")
	getByIdOrganizacao(req: server.Request, res: server.Response): void {
		MembroDAO.findAll({
			where: { "idOrganizacao": req.params.idOrganizacao }
		}).then(function(dta: IMembro[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nmembro: IMembro = <IMembro>req.body;
		MembroDAO.create(nmembro).then(function(p_nmembro: IMembro) {
			res.json(p_nmembro);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nmembro: IMembro = <IMembro>req.body;
		MembroDAO.upsert(nmembro).then(function() {
			res.json(nmembro);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:_id")
	delete(req: server.Request, res: server.Response): void {
		MembroDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function() {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

}
