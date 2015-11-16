import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router";
import PerfilNotificacaoDAO = require("../model/perfilnotificacao");
import {IPerfilNotificacao} from "../model/IPerfil";

@Controller()
export class PerfilNotificacao {
	@Get()
	get(req: express.Request, res: express.Response): void {
		PerfilNotificacaoDAO.findAll().then(function(dta: IPerfilNotificacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nperfilnotificacao: IPerfilNotificacao = <IPerfilNotificacao>req.body;
		PerfilNotificacaoDAO.create(nperfilnotificacao).then(function(p_nperfilnotificacao: IPerfilNotificacao) {
			res.json(p_nperfilnotificacao.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nperfilnotificacao: IPerfilNotificacao = <IPerfilNotificacao>req.body;
		PerfilNotificacaoDAO.upsert(nperfilnotificacao).then(function(p_nperfilnotificacao: IPerfilNotificacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		PerfilNotificacaoDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nperfilnotificacao: IPerfilNotificacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
