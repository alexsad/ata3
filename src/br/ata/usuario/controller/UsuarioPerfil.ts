import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import UsuarioPerfilDAO = require("../model/usuarioperfil");
import {IUsuarioPerfil} from "../model/IUsuario";

@Controller()
export class UsuarioPerfil {
	@Get()
	get(req: express.Request, res: express.Response): void {
		UsuarioPerfilDAO.findAll().then(function(dta: IUsuarioPerfil[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidusuario/:idusuario")
	getByIdUsuario(req: express.Request, res: express.Response): void {
		UsuarioPerfilDAO.findAll({
			where:{
				idUsuario: req.params.idusuario
			}
		}).then(function(dta: IUsuarioPerfil[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nusuarioPerfil: IUsuarioPerfil = <IUsuarioPerfil>req.body;
		UsuarioPerfilDAO.create(nusuarioPerfil).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.json(p_nusuarioPerfil.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nusuarioPerfil: IUsuarioPerfil = <IUsuarioPerfil>req.body;
		UsuarioPerfilDAO.upsert(nusuarioPerfil).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		UsuarioPerfilDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
