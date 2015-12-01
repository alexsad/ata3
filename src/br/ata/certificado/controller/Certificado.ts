import server = require('restify');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import CertificadoDAO = require("../model/certificado");
import {ICertificado} from "../model/ICertificado";

@Controller()
export class Certificado{
		@Get()
		get(req:server.Request,res:server.Response):void{
			CertificadoDAO.findAll().then(function(dta:ICertificado[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}
		@Post()
		add(req:server.Request,res:server.Response):void{
			var ncertificado:ICertificado = <ICertificado>req.body;
			CertificadoDAO.create(ncertificado).then(function(p_ncertificado: ICertificado) {
				res.json(p_ncertificado);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}
		@Put()
		atualizar(req:server.Request,res:server.Response):void{
			var ncertificado: ICertificado = <ICertificado>req.body;
			CertificadoDAO.upsert(ncertificado).then(function(p_ncertificado: ICertificado) {
				res.json(ncertificado);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}
		@Delete("/:id")
		delete(req:server.Request,res:server.Response):void{
			CertificadoDAO.destroy({
				where: {
					id:req.params.id
				}
			}).then(function(p_ncertificado: ICertificado) {
				res.send(true);
			}).catch(function(err:any) {
				res.status(400);
			res.json(err);
			});
		}

}
