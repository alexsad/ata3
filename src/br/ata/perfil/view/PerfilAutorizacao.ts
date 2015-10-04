import {IPerfil, IPerfilAutorizacao} from "../model/IPerfil";
import {PerfilView} from "./PerfilView";
import {ModWindow} from "../../../../lib/container";
import {Button, AlertMsg, Select, ListView, ItemView} from "../../../../lib/controller";
import {RequestManager, IDefaultRequest} from "../../../../lib/net";

export enum EPerfilAutorizacaoTP {
	APROVACAO,LIBERACAO
}

@ItemView({ url: "js/br/ata/perfil/view/assets/html/perfilautorizacao.html", "list": "mainList" })
export class PerfilAutorizacao extends ModWindow {
	itPerfil: Select;
	aviso: AlertMsg;
	btAddPerfil: Button;
	btDelPerfil: Button;
	mainList: ListView;
	_modPerfilView: PerfilView;
	_tpModulo: number;
	constructor(p_modPerfilView: PerfilView, p_tpModulo: EPerfilAutorizacaoTP) {
		super("*Perfis Associados", "br.ata.organizacao.view.PerfilViewPerfil");
		this.setRevision("$Revision: 1 $");
		this.setSize(4);

		this.aviso = new AlertMsg("Cadastro");
		this.aviso.setType(AlertMsg.TP_ERROR);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itPerfil = new Select("selecione uma pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setValueField("_id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setSize(12);
		this.append(this.itPerfil);

		this.btAddPerfil = new Button("Adicionar");
		this.btAddPerfil.addEvent("click", this.addPerfil.bind(this));
		this.btAddPerfil.setSize(6);
		this.append(this.btAddPerfil);

		this.btDelPerfil = new Button("Remover");
		this.btDelPerfil.addEvent("click", this.delPerfil.bind(this));
		this.btDelPerfil.getEle().removeClass("btn-default").addClass("btn-warning");
		this.btDelPerfil.setSize(6);
		this.append(this.btDelPerfil);

		this.mainList = new ListView("perfis");
		//this.setMainList("mainList");
		this.append(this.mainList);
		this._modPerfilView = p_modPerfilView;
		this._tpModulo = p_tpModulo;
	}
	onStart(): void {
		this.itPerfil.fromService({
			"url": "perfil/perfilsimples"
			, "module": this
		});
	}
	onChangeItem(p_obj: IPerfil): IPerfil {
		this.itPerfil.setValue(p_obj._id);
		return p_obj;
	}


	beforeUpdate(p_req: IDefaultRequest, p_old_obj: IPerfil) {
		if (p_old_obj.perfilAprovacao) {
			p_req.data["perfilAprovacao"] = [];
			p_req.data["perfilAprovacao"] = p_old_obj.perfilAprovacao;
		};
		if (p_old_obj.perfilLiberacao) {
			p_req.data["perfilLiberacao"] = [];
			p_req.data["perfilLiberacao"] = p_old_obj.perfilLiberacao;
		};
		return p_req;
	}

	addPerfil(event: Event): void {
		event.preventDefault();
		if(this._tpModulo==EPerfilAutorizacaoTP.APROVACAO){
			this.addPerfilAprovacao();
		}else{
			this.addPerfilLiberacao();
		};
	}
	delPerfil(event: Event): void {
		event.preventDefault();
		if (this._tpModulo == EPerfilAutorizacaoTP.APROVACAO) {
			this.delPerfilAprovacao();
		} else {
			this.delPerfilLiberacao();
		};
	}
	addPerfilLiberacao(): void {
		if (this.itPerfil.getValue()) {
			var tmpPerfilViewSelecionado: IPerfil = <IPerfil>this._modPerfilView.getMainList().getSelectedItem();
			var tmpPerfilSelecionado: IPerfil = <IPerfil>this.getMainList().getSelectedItem();
			if (!tmpPerfilViewSelecionado.perfilLiberacao) {
				tmpPerfilViewSelecionado.perfilLiberacao = [];
			} else {
				var indexPerfil: number = tmpPerfilViewSelecionado.perfilLiberacao.indexOf(this.itPerfil.getValue());
				if (indexPerfil > -1) {
					this.aviso.setText("A organizacao ja possui esse perfil!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpPerfilViewSelecionado.perfilLiberacao.push(this.itPerfil.getValue());
			this.aviso.setText("Salve o cadastro de organizacao para completar a acao!");
			this.aviso.setType(AlertMsg.TP_INFO);
			this.getPerfis();
		} else {
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	addPerfilAprovacao():void {
		if (this.itPerfil.getValue()) {
			var tmpPerfilViewSelecionado: IPerfil = <IPerfil>this._modPerfilView.getMainList().getSelectedItem();
			var tmpPerfilSelecionado: IPerfilAutorizacao = <IPerfilAutorizacao>this.getMainList().getSelectedItem();
			if (!tmpPerfilViewSelecionado.perfilAprovacao) {
				tmpPerfilViewSelecionado.perfilAprovacao = [];
			} else {
				var indexPerfil: number = tmpPerfilViewSelecionado.perfilAprovacao.indexOf(this.itPerfil.getValue());
				if (indexPerfil > -1) {
					this.aviso.setText("A organizacao ja possui esse perfil!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpPerfilViewSelecionado.perfilAprovacao.push(this.itPerfil.getValue());
			this.aviso.setText("Salve o cadastro de organizacao para completar a acao!");
			this.aviso.setType(AlertMsg.TP_INFO);
			this.getPerfis();
		} else {
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	delPerfilAprovacao(): void {
		var tmpPerfilViewSelecionado: IPerfil = <IPerfil>this._modPerfilView.getMainList().getSelectedItem();
		var tmpPerfilSelecionado: IPerfilAutorizacao = <IPerfilAutorizacao>this.getMainList().getSelectedItem();
		if (tmpPerfilViewSelecionado && tmpPerfilSelecionado) {
			var tmpPerfis: string[] = tmpPerfilViewSelecionado.perfilAprovacao;
			var indexPerfil: number = tmpPerfis.indexOf(tmpPerfilSelecionado.idPerfil);
			if (indexPerfil > -1) {
				tmpPerfis.splice(indexPerfil, 1);
				this.aviso.setText("Salve o cadastro de organizacao para completar a acao!");
				this.aviso.setType(AlertMsg.TP_INFO);
			} else {
				this.aviso.setText("A organizacao nao possui mais esse perfil!");
				this.aviso.setType(AlertMsg.TP_ERROR);
			}
			this.getPerfis();
		} else {
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	delPerfilLiberacao(): void {
		var tmpPerfilViewSelecionado: IPerfil = <IPerfil>this._modPerfilView.getMainList().getSelectedItem();
		var tmpPerfilSelecionado: IPerfilAutorizacao = <IPerfilAutorizacao>this.getMainList().getSelectedItem();
		if (tmpPerfilViewSelecionado && tmpPerfilSelecionado) {
			var tmpPerfis: string[] = tmpPerfilViewSelecionado.perfilLiberacao;
			var indexPerfil: number = tmpPerfis.indexOf(tmpPerfilSelecionado.idPerfil);
			if (indexPerfil > -1) {
				tmpPerfis.splice(indexPerfil, 1);
				this.aviso.setText("Salve o cadastro de organizacao para completar a acao!");
				this.aviso.setType(AlertMsg.TP_INFO);
			} else {
				this.aviso.setText("A organizacao nao possui mais esse perfil!");
				this.aviso.setType(AlertMsg.TP_ERROR);
			}
			this.getPerfis();
		} else {
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	getPerfis(): void {
		//console.log(p_idPerfilView);
		var tmpPerfil: IPerfil = <IPerfil>this._modPerfilView.getMainList().getSelectedItem();
		var tmpPerfis: string[] = [];
		if(this._tpModulo==EPerfilAutorizacaoTP.LIBERACAO){
			tmpPerfis = tmpPerfil.perfilLiberacao;
		}else{
			tmpPerfis = tmpPerfil.perfilAprovacao;
		};
		var tmpArrayPerfis: IPerfilAutorizacao[] = [];
		if (tmpPerfis) {
			var tmPerfis: number = tmpPerfis.length;
			for (var x: number = 0; x < tmPerfis; x++) {
				var tmpDescPerfil:string = this.itPerfil.getDescFromServiceByValue(tmpPerfis[x]);
				//console.log(tmpDescPerfil);
				tmpArrayPerfis.push({ "idPerfil": tmpPerfis[x], "descricao": tmpDescPerfil });
			};
		};
		this.getMainList().setDataProvider(tmpArrayPerfis);
	}
}
