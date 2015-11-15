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

	@Post("/logar")
	logar(req:express.Request,res:express.Response):void{
		var p_usuario: IUsuario = <IUsuario>req.body;
		console.log(p_usuario);
		UsuarioDAO.find({ where: { 
			"login":p_usuario.login 
			,"senha":p_usuario.senha
		} }).then(
			function(dta:IUsuario) {
				res.send(((dta)?true:false));
			}
		).catch(function(err) {
			res.status(400).json(err);
		});
	}

	@Get("/getbysnativo/:p_snativo")
	getBySnAtivo(req:express.Request,res:express.Response):void{
		UsuarioDAO.findAll(
			{where:{
				"snAtivo":req.params.p_snativo
				,"senha":false
			}}
		).then(
			(dta:IUsuario[]) => res.send(dta)
		).catch(function(err) {
			res.status(400).json(err);
		});
	}

	@Get("/getbylogin/:login")
	getByEmail(req: express.Request, res: express.Response): void {
		UsuarioDAO.find({
				where:{"login": req.params.login }
			}).then(
			function(dta:IUsuario){
				res.send(dta);
			}
		).catch(function(err) {
			res.status(400).json(err);
		});
	}

	@Post()
	add(req: express.Request, res: express.Response): void {
		var nusuario: IUsuario = <IUsuario>req.body;
		UsuarioDAO.create(nusuario).then(function(p_nusuario: IUsuario) {
			res.json(p_nusuario.id);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nusuario: IUsuario = <IUsuario>req.body;
		UsuarioDAO.upsert(nusuario).then(function(p_nusuario: IUsuario) {
			res.send(true);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}
	@Delete("/:_id")
	delete(req: express.Request, res: express.Response): void {
		UsuarioDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function(p_nusuario: IUsuario) {
			res.send(true);
		}).catch(function(err) {
			res.status(400).json(err);
		});
	}

};
