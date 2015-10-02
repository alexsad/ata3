import express = require('express');
import url = require('url');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {UsuarioDAO,IUsuarioModel} from "../model/usuario";


@Controller("/usuario")
export class Usuario{

	@Get("/")
	get(req:express.Request,res:express.Response):void{
		UsuarioDAO.find({}).exec().then(
			function(dta:IUsuarioModel[]){
				res.json(dta);
			}
			,function(err:Object){
				res.status(500).json(err);
			}
		);
	}

	@Get("/logar")
	logar(req:express.Request,res:express.Response):void{
		var p_usuario:IUsuarioModel = url.parse(req.url, true).query;
		UsuarioDAO.findOne(p_usuario).exec().then(
			function(dta:IUsuarioModel){
				res.send(((dta)?true:false));
			}
			,function(erro){
				res.status(500).json(erro);
			}
		);
	}

	@Get("/getbysnativos/:p_snAtivo")
	getMembroBySnAtivo(req:express.Request,res:express.Response):void{
		UsuarioDAO.find(
			{"snAtivo":req.params.p_snAtivo}
			,{
				"login":0
				,"senha":0
			}
		).exec().then(
			(dta) => res.send(dta)
			,(err) => res.status(500).json(err)
		);
	}

	@Get("/getbylogin/:login")
	getByEmail(req:express.Request,res:express.Response):void{
		UsuarioDAO.findOne({"login":req.params.login}).exec().then(
			function(dta:IUsuarioModel){
				res.send(dta);
			}
			,function(erro){
				res.status(500).json(erro);
			}
		);
	}

	@Post("/")
	add(req:express.Request,res:express.Response):void{
		var nusuario:IUsuarioModel = <IUsuarioModel>req.body;
		UsuarioDAO.create(nusuario).then(
			function(p_nusuario:IUsuarioModel) {
			  	res.json(p_nusuario._id);
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
		var p_usuario:IUsuarioModel = <IUsuarioModel>req.body;
		UsuarioDAO.findByIdAndUpdate(p_usuario._id,{$set:p_usuario},function(err){
			if(err){
				res.status(400).json(err);
			}else{
				res.send(true);
			}
		});
	}
	@Delete("/:_id")
	delete(req:express.Request,res:express.Response):void{
		UsuarioDAO.findByIdAndRemove(req.params._id).exec().then(
			function(){
					res.send(true);
			}
			,function(err:any) {
			    res.status(400).json(err);
			}
		);
	}

};
