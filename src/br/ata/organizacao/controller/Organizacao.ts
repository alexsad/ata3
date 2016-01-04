import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import OrganizacaoDAO = require("../model/organizacao");
import {IOrganizacao} from "../model/IOrganizacao";

@Controller()
export class Organizacao {
	@Get()
	get(req: server.Request, res: server.Response): void {
		OrganizacaoDAO.findAll().then(function(dta: IOrganizacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var norganizacao: IOrganizacao = <IOrganizacao>req.body;
		OrganizacaoDAO.create(norganizacao).then(function(p_norganizacao: IOrganizacao) {
			res.json(p_norganizacao);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var norganizacao: IOrganizacao = <IOrganizacao>req.body;
		OrganizacaoDAO.upsert(norganizacao).then(function() {
			res.json(norganizacao);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:_id")
	delete(req: server.Request, res: server.Response): void {
		OrganizacaoDAO.destroy({
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
