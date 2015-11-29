import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import MenuDAO = require("../model/menu");
import ItemMenuDAO = require("../model/itemmenu");
import {IMenu,IItemMenu} from "../model/IPerfil";

@Controller()
export class Menu {
	@Get()
	get(req: server.Request, res: server.Response): void {
		MenuDAO.findAll().then(function(dta: IMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getbyidperfil/:idperfil")
	getByIdPerfil(req: server.Request, res: server.Response): void {
		MenuDAO.findAll({
			where:{
				idPerfil:req.params.idperfil
			}
		}).then(function(dta: IMenu[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Get("/getfullbyidperfil/:idperfil")
	getFullByIdPerfil(req: server.Request, res: server.Response): void {
		//MenuDAO.hasMany(ItemMenu);
		MenuDAO.findAll({
			where: {
				idPerfil: req.params.idperfil
			}
		}).then(function(dta: IMenu[]) {
			var tmade: number = 0;
			dta.forEach(function(menu:IMenu,indx:number){
				ItemMenuDAO.findAll({
					where:{
						idMenu:menu.id
					}
				}).then(function(dta2:IItemMenu[]){
					tmade++;
					menu.children = dta2;
					//console.log(tmade);
					if (tmade == dta.length) {
						res.json(dta);
					}
				}).catch(function(err:any) {
					res.status(400).json(err);
				});
				//dta[0].children = [];
			});
			
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nmenu: IMenu = <IMenu>req.body;
		MenuDAO.create(nmenu).then(function(p_nmenu: IMenu) {
			res.json(p_nmenu);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nmenu: IMenu = <IMenu>req.body;
		MenuDAO.upsert(nmenu).then(function(p_nmenu: IMenu) {
			res.json(nmenu);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		MenuDAO.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nmenu: IMenu) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400).json(err);
		});
	}

}
