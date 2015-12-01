import server = require('restify');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TrimestreDAO = require("../model/trimestre");
import {Atividade} from "./Atividade";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import {ITrimestre,EAtividadeStatus, IAtividade, ITrimestreLancamentoAtividade} from "../model/ITrimestre";
import {IPerfil} from "../../perfil/model/IPerfil";
import {Perfil} from "../../perfil/controller/Perfil";

@Controller()
export class Trimestre{
	@Get()
	get(req:server.Request,res:server.Response):void{
		TrimestreDAO.findAll().then(
			function(dta:ITrimestre[]){
				res.json(dta);
			}
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Get("/getdisponiveis")
	getDisponiveis(req: server.Request, res: server.Response): void {
		TrimestreDAO.findAll({where:{"snAberto": "S" }}).then(
			function(dta: ITrimestre[]) {
				res.json(dta);
			}
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	
	@Get('/getbyidperfil/:idperfil')
	getByIdPerfil(req: server.Request, res: server.Response): void {
		var pidperfil: number = parseInt(req.params.idperfil);
		TrimestreDAO.findAll({ where: { "snAberto": "S" } }).then(
			function(dta: ITrimestre[]) {
				if(dta.length==0){
					res.json(dta);
				}else{
					var ativctrl:Atividade = new Atividade();
					var lancctrl:TrimestreLancamentoAtividade = new TrimestreLancamentoAtividade();
					var tmade: number = 0;	
					dta.forEach(function(ptrimestre:ITrimestre,indx:number){
						ativctrl.getTotalOrcamentoByIdTrimestreAndIdPerfil(ptrimestre.id, pidperfil).then(function(total: number) {
							dta[indx].vtSaldo = total || 0;
							//dta[indx].vtTotalLancado = total || 0;
							lancctrl.getTotalByIdTrimestreIdPerfil(ptrimestre.id, pidperfil).then(function(ptotal_lanc: number) {
								dta[indx].vtTotalLancado = ptotal_lanc||0;
								dta[indx].vtSaldo = dta[indx].vtTotalLancado - dta[indx].vtSaldo;
								tmade++;
								if (tmade == dta.length) {
									res.json(dta);
								};	
							});						
						}).catch(function(err:any) {
							console.log(err);
						});
					});
				};
			}
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Post()
	add(req: server.Request, res: server.Response): void {
		var ntrimestre: ITrimestre = <ITrimestre>req.body;
		TrimestreDAO.create(ntrimestre).then(function(p_ntrimestre: ITrimestre) {
			res.json(p_ntrimestre);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var ntrimestre: ITrimestre = <ITrimestre>req.body;
		TrimestreDAO.upsert(ntrimestre).then(function(p_ntrimestre: ITrimestre) {
			res.json(ntrimestre);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		TrimestreDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_ntrimestre: ITrimestre) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
/*
	@Get("/getDisponiveisByIdPerfil/:idPerfil")
	getDisponiveisByIdPerfil(req: server.Request, res: server.Response): void {
		var tmpIdPerfilReq: string = req.params.idPerfil;
		TrimestreDAO.find({ "snAberto": "S" }).exec().then(
			function(dtaTrimestre: ITrimestre[]) {

				var perfilController: Perfil = new Perfil();
				var tmpTrimestreLst: ITrimestre[] = [];

				perfilController.getAutorizacaoByIdPerfil(tmpIdPerfilReq).exec().then(
					function(dtaPerfil: IPerfil) {
						//res.json(dtaPerfil);
						//console.log(dtaPerfil.perfilAprovacao);
						//console.log(dtaPerfil);
						if(!dtaPerfil.perfilAprovacao){
							dtaPerfil.perfilAprovacao=[];
						};
						if(!dtaPerfil.perfilLiberacao){
							dtaPerfil.perfilLiberacao=[];
						};

						dtaTrimestre.forEach(function(tmpTrimestre: ITrimestre, indTrim: number) {
							tmpTrimestreLst.push({
								_id: tmpTrimestre._id
								,ano:tmpTrimestre.ano
								,nrTrimestre: tmpTrimestre.nrTrimestre
								,snAberto:"S"
								,datasLivres:[]
								,trimestreLancamentoAtividade: []
								,atividades:[]
								,vtSaldo:0
								,vtTotalLancado:0
							});

							var tmpTotalLancado: number = 0;
							tmpTrimestre.trimestreLancamentoAtividade.forEach(function(tmpItem: ITrimestreLancamentoAtividade) {
								if (tmpItem.idPerfil == tmpIdPerfilReq) {
									tmpTotalLancado += tmpItem.valor;
								};
							});
							var tmpSaldo: number = tmpTotalLancado;
							tmpTrimestre.atividades.forEach(function(tmpItemAtiv: IAtividade, indAtiv: number) {

								if(tmpItemAtiv.idPerfil == tmpIdPerfilReq){
									tmpSaldo -= tmpItemAtiv.orcamento;
								};


								if (
									(
										dtaPerfil.perfilAprovacao.indexOf(tmpItemAtiv.idPerfil) > -1
										&& tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA
									)
									||
									(
										dtaPerfil.perfilLiberacao.indexOf(tmpItemAtiv.idPerfil) > -1
										&& tmpItemAtiv.idStatus == EAtividadeStatus.APROVADA
									)
								) {
									dtaTrimestre[indTrim].atividades[indAtiv].snEditavel = "S";
									//dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 1";
									tmpTrimestreLst[indTrim].atividades.push(dtaTrimestre[indTrim].atividades[indAtiv]);
								}else if (tmpItemAtiv.idPerfil == tmpIdPerfilReq) {
									if (
										tmpItemAtiv.idStatus == EAtividadeStatus.CANCELADA
										|| tmpItemAtiv.idStatus == EAtividadeStatus.ELABORADA
										|| tmpItemAtiv.idStatus == EAtividadeStatus.PENDENTE
										|| tmpItemAtiv.idStatus == EAtividadeStatus.REPROVADA
									) {
										dtaTrimestre[indTrim].atividades[indAtiv].snEditavel = "S";
										//dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 2";
									} else {
										dtaTrimestre[indTrim].atividades[indAtiv].snEditavel = "N";
										//dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 3";
									}
									tmpTrimestreLst[indTrim].atividades.push(dtaTrimestre[indTrim].atividades[indAtiv]);
								}
	
							});
							tmpTrimestreLst[indTrim].vtTotalLancado = tmpTotalLancado;
							tmpTrimestreLst[indTrim].vtSaldo = tmpSaldo;

							//tmpTrimestreLst[indTrim]

						});
						res.json(tmpTrimestreLst);
					}
					, function(err: any) {
						res.status(500).json(err);
					}
				);
			}
			, function(err:any) {
				res.status(400);
			res.json(err);
			}
		);
	}
*/
}
