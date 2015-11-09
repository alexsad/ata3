import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import CertificadoDAO = require("../model/certificado");
import {ICertificado} from "../model/ICertificado";

@Controller()
export class Certificado{
		@Get()
		get(req:express.Request,res:express.Response):void{
			CertificadoDAO.findAll().then(function(dta:ICertificado[]) {
				res.json(dta);
			}).catch(function(err) {
				res.status(400).json(err);
			});
		}		
		@Get()
		add(req:express.Request,res:express.Response):void{
			var ncertificado:ICertificado = <ICertificado>req.body;
			CertificadoDAO.create(ncertificado).then(function(p_ncertificado: ICertificado) {
				res.json(p_ncertificado.id);
			}).catch(function(err) {
				res.status(400).json(err);
			});
		}		
		@Put()
		atualizar(req:express.Request,res:express.Response):void{
			var ncertificado: ICertificado = <ICertificado>req.body;
			CertificadoDAO.upsert(ncertificado).then(function(p_ncertificado: ICertificado) {
				res.send(true);
			}).catch(function(err) {
				res.status(400).json(err);
			});
		}
		@Delete("/:_id")
		delete(req:express.Request,res:express.Response):void{
			CertificadoDAO.destroy({
				where: {
					id:req.params._id
				}
			}).then(function(p_ncertificado: ICertificado) {
				res.send(true);
			}).catch(function(err) {
				res.status(400).json(err);
			});
		}
		
}
