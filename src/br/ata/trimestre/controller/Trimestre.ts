import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {TrimestreDAO} from "../model/trimestre";
import {ITrimestre,EAtividadeStatus, IAtividade, ITrimestreLancamentoAtividade} from "../model/ITrimestre";

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
		TrimestreDAO.find({ "snAberto": "S" }).exec().then(
			function(dta: ITrimestre[]) {
				var tmpDta: ITrimestre[] = [];
				dta.forEach(function(tmpTrimestre:ITrimestre,indTrim:number){
					
					var tmpTotalLancado: number = 0;
					tmpTrimestre.trimestreLancamentoAtividade.forEach(function(tmpItem: ITrimestreLancamentoAtividade) {
						if (tmpItem.idPerfil == req.params.idPerfil) {
							tmpTotalLancado += tmpItem.valor;
						};
					});
					//dta[ind].vtTotalLancado
					//console.log(tmpTotalLancado);
					//console.log(tmpTrimestre);
					var tmpSaldo: number = tmpTotalLancado;
					tmpTrimestre.atividades.forEach(function(tmpItemAtiv: IAtividade,indAtiv:number) {
						if (tmpItemAtiv.idPerfil == req.params.idPerfil) {
							tmpSaldo -= tmpItemAtiv.orcamento;
						};


						dta[indTrim].atividades.splice(indAtiv, 1);
					});
					dta[indTrim].vtTotalLancado = tmpTotalLancado;
					dta[indTrim].vtSaldo = tmpSaldo;
				});
				res.json(dta);
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
				data.atividades.push(p_atividade);
				data["save"](function(err2: any) {
					if (err2) {
						res.status(400).json(err2);
					}else{
						console.log('the sub-doc was saved2');
						res.send(data.atividades[data.atividades.length - 1]._id);
					};
				});
				
			};
		});
	}
}