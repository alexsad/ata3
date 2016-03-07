import server = require('../../../../service/RestServer');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import AtividadeDAO = require("../model/atividade");
import {IAtividade, EAtividadeStatus} from "../model/ITrimestre";
import {PerfilAutorizacao} from "../../perfil/controller/PerfilAutorizacao";
import {IPerfilAutorizacao, EPerfilAutorizacaoTP} from "../../perfil/model/IPerfilAutorizacao";
import TrimestreDataLivreDAO = require("../model/trimestredatalivre");

@Controller()
export class Atividade {
	@Get()
	get(req: server.Request, res: server.Response): void {
		AtividadeDAO.findAll({
			include: [{
				all: true
				, nested: false
				, model: TrimestreDataLivreDAO
				, required: false
			}]
		}).then(function(dta: IAtividade[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	private getById(p_id: number, p_handler_success: Function, p_onErro: Function) {
		AtividadeDAO.findOne({
			include: [{
				all: true
				, nested: false
				, model: TrimestreDataLivreDAO
				, required: false
			}]
			, where: [{
				id: p_id
			}]
		}).then(p_handler_success).catch(p_onErro);
	}

	@Get("/:id")
	getByIdService(req: server.Request, res: server.Response): void {
		this.getById(
			req.params.id
			, (dta: IAtividade) => res.json(dta)
			, (error: any) => (res.status(400), res.json(error))
		);
	}


	@Get("/getbyidtrimestreidperfil/:idtrimestre/:idperfil")
	getByIdTrimestreIdPerfil(req: server.Request, res: server.Response): void {
		AtividadeDAO.findAll({
			include: [{
				all: true
				, nested: false
				, model: TrimestreDataLivreDAO
				, required: false
			}]
			, where: {
				idTrimestre: req.params.idtrimestre
				, idPerfil: req.params.idperfil
			}
		}).then(function(dta: IAtividade[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/gettotalbyidstatus/:idstatus")
	getByTotalByIdStatus(req: server.Request, res: server.Response): void {
		AtividadeDAO.count({
			where: {
				idStatus: req.params.idstatus
			}
		}).then(function(result:number) {
			res.json({ count: result || 0 });
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyidperfilidstatus/:idperfil/:idstatus")
	getByIdPerfilIdStatus(req: server.Request, res: server.Response): void {
		var perfilAuto: PerfilAutorizacao = new PerfilAutorizacao();
		var tpAuto: EPerfilAutorizacaoTP = EPerfilAutorizacaoTP.LIBERACAO;
		if(req.params.idstatus==EAtividadeStatus.ENVIADA){
			tpAuto = EPerfilAutorizacaoTP.APROVACAO;
		}
		perfilAuto.getByIdPerfilTpAutorizacao(req.params.idperfil, tpAuto)
		.then(function(dta1:IPerfilAutorizacao[]){
			if(dta1.length==0){
				res.json([]);
			}else{
				var perfisAlvos: number[] = [0];
				dta1.forEach(function(itemPerfilAuto:IPerfilAutorizacao){
					perfisAlvos.push(itemPerfilAuto.idPerfilAlvo);
				});
				AtividadeDAO.findAll({
					include: [{
						all: true
						, nested: false
						, model: TrimestreDataLivreDAO
						, required: false
					}]
					,where: {
						idStatus: req.params.idstatus
						, idPerfil: {
							$in: perfisAlvos
						}
					}
				}).then(function(dta: IAtividade[]) {
					res.json(dta);
				}).catch(function(err:any) {
					throw new Error('Elsewhere has failed:' +err);
			res.json(err);
				});
			}
		})
		.catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}


	@Get("/getatividadestatus")
	getAtividadeStatus(req: server.Request, res: server.Response): void {
		var tmpArr: {
			idStatus: number
			, descricao: string
		}[] = [];
		tmpArr.push({ idStatus: EAtividadeStatus.ELABORADA, descricao: EAtividadeStatus[EAtividadeStatus.ELABORADA] })
		tmpArr.push({ idStatus: EAtividadeStatus.ENVIADA, descricao: EAtividadeStatus[EAtividadeStatus.ENVIADA] })
		tmpArr.push({ idStatus: EAtividadeStatus.APROVADA, descricao: EAtividadeStatus[EAtividadeStatus.APROVADA] })
		tmpArr.push({ idStatus: EAtividadeStatus.PENDENTE, descricao: EAtividadeStatus[EAtividadeStatus.PENDENTE] })
		tmpArr.push({ idStatus: EAtividadeStatus.LIBERADA, descricao: EAtividadeStatus[EAtividadeStatus.LIBERADA] })
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
	getByIdTrimestre(p_idTrimestre: number) {
		return AtividadeDAO.findAll({
			where: {
				"idTrimestre": p_idTrimestre
			}
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var natividade: IAtividade = <IAtividade>req.body;
		AtividadeDAO.create(natividade).then(function(p_natividade: IAtividade) {
			//res.json(p_natividade);
			this.getById(
				p_natividade.id
				, (dta: IAtividade) => res.json(dta)
				, (error: any) => (res.status(400), res.json(error))
			);
		}.bind(this)).catch(function(err:any){
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var natividade: IAtividade = <IAtividade>req.body;
		//natividade["id_trimestre"] = natividade.idTrimestre;
		//natividade["id_data"] = natividade.idData;
		AtividadeDAO.upsert(natividade).then(function() {
			//res.json(natividade);
			this.getById(
				natividade.id
				, (dta: IAtividade) => res.json(dta)
				, (error: any) => (res.status(400), res.json(error))
			);

		}.bind(this)).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		AtividadeDAO.destroy({
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
