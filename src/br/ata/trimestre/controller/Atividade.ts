import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router";
import AtividadeDAO = require("../model/atividade");
import {IAtividade, EAtividadeStatus} from "../model/ITrimestre";

@Controller()
export class Atividade {
	@Get()
	get(req: express.Request, res: express.Response): void {
		AtividadeDAO.findAll().then(function(dta: IAtividade[]) {
			res.json(dta);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}
	@Get("/getatividadestatus")
	getAtividadeStatus(req: express.Request, res: express.Response): void {
		var tmpArr: {
			idStatus: number
			, descricao: string
		}[] = [];

		for (var i: number = 1; i < 8; i++) {
			tmpArr.push({
				idStatus: i
				, descricao: EAtividadeStatus[i]
			});
		};
		res.json(tmpArr);
	}
	getTotalOrcamentoByIdTrimestreAndIdPerfil(p_idTrimestre,p_idPerfil) {
		return AtividadeDAO.sum('orcamento', {
			where:{
				"id_perfil":p_idPerfil
				,"id_trimestre":p_idTrimestre
			}
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var natividade: IAtividade = <IAtividade>req.body;
		AtividadeDAO.create(natividade).then(function(p_natividade: IAtividade) {
			res.json(p_natividade.id);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var natividade: IAtividade = <IAtividade>req.body;
		AtividadeDAO.upsert(natividade).then(function(p_natividade: IAtividade) {
			res.send(true);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		AtividadeDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_natividade: IAtividade) {
			res.send(true);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}

}
