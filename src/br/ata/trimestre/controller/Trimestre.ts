import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {TrimestreDAO} from "../model/trimestre";
import {ITrimestre,EAtividadeStatus, IAtividade, ITrimestreLancamentoAtividade} from "../model/ITrimestre";
import {IPerfil,IPerfilSimples} from "../../perfil/model/IPerfil";
import {Perfil} from "../../perfil/controller/Perfil";

@Controller()
export class Trimestre{
	@Get()
	get(req:express.Request,res:express.Response):void{
		TrimestreDAO.find({}, { atividades:false}).exec().then(
			function(dta:ITrimestre[]){
				res.json(dta);
			}
			,function(err){
				res.status(400).json(err);
			}
		);
	}
	@Get("/getDisponiveis")
	getDisponiveis(req: express.Request, res: express.Response): void {
		TrimestreDAO.find({"snAberto":"S"}).exec().then(
			function(dta: ITrimestre[]) {
				res.json(dta);
			}
			, function(err) {
				res.status(400).json(err);
			}
		);
	}
	@Get("/getAtividadeStatus")
	getAtividadeStatus(req: express.Request, res: express.Response): void {
		var tmpArr: {
			idStatus:number
			,descricao:string
		}[] = [];

		for (var i: number = 1; i < 8;i++){
			tmpArr.push({
				idStatus:i
				,descricao:EAtividadeStatus[i]
			});
		};
		res.json(tmpArr);
	}
	@Get("/getDisponiveisByIdPerfil/:idPerfil")
	getDisponiveisByIdPerfil(req: express.Request, res: express.Response): void {
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
							tmpTrimestreLst.push(tmpTrimestre);

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
								/*
								console.log(dtaPerfil.perfilAprovacao);
								console.log(dtaPerfil.perfilLiberacao);
								console.log(tmpItemAtiv.idStatus);
								*/

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
									dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 1";

								}else if (tmpItemAtiv.idPerfil == tmpIdPerfilReq) {
									if (
										tmpItemAtiv.idStatus == EAtividadeStatus.CANCELADA
										|| tmpItemAtiv.idStatus == EAtividadeStatus.ELABORADA
										|| tmpItemAtiv.idStatus == EAtividadeStatus.PENDENTE
										|| tmpItemAtiv.idStatus == EAtividadeStatus.REPROVADA
									) {
										dtaTrimestre[indTrim].atividades[indAtiv].snEditavel = "S";
										dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 2";
									} else {
										dtaTrimestre[indTrim].atividades[indAtiv].snEditavel = "N";
										dtaTrimestre[indTrim].atividades[indAtiv].dsObservacao = "caso 3";
									}
								}else{
									console.log(dtaTrimestre[indTrim].atividades[indAtiv]);
									dtaTrimestre[indTrim].atividades.splice(indAtiv, 1);
								};
							});
							dtaTrimestre[indTrim].vtTotalLancado = tmpTotalLancado;
							dtaTrimestre[indTrim].vtSaldo = tmpSaldo;
						});
						res.json(dtaTrimestre);
					}
					, function(err: any) {
						res.status(500).json(err);
					}
				);
			}
			, function(err) {
				res.status(400).json(err);
			}
		);
	}
	@Post()
	add(req:express.Request,res:express.Response):void{
		var ntrimestre:ITrimestre = <ITrimestre>req.body;
		TrimestreDAO.create(ntrimestre).then(
			function(p_ntrimestre:ITrimestre) {
			  	res.json(p_ntrimestre._id);
			}
			,function(error:any){
				if(error){
					res.status(400).json(error);
				}
			}
		);
	}
	@Put()
	atualizar(req:express.Request,res:express.Response):void{
		var p_trimestre:ITrimestre = <ITrimestre>req.body;
		var tmpId: string =  p_trimestre._id;
		delete p_trimestre._id;
		TrimestreDAO.findByIdAndUpdate(tmpId, { $set: p_trimestre }, function(err) {
			if(err){
				res.status(400).json(err);
			}else{
				res.send(true);
			}
		});
	}
	@Delete("/:_id")
	delete(req:express.Request,res:express.Response):void{
		TrimestreDAO.findByIdAndRemove(req.params._id).exec().then(
			function(){
					res.send(true);
			}
			,function(err:any) {
			    res.status(400).json(err);
			}
		);
	}

	@Put("/atividade/:idTrimestre")
	updateAtividade(req: express.Request, res: express.Response) {
		var p_atividade: IAtividade = <IAtividade>req.body;
		TrimestreDAO.findOneAndUpdate(
			{ "_id": req.params.idTrimestre, "atividades._id": p_atividade._id }
			, { "$set": { "atividades.$": p_atividade } }
			, function(err, doc) {
				if (err) {
					res.status(400).json(err);
				} else {
					res.send(true);
				}
			}
		);
	}

	@Post("/atividade/:idTrimestre")
	addAtividade(req: express.Request, res: express.Response): void {
		var p_atividade: IAtividade = <IAtividade>req.body;
		TrimestreDAO.findById(req.params.idTrimestre, function(err: any, data: ITrimestre) {
			if (err) {
				res.status(400).json(err);
			} else {
				//var newdoc:IMenu = <IMenu>data.menus["create"](p_menu);
				//var newdoc: IAtividade = <IAtividade>data.atividades["create"](p_atividade);
				//console.log(newdoc);
				var newdoc: IAtividade = <IAtividade>data.atividades["create"](p_atividade);
				data.atividades.push(newdoc);
				console.log(data.datasLivres);
				console.log(p_atividade.momento);

				var strDataNew: string = p_atividade.momento + "";
				strDataNew = strDataNew.substring(0, 10);
				data.datasLivres.every(function(p_data: Date, indDta: number):boolean{
					var strDataOld: string = p_data.toISOString();
					console.log(strDataOld + ":" + strDataNew);
					if (strDataOld.indexOf(strDataNew)>-1) {
						data.datasLivres.splice(indDta, 1);
						return false;
					}
					return true;
				});


				data["save"](function(err2: any) {
					if (err2) {
						res.status(400).json(err2);
					}else{
						res.send(newdoc._id);
					};
				});

			};
		});
	}
}
