import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import PerfilDAO = require("../model/perfil");
import {IMenu, IItemMenu, IPerfil} from "../model/IPerfil";

@Controller()
export class Perfil{
	@Get()
	get(req:express.Request,res:express.Response):void{
		PerfilDAO.findAll().then(
			function(dta:IPerfil[]){
				res.json(dta);
			}
		).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	getAutorizacao():any{
		return PerfilDAO.find({ "snAtivo": "S" }, { menus: false, notificacoes: false });
	}
	getAutorizacaoByIdPerfil(p_idPerfil:string):any{
		return PerfilDAO.findById(p_idPerfil,{ menus: false, notificacoes: false });
	}
	@Get("/get/:idPerfil")
	getByIdPerfil(req:express.Request,res:express.Response):void{
		PerfilDAO.findById(req.params.idPerfil).then(
			function(dta:IPerfil){
				res.json(dta);
			}
		).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getbyidusuario/:idusuario")
	getByIdUsuario(req: express.Request, res: express.Response): void {
		PerfilDAO.findAll({ where: { idUsuario:req.params.idusuario } }).then(
			function(dta: IPerfil[]) {
				res.json(dta);
			}
		).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Get("/getbysnativo/:snativo")
	getBySnAtivo(req: express.Request, res: express.Response): void {
		PerfilDAO.findAll({ where: { "snAtivo": req.params.snativo } }).then(
			function(dta:IPerfil[]){
				res.json(dta);
			}
		).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nperfil: IPerfil = <IPerfil>req.body;
		PerfilDAO.create(nperfil).then(function(p_nperfil: IPerfil) {
			res.json(p_nperfil.id);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nperfil: IPerfil = <IPerfil>req.body;
		PerfilDAO.upsert(nperfil).then(function(p_nperfil: IPerfil) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		PerfilDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nperfil: IPerfil) {
			res.send(true);
		}).catch(function(err:any) {
			res.sendStatus(400).json(err);
		});
	}
}
