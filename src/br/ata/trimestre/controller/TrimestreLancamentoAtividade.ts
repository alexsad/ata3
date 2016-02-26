import server = require('../../../../service/RestServer');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TrimestreLancamentoAtividadeDAO = require("../model/trimestrelancamentoatividade");
import {ITrimestreLancamentoAtividade} from "../model/ITrimestre";
import PerfilAR = require("../../perfil/model/perfil");

@Controller()
export class TrimestreLancamentoAtividade{
		@Get()
		get(req:server.Request,res:server.Response):void{
			TrimestreLancamentoAtividadeDAO.findAll().then(function(dta:ITrimestreLancamentoAtividade[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}	
		@Get("/getbyidtrimestre/:idtrimestre")
		getByIdTrimestre(req: server.Request, res: server.Response): void {
			TrimestreLancamentoAtividadeDAO.findAll({
				include: [{
					all: true
					, nested: false
					, model: PerfilAR
					, required: false
				}]
				,where:{
					idTrimestre:req.params.idtrimestre
				}				
			}).then(function(dta: ITrimestreLancamentoAtividade[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400);
				res.json(err);
			});
		}
		getTotalByIdTrimestreIdPerfil(p_idTrimestre:number,p_idPerfil:number){
			return TrimestreLancamentoAtividadeDAO.sum('valor', {
				where: {
					'id_trimestre': p_idTrimestre
					,'id_perfil':p_idPerfil
				}
			})
		}			
		@Post()
		add(req:server.Request,res:server.Response):void{
			var ntrimestrelancamentoatividade:ITrimestreLancamentoAtividade = <ITrimestreLancamentoAtividade>req.body;
			TrimestreLancamentoAtividadeDAO.create(ntrimestrelancamentoatividade).then(function(p_ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade) {
				res.json(p_ntrimestrelancamentoatividade);
			}).catch(function(err:any) {
				res.status(400);
				res.json(err);
			});
		}		
		@Put()
		atualizar(req:server.Request,res:server.Response):void{
			var ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade = <ITrimestreLancamentoAtividade>req.body;
			TrimestreLancamentoAtividadeDAO.upsert(ntrimestrelancamentoatividade).then(function() {
				res.json(ntrimestrelancamentoatividade);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}
		@Delete("/:id")
		delete(req:server.Request,res:server.Response):void{
			TrimestreLancamentoAtividadeDAO.destroy({
				where: {
					id:req.params.id
				}
			}).then(function(p_ntrimestrelancamentoatividade: ITrimestreLancamentoAtividade) {
				res.send(true);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}
		
}
