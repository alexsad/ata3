import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import UsuarioPerfilDAO = require("../model/usuarioperfil");
import {IUsuarioPerfil} from "../model/IUsuario";

@Controller()
export class UsuarioPerfil {
	@Get()
	get(req: server.Request, res: server.Response): void {
		UsuarioPerfilDAO.findAll().then(function(dta: IUsuarioPerfil[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyidusuario/:idusuario")
	getByIdUsuario(req: server.Request, res: server.Response): void {
		UsuarioPerfilDAO.findAll({
			where:{
				idUsuario: req.params.idusuario
			}
		}).then(function(dta: IUsuarioPerfil[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nusuarioPerfil: IUsuarioPerfil = <IUsuarioPerfil>req.body;
		UsuarioPerfilDAO.create(nusuarioPerfil).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.json(p_nusuarioPerfil);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nusuarioPerfil: IUsuarioPerfil = <IUsuarioPerfil>req.body;
		UsuarioPerfilDAO.upsert(nusuarioPerfil).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.json(nusuarioPerfil);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		UsuarioPerfilDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nusuarioPerfil: IUsuarioPerfil) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

}
