import express = require('express');
import url = require('url');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {ReuniaoDAO,IReuniaoModel} from "../model/reuniao";
import {IDiscurso} from "../model/IReuniao";


@Controller("/reuniao")
class Reuniao{
	@Get("/")
	get(req:express.Request,res:express.Response):void{
		ReuniaoDAO.find({}).exec().then(
			function(dta:IReuniaoModel[]){
				res.json(dta);
			}
			,function(err){
				res.status(400).json(err);
			}
		);
	}
	@Get("/getreunioessimples")
	getSimples(req:express.Request,res:express.Response):void{
		ReuniaoDAO.find({},{"_id":true,"momento":true}).exec().then(
			function(dta:IReuniaoModel[]){
				res.json(dta);
			}
			,function(err){
				res.status(400).json(err);
			}
		);
	}
	@Get("/getbyperiodo")
	getByPeriodo(req:express.Request,res:express.Response){
		var queryParams = url.parse(req.url, true).query;
		//console.log(queryParams.inicio+"---"+queryParams.fim);
		ReuniaoDAO.find({
			"momento":{"$gte":new Date(queryParams.inicio),"$lt":new Date(queryParams.fim)}
		}).sort({"momento":"asc"}).exec().then(
			function(dta:IReuniaoModel[]){
				res.json(dta);
			}
			,function(err){
				res.status(400).json(err);
			}
		);
	}
	@Post("/")
	add(req:express.Request,res:express.Response):void{
		var nreuniao:IReuniaoModel = <IReuniaoModel>req.body;
		ReuniaoDAO.create(nreuniao).then(
			function(p_nreuniao:IReuniaoModel) {
					res.json(p_nreuniao._id);
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
		var p_reuniao:IReuniaoModel = <IReuniaoModel>req.body;
		ReuniaoDAO.findByIdAndUpdate(p_reuniao._id,{$set:p_reuniao},function(err){
			if(err){
				res.status(400).json(err);
			}else{
				res.send(true);
			}
		});
	}
	@Delete("/:_id")
	delete(req:express.Request,res:express.Response):void{
		ReuniaoDAO.findByIdAndRemove(req.params._id).exec().then(
			function(){
					res.send(true);
			}
			,function(err:any) {
					res.status(400).json(err);
			}
		);
	}
	@Post("/discurso/:idReuniao")
	addDiscurso(req:express.Request,res:express.Response):void{
		var p_discurso:IDiscurso = <IDiscurso>req.body;

		delete p_discurso._id;
		delete p_discurso._ind;
		delete p_discurso.nmMembro;

		ReuniaoDAO.findById(req.params.idReuniao,function(err1:any,data:IReuniaoModel){
			if(err1){
				res.status(400).json(err1);
			}else{
				var strIndex: string = "create";
				var newdoc: IDiscurso = <IDiscurso>data.discursos[strIndex](p_discurso);
				console.log(newdoc);
				data.discursos.push(newdoc);
				data.save(function (err2:any) {
					if(err2){
						res.status(400).json(err2);
					}else{
						res.send(newdoc._id);
					};
					//console.log('the sub-doc was saved2');
				});

			};
		});
	}
	@Put("/discurso/:idReuniao")
	updateDiscurso(req:express.Request,res:express.Response):void{
		var p_discurso:IDiscurso = <IDiscurso>req.body;
		ReuniaoDAO.findOneAndUpdate(
			{ "_id": req.params.idReuniao , "discursos._id": p_discurso._id }
			,{ "$set":{"discursos.$": p_discurso}}
			,function(err:any){
				if(err){
					res.status(400).json(err);
				}else{
					res.send(true);
				}
			}
		);
	}
	@Delete("/discurso/:idReuniao,:idDiscurso")
	deleteDiscurso(req:express.Request,res:express.Response):void{
		ReuniaoDAO.findByIdAndUpdate(req.params.idReuniao,{$pull:{"discursos":{_id:req.params.idDiscurso}}},
			function(err:any){
				if(err){
					res.status(400).json(err);
				}else{
					res.send(true);
				}
			}
		);
	}
}
