import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import ItemMenuDAO = require("../model/itemmenu");
import {IItemMenu} from "../model/IPerfil";

@Controller()
export class ItemMenu {
	@Get()
	get(req: server.Request, res: server.Response): void {
		ItemMenuDAO.findAll().then(function(dta: IItemMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyidmenu/:idmenu")
	getByIdMenu(req: server.Request, res: server.Response): void {
		ItemMenuDAO.findAll({
			where:{
				idMenu:req.params.idmenu
			}
		}).then(function(dta: IItemMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nitemmenu: IItemMenu = <IItemMenu>req.body;
		ItemMenuDAO.create(nitemmenu).then(function(p_nitemmenu: IItemMenu) {
			res.json(p_nitemmenu);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nitemmenu: IItemMenu = <IItemMenu>req.body;
		ItemMenuDAO.upsert(nitemmenu).then(function(p_nitemmenu: IItemMenu) {
			res.json(nitemmenu);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		ItemMenuDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nitemmenu: IItemMenu) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

}
