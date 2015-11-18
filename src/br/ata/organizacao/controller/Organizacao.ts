import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import OrganizacaoDAO = require("../model/organizacao");
import {IOrganizacao} from "../model/IOrganizacao";

@Controller()
export class Organizacao {
	@Get()
	get(req: express.Request, res: express.Response): void {
		OrganizacaoDAO.findAll().then(function(dta: IOrganizacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var norganizacao: IOrganizacao = <IOrganizacao>req.body;
		OrganizacaoDAO.create(norganizacao).then(function(p_norganizacao: IOrganizacao) {
			res.json(p_norganizacao.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var norganizacao: IOrganizacao = <IOrganizacao>req.body;
		OrganizacaoDAO.upsert(norganizacao).then(function(p_norganizacao: IOrganizacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:_id")
	delete(req: express.Request, res: express.Response): void {
		OrganizacaoDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function(p_norganizacao: IOrganizacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
