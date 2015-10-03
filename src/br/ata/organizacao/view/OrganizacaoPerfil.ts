import {IOrganizacao, IOrganizacaoPerfil} from "../model/IOrganizacao";
import {Organizacao} from "./Organizacao";
import {ModWindow} from "../../../../lib/container";
import {Button, AlertMsg, Select, ListView, ItemView} from "../../../../lib/controller";
import {RequestManager, IDefaultRequest} from "../../../../lib/net";

export enum EOrganizacaoPerfilTP {
	APROVACAO,LIBERACAO
}

@ItemView({ url: "js/br/ata/organizacao/view/assets/html/organizacaoperfil.html", "list": "mainList" })
export class OrganizacaoPerfil extends ModWindow {
	itPerfil: Select;
	aviso: AlertMsg;
	btAddPerfil: Button;
	btDelPerfil: Button;
	mainList: ListView;
	_modOrganizacao: Organizacao;
	_tpModulo: number;
	constructor(p_modOrganizacao: Organizacao, p_tpModulo: EOrganizacaoPerfilTP) {
		super("*Perfis Associados", "br.ata.organizacao.view.OrganizacaoPerfil");
		this.setRevision("$Revision: 1 $");
		this.setSize(3);

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
		this._modOrganizacao = p_modOrganizacao;
		this._tpModulo = p_tpModulo;
	}
	onStart(): void {
		this.itPerfil.fromService({
			"url": "perfil/perfilsimples"
			, "module": this
		});
	}
	onChangeItem(p_obj: IOrganizacaoPerfil): IOrganizacaoPerfil {
		this.itPerfil.setValue(p_obj.idPerfil);
		return p_obj;
	}
	addPerfil(event: Event): void {
		event.preventDefault();
		if(this._tpModulo==EOrganizacaoPerfilTP.APROVACAO){
			this.addPerfilAprovacao();
		}else{
			this.addPerfilLiberacao();
		};
	}
	delPerfil(event: Event): void {
		event.preventDefault();
		if (this._tpModulo == EOrganizacaoPerfilTP.APROVACAO) {
			this.delPerfilAprovacao();
		} else {
			this.delPerfilLiberacao();
		};
	}
	addPerfilLiberacao(): void {
		if (this.itPerfil.getValue()) {
			var tmpOrganizacaoSelecionado: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
			var tmpPerfilSelecionado: IOrganizacaoPerfil = <IOrganizacaoPerfil>this.getMainList().getSelectedItem();
			if (!tmpOrganizacaoSelecionado.perfilLiberacao) {
				tmpOrganizacaoSelecionado.perfilLiberacao = [];
			} else {
				var indexPerfil: number = tmpOrganizacaoSelecionado.perfilLiberacao.indexOf(this.itPerfil.getValue());
				if (indexPerfil > -1) {
					this.aviso.setText("A organizacao ja possui esse perfil!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpOrganizacaoSelecionado.perfilLiberacao.push(this.itPerfil.getValue());
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
			var tmpOrganizacaoSelecionado: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
			var tmpPerfilSelecionado: IOrganizacaoPerfil = <IOrganizacaoPerfil>this.getMainList().getSelectedItem();
			if (!tmpOrganizacaoSelecionado.perfilAprovacao) {
				tmpOrganizacaoSelecionado.perfilAprovacao = [];
			} else {
				var indexPerfil: number = tmpOrganizacaoSelecionado.perfilAprovacao.indexOf(this.itPerfil.getValue());
				if (indexPerfil > -1) {
					this.aviso.setText("A organizacao ja possui esse perfil!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpOrganizacaoSelecionado.perfilAprovacao.push(this.itPerfil.getValue());
			this.aviso.setText("Salve o cadastro de organizacao para completar a acao!");
			this.aviso.setType(AlertMsg.TP_INFO);
			this.getPerfis();
		} else {
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	delPerfilAprovacao(): void {
		var tmpOrganizacaoSelecionado: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
		var tmpPerfilSelecionado: IOrganizacaoPerfil = <IOrganizacaoPerfil>this.getMainList().getSelectedItem();
		if (tmpOrganizacaoSelecionado && tmpPerfilSelecionado) {
			var tmpPerfis: string[] = tmpOrganizacaoSelecionado.perfilAprovacao;
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
		var tmpOrganizacaoSelecionado: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
		var tmpPerfilSelecionado: IOrganizacaoPerfil = <IOrganizacaoPerfil>this.getMainList().getSelectedItem();
		if (tmpOrganizacaoSelecionado && tmpPerfilSelecionado) {
			var tmpPerfis: string[] = tmpOrganizacaoSelecionado.perfilLiberacao;
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
		//console.log(p_idOrganizacao);
		var tmpPerfil: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
		var tmpPerfis: string[] = [];
		if(this._tpModulo==EOrganizacaoPerfilTP.LIBERACAO){
			tmpPerfis = tmpPerfil.perfilLiberacao;
		}else{
			tmpPerfis = tmpPerfil.perfilAprovacao;
		};
		var tmpArrayPerfis: IOrganizacaoPerfil[] = [];
		if (tmpPerfis) {
			var tmPerfis: number = tmpPerfis.length;
			for (var x: number = 0; x < tmPerfis; x++) {
				var tmpDescPerfil = this.itPerfil.getDescFromServiceByValue(tmpPerfis[x]);
				//console.log(tmpDescPerfil);
				tmpArrayPerfis.push({ "idPerfil": tmpPerfis[x], "descricao": tmpDescPerfil });
			};
		};
		this.getMainList().setDataProvider(tmpArrayPerfis);
	}
}
