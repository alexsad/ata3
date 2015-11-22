import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import PerfilNotificacaoDAO = require("../model/perfilnotificacao");
import {IPerfilNotificacao,EPerfilNotificacaoTP} from "../model/IPerfil";

@Controller()
export class PerfilNotificacao {
	@Get()
	get(req: express.Request, res: express.Response): void {
		PerfilNotificacaoDAO.findAll().then(function(dta: IPerfilNotificacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}

	@Get("/getbyidperfil/:idperfil")
	getByIdPerfil(req: express.Request, res: express.Response): void {
		PerfilNotificacaoDAO.findAll({
			where:{
				idPerfil:req.params.idperfil
			}
		}).then(function(dta: IPerfilNotificacao[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}	

	@Get("/tiposnotificaco")
	getTiposNotificacao(req: express.Request, res: express.Response): void {
		var tmpLista:{id:number,descricao:string}[] = [];
		tmpLista.push({
			id:EPerfilNotificacaoTP.SUCESSO
			, descricao: EPerfilNotificacaoTP[EPerfilNotificacaoTP.SUCESSO]
		});
		tmpLista.push({
			id: EPerfilNotificacaoTP.INFORMACAO
			, descricao: EPerfilNotificacaoTP[EPerfilNotificacaoTP.INFORMACAO]
		});
		tmpLista.push({
			id: EPerfilNotificacaoTP.AVISO
			, descricao: EPerfilNotificacaoTP[EPerfilNotificacaoTP.AVISO]
		});
		tmpLista.push({
			id: EPerfilNotificacaoTP.ADVERTENCIA
			, descricao: EPerfilNotificacaoTP[EPerfilNotificacaoTP.ADVERTENCIA]
		});
		tmpLista.push({
			id: EPerfilNotificacaoTP.ERRO
			, descricao: EPerfilNotificacaoTP[EPerfilNotificacaoTP.ERRO]
		});		
		res.json(tmpLista);
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nperfilnotificacao: IPerfilNotificacao = <IPerfilNotificacao>req.body;
		PerfilNotificacaoDAO.create(nperfilnotificacao).then(function(p_nperfilnotificacao: IPerfilNotificacao) {
			res.json(p_nperfilnotificacao.id);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nperfilnotificacao: IPerfilNotificacao = <IPerfilNotificacao>req.body;
		PerfilNotificacaoDAO.upsert(nperfilnotificacao).then(function(p_nperfilnotificacao: IPerfilNotificacao) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
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
			res.sendStatus(400).json(err);
		});
	}

}
