import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router";
import AtividadeDAO = require("../model/atividade");
import {IAtividade, EAtividadeStatus,ITrimestreDataLivre} from "../model/ITrimestre";
import {PerfilAutorizacao} from "../../perfil/controller/PerfilAutorizacao";
import {IPerfilAutorizacao,EPerfilAutorizacaoTP} from "../../perfil/model/IPerfil";
import {TrimestreDataLivre} from "./TrimestreDataLivre";

@Controller()
export class Atividade {
	@Get()
	get(req: express.Request, res: express.Response): void {
		AtividadeDAO.findAll().then(function(dta: IAtividade[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidtrimestreidperfil/:idtrimestre/:idperfil")
	getByIdTrimestreIdPerfil(req: express.Request, res: express.Response): void {
		AtividadeDAO.findAll({
			where:{
				idTrimestre:req.params.idtrimestre
				,idPerfil:req.params.idperfil
			}
		}).then(function(dta: IAtividade[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidperfilidstatus/:idperfil/:idstatus")
	getByIdPerfilIdStatus(req: express.Request, res: express.Response): void {
		var perfilAuto: PerfilAutorizacao = new PerfilAutorizacao();
		var tpAuto: EPerfilAutorizacaoTP = EPerfilAutorizacaoTP.LIBERACAO;
		if(req.params.idstatus==EAtividadeStatus.APROVADA){
			tpAuto = EPerfilAutorizacaoTP.APROVACAO;
		}
		perfilAuto.getByIdPerfilTpAutorizacao(req.params.idperfil, tpAuto)
		.then(function(dta1:IPerfilAutorizacao[]){
			if(dta1.length==0){
				res.json([]);
			}else{
				var perfisAlvos: number[] = [];
				dta1.forEach(function(itemPerfilAuto:IPerfilAutorizacao){
					perfisAlvos.push(itemPerfilAuto.idPerfilAlvo);
				});
				AtividadeDAO.findAll({
					where: {
						idStatus: req.params.idstatus
						, idPerfil: {
							$in: perfisAlvos
						}
					}
				}).then(function(dta: IAtividade[]) {
					res.json(dta);
				}).catch(function(err:any) {
					res.status(400).json(err);
				});
			}
		})
		.catch(function(err:any) {
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
	getTotalOrcamentoByIdTrimestreAndIdPerfil(p_idTrimestre:number,p_idPerfil:number) {
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
			var tmpDats:TrimestreDataLivre = new TrimestreDataLivre();
			tmpDats.deleteByData(natividade.momento).then(function(p_datalivre:ITrimestreDataLivre){
					res.json(p_natividade.id);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var natividade: IAtividade = <IAtividade>req.body;
		AtividadeDAO.upsert(natividade).then(function(p_natividade: IAtividade) {
			var tmpDats:TrimestreDataLivre = new TrimestreDataLivre();
			tmpDats.deleteByData(natividade.momento).then(function(p_datalivre:ITrimestreDataLivre){
					res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}).catch(function(err:any) {
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
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
