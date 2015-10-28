import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {PerfilDAO} from "../model/perfil";
import {IMenu, IItemMenu, IPerfilSimples, IPerfil} from "../model/IPerfil";

@Controller()
export class Perfil{
	@Get()
	get(req:express.Request,res:express.Response):void{
		PerfilDAO.find({}).exec().then(
			function(dta:IPerfil[]){
				res.json(dta);
			}
			,function(err:any){
				res.status(500).json(err);
			}
		);
	}
	@Get("/getAutorizacao/")
	getAutorizacaoService(req: express.Request, res: express.Response):void {
		PerfilDAO.find({ "snAtivo": "S" }, { menus: false, notificacoes: false }).exec().then(
			function(dta: IPerfil[]) {
				res.json(dta);
			}
			, function(err: any) {
				res.status(500).json(err);
			}
		);
	}
	getAutorizacao():any{
		return PerfilDAO.find({ "snAtivo": "S" }, { menus: false, notificacoes: false });
	}
	getAutorizacaoByIdPerfil(p_idPerfil:string):any{
		return PerfilDAO.findById(p_idPerfil,{ menus: false, notificacoes: false });
	}
	@Get("/get/:idPerfil")
	getByIdPerfil(req:express.Request,res:express.Response):void{
		PerfilDAO.findById(req.params.idPerfil).exec().then(
			function(dta:IPerfil){
				res.json(dta);
			}
			,function(err:any){
				res.status(500).json(err);
			}
		);
	}
	@Get("/perfilsimples/")
	getPerfilSimples(req:express.Request,res:express.Response):void{
		PerfilDAO.find({"snAtivo":"S"},{
			"descricao":1
			,"comentario":1
			,"snAtivo":1
		}).exec().then(
			function(dta:IPerfil[]){
				res.json(dta);
			}
			,function(err:any){
				res.status(500).json(err);
			}
		);
	}
	@Post()
	add(req:express.Request,res:express.Response):void{
		var nperfil:IPerfil = <IPerfil>req.body;
		PerfilDAO.create(nperfil).then(
			function(p_nperfil:IPerfil) {
					res.json(p_nperfil._id);
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
		var p_perfil:IPerfil = <IPerfil>req.body;
		var tmpId:string = p_perfil._id;
		delete p_perfil._id;
		PerfilDAO.findByIdAndUpdate(tmpId, { $set: p_perfil }, function(err:any) {
			if(err){
				res.status(400).json(err);
			}else{
				res.send(true);
			}
		});
	}
	@Delete("/:_id")
	delete(req:express.Request,res:express.Response):void{
		PerfilDAO.findByIdAndRemove(req.params._id).exec().then(
			function(){
					res.send(true);
			}
			,function(err:any) {
					res.status(400).json(err);
			}
		);
	}
	@Post("/menu/:idPerfil")
	addMenu(req:express.Request,res:express.Response):void{
		var p_menu:IMenu = <IMenu>req.body;
		PerfilDAO.findById(req.params.idPerfil,function(err:any,data:IPerfil){
			if(err){
				res.status(400).json(err);
			}else{
				//var newdoc:IMenu = <IMenu>data.menus["create"](p_menu);
				var newdoc:IMenu = <IMenu>data.menus["create"](p_menu);
				//console.log(newdoc);
				data.menus.push(newdoc);
				data["save"](function(err2:any){
					if(err2){
						res.status(400).json(err2);
					};
					//console.log('the sub-doc was saved2');
				});
				res.send(newdoc._id);
			};
		});
	}
	@Put("/menu/:idPerfil")
	updateMenu(req:express.Request,res:express.Response):void{
		var p_menu:IMenu = <IMenu>req.body;
		PerfilDAO.findOneAndUpdate(
			{ "_id": req.params.idPerfil , "menus._id": p_menu._id }
			,{ "$set":{"menus.$": p_menu}}
			,function(err:any) {
				if(err){
					res.status(400).json(err);
				}else{
					res.send(true);
				}
			}
		);
	}
	@Delete("/menu/:idPerfil,:idMenu")
	deleteMenu(req:express.Request,res:express.Response):void {
		PerfilDAO.findByIdAndUpdate(req.params.idPerfil,{$pull:{"menus":{_id:req.params.idMenu}}}
			,function(err:any) {
				if(!err){
					res.send(true);
				}else{
					res.status(400).json(err);
				}
			}
		);
	}
	@Post("/menu/menuitem/:idPerfil,:idMenu")
	addMenuItem(req:express.Request,res:express.Response):void {
		var p_menuItem:IItemMenu = <IItemMenu>req.body;
		PerfilDAO.find(
			{
						"_id":req.params.idPerfil
					}
				,{
					"descricao":1
					,"menus":1
				}
				,function(err:any,rowPerfil:IPerfil[]){
					if(err){
						res.status(400).json(err);
					}else{
						rowPerfil.forEach(function(itemPerfil:any){
							var indNew = 0;
							var y = 0;
							var tmMenus = itemPerfil.menus.length;
							for(y = 0;y < tmMenus;y++){
									//usando desc, para simplificar, mas em producao sera _id do Menu
									if(itemPerfil.menus[y]._id==req.params.idMenu){
											//itemPerfil.menus[y].children.push({"label":"novo item "+itemPerfil.menus[y].children.length+" para o menu2"ordem":48998});
											itemPerfil.menus[y].children.push(p_menuItem);
											indNew = itemPerfil.menus[y].children.length;
											break;
									};
							};
							itemPerfil.save(itemPerfil,function (err2:any) {
								if (err2){
									res.status(400).json(err2);
								}else{
									res.send(itemPerfil.menus[y].children[indNew-1]._id);
								};
						});
					});
					};
			}
		);
	}
	@Put("/menu/menuitem/:idPerfil,:idMenu")
	updateMenuItem(req:express.Request,res:express.Response):void {
		var p_menuItem:IItemMenu = <IItemMenu>req.body;
		PerfilDAO.update(
						{ "menus.children._id" : p_menuItem._id},
						{ "$push": { "menus.0.children": p_menuItem } },
								function(err:any) {
									if(!err){
										res.send(true);
									}else{
										res.status(400).json(err);
									}
								}
					);
	}
	//"/perfil/menu/menuitem/:idPerfil,:idMenu,:idMenuItem"
	@Delete("/menu/menuitem/:idPerfil,:idMenu,:idMenuItem")
	deleteMenuItem(req:express.Request,res:express.Response):void{
			PerfilDAO.findByIdAndUpdate(req.params.idPerfil,{$pull:{"menus":{_id:req.params.idMenu}}}
				,function(err:any){
					if(!err){
						res.send(true);
					}else{
						res.status(400).json(err);
					}
				}
			);
	}
}
