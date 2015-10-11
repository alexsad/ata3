import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router";
import {CertificadoDAO} from "../model/certificado";
import {ICertificado} from "../model/ICertificado";

@Controller()
export class Certificado{
		@Get()
		get(req:express.Request,res:express.Response):void{
			CertificadoDAO.find({}).exec().then(
				function(dta:ICertificado[]){
					res.json(dta);
				}
				,function(err){
					res.status(400).json(err);
				}
			);
		}
		@Post()
		add(req:express.Request,res:express.Response):void{
			var ncertificado:ICertificado = <ICertificado>req.body;
			CertificadoDAO.create(ncertificado).then(
				function(p_ncertificado:ICertificado) {
				  	res.json(p_ncertificado._id);
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
			var p_certificado:ICertificado = <ICertificado>req.body;
			var tmpId: string =  p_certificado._id;
			delete p_certificado._id;
			CertificadoDAO.findByIdAndUpdate(tmpId, { $set: p_certificado }, function(err) {
				if(err){
					res.status(400).json(err);
				}else{
					res.send(true);
				}
			});
		}
		@Delete("/:_id")
		delete(req:express.Request,res:express.Response):void{
			CertificadoDAO.findByIdAndRemove(req.params._id).exec().then(
				function(){
						res.send(true);
				}
				,function(err:any) {
				    res.status(400).json(err);
				}
			);
		}
}