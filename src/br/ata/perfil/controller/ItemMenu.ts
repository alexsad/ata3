import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router";
import ItemMenuDAO = require("../model/itemmenu");
import {IItemMenu} from "../model/IPerfil";

@Controller()
export class ItemMenu {
	@Get()
	get(req: express.Request, res: express.Response): void {
		ItemMenuDAO.findAll().then(function(dta: IItemMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidmenu/:idmenu")
	getByIdMenu(req: express.Request, res: express.Response): void {
		ItemMenuDAO.findAll({
			where:{
				idMenu:req.params.idmenu
			}
		}).then(function(dta: IItemMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: express.Request, res: express.Response): void {
		var nitemmenu: IItemMenu = <IItemMenu>req.body;
		ItemMenuDAO.create(nitemmenu).then(function(p_nitemmenu: IItemMenu) {
			res.json(p_nitemmenu.id);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var nitemmenu: IItemMenu = <IItemMenu>req.body;
		ItemMenuDAO.upsert(nitemmenu).then(function(p_nitemmenu: IItemMenu) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: express.Request, res: express.Response): void {
		ItemMenuDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nitemmenu: IItemMenu) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
