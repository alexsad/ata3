import express = require('express');
import url = require('url');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import UsuarioDAO = require("../model/usuario");
import {IUsuario} from "../model/IUsuario";


@Controller()
export class Usuario{

	@Get()
	get(req:express.Request,res:express.Response):void{
		UsuarioDAO.findAll().then(function(dta: IUsuario[]) {
			res.json(dta);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}

	@Get("/logar")
	logar(req:express.Request,res:express.Response):void{
		var p_usuario: IUsuario = <IUsuario>url.parse(req.url, true).query;
		UsuarioDAO.findOne(p_usuario).exec().then(
			function(dta:IUsuario) {
				res.send(((dta)?true:false));
			}
			,function(erro:any){
				res.status(500).json(erro);
			}
		);
	}

	@Get("/getbysnativo/:p_snAtivo")
	getBySnAtivo(req:express.Request,res:express.Response):void{
		UsuarioDAO.find(
			{"snAtivo":req.params.p_snAtivo}
			,{
				"senha":false
			}
		).exec().then(
			(dta:IUsuario[]) => res.send(dta)
			,(err:any) => res.status(500).json(err)
		);
	}

	@Get("/getbylogin/:login")
	getByEmail(req:express.Request,res:express.Response):void{
		UsuarioDAO.findOne({"login":req.params.login}).exec().then(
			function(dta:IUsuario){
				res.send(dta);
			}
			,function(erro:any){
				res.status(500).json(erro);
			}
		);
	}

	@Post()
	add(req:express.Request,res:express.Response):void{
		var nusuario:IUsuario = <IUsuario>req.body;
		UsuarioDAO.create(nusuario).then(
			function(p_nusuario:IUsuario) {
			  	res.json(p_nusuario.id);
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
		var p_usuario:IUsuario = <IUsuario>req.body;
		UsuarioDAO.findByIdAndUpdate(p_usuario.id,{$set:p_usuario},function(err:any){
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
