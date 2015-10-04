import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {TrimestreDAO} from "../model/trimestre";
import {ITrimestre} from "../model/ITrimestre";

@Controller("/trimestre")
export class Trimestre{
	@Get("/")
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
	@Post("/")
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
	@Put("/")
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
}