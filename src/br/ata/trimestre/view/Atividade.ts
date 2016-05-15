import {Button} from "lib/underas/button";
import {Alert} from "lib/underas/widget";
import {EBasicColorStatus} from "lib/underas/component";
import {TimeInput, TextArea, NumericStepper, Select, CheckBox, TextInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {$http, IRequestConfig} from "lib/underas/http";
import {IAtividade,EAtividadeStatus} from "../model/ITrimestre";
import PerfilBox = require("../../perfil/view/PerfilBox");

export class Atividade extends CRUDForm<IAtividade>{
	itIdEvento: TextInput;
	itIdTrimestre: TextInput;
	itSnEditavel: CheckBox;
	itDescricao: TextInput;
	itDetalhes: TextArea;
	itCodRefMLS: TextInput;
	itLocal: TextInput;
	itIdData: Select;
	itHora: TimeInput;
	itIdOrganizacao: Select;
	itIdResponsavel: Select;
	itOrcamento: NumericStepper;
	itPublicoAlvo: TextInput;
	itProposito: TextInput;
	itIdStatus: Select;
	itIdPerfil: Select;
	itDtDisponivel: Select;
	itDsObservacao: Alert;
	itVestuario: TextInput;
	btSubmeter: Button;
	trimestreSaldo: number;
	constructor() {
		super({ "domain": "atividade" });		
		this.setSize(8);

		this.buildToolBar();


		this.btDel.show(true);
		

		this.itDsObservacao = new Alert("Cadastre uma nova atividade clicando no '+'.");
		this.itDsObservacao.setSize(12);
		this.itDsObservacao.setColor(EBasicColorStatus.WARNING);
		this.append(this.itDsObservacao);


		this.itIdEvento = new TextInput("");
		this.itIdEvento.setName("$id");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);
		this.itIdEvento.setSize(2);
		this.append(this.itIdEvento);

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setName("!idTrimestre");
		this.itIdTrimestre.setLabel("tri.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(2);
		this.append(this.itIdTrimestre);

		this.itCodRefMLS = new TextInput("");
		this.itCodRefMLS.setName("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("cod. ref. MLS");
		this.itCodRefMLS.setSize(3);
		this.itCodRefMLS.setEnable(false);
		this.append(this.itCodRefMLS);

		this.itIdStatus = new Select("Status");
		this.itIdStatus.setName("@idStatus");
		this.itIdStatus.setLabel("Status");
		this.itIdStatus.setValueField("idStatus");
		this.itIdStatus.setLabelField("descricao");
		this.itIdStatus.setSize(3);
		this.itIdStatus.setEnable(false);
		this.append(this.itIdStatus);

		this.itSnEditavel = new CheckBox("Editavel?", "Sim");
		this.itSnEditavel.setName("@snEditavel");
		this.itSnEditavel.setCheckedValue("S");
		this.itSnEditavel.setUnCheckedValue("N");
		this.itSnEditavel.setLabel("Editavel");
		this.itSnEditavel.setSize(2);
		this.itSnEditavel.setEnable(false);
		this.append(this.itSnEditavel);

		this.itDescricao = new TextInput("");
		this.itDescricao.setName("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(12);
		this.append(this.itDescricao);

		this.itDtDisponivel = new Select("datas disponiveis");
		this.itDtDisponivel.setLabel("Dts. Livres");
		this.itDtDisponivel.setValueField("id");
		this.itDtDisponivel.setLabelField("dsData");
		this.itDtDisponivel.setEnable(false,1);
		this.itDtDisponivel.setSize(5);
		this.append(this.itDtDisponivel);


		this.itIdData = new Select("data");
		this.itIdData.setName("@idData");
		this.itIdData.setPlaceHolder("ex. 31-12-2015");
		this.itIdData.setValueField("id");
		this.itIdData.setLabelField("dsData");
		this.itIdData.setLabel("data");
		this.itIdData.setEnable(false);
		this.itIdData.setSize(4);
		this.append(this.itIdData);


		this.itHora = new TimeInput("19:00");
		this.itHora.setName("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);
		this.append(this.itHora);

		this.itLocal = new TextInput("capela");
		this.itLocal.setName("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(12);
		this.append(this.itLocal);

		this.itIdPerfil = new Select("pefil");
		this.itIdPerfil.setName("@idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(3);
		this.itIdPerfil.setEnable(false);
		this.append(this.itIdPerfil);

		this.itIdOrganizacao = new Select("organizacao");
		this.itIdOrganizacao.setName("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao:");
		this.itIdOrganizacao.setValueField("id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(3);
		this.itIdOrganizacao.setEnable(false);
		this.append(this.itIdOrganizacao);		

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setName("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("nome");
		this.itIdResponsavel.setSize(3);
		this.append(this.itIdResponsavel);

		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setName("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		this.itOrcamento.setMin(0);
		this.itOrcamento.setMax(0);
		this.itOrcamento.setStep(5);
		this.itOrcamento.setEnable(false, 2);
		this.itOrcamento.setEnable(false, 1);
		this.itOrcamento.setEnable(false, 3);
		this.itOrcamento.setSize(3);
		this.append(this.itOrcamento);

		this.itPublicoAlvo = new TextInput("");
		this.itPublicoAlvo.setName("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");
		this.itPublicoAlvo.setSize(6);
		this.itPublicoAlvo.setMaxLength(220);
		this.append(this.itPublicoAlvo);

		this.itVestuario = new TextInput("no padrao");
		this.itVestuario.setName("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);
		this.itVestuario.setMaxLength(150);
		this.append(this.itVestuario);

		this.itProposito = new TextInput("");
		this.itProposito.setName("@proposito");
		this.itProposito.setPlaceHolder("digite o proposito da atividade");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);
		this.itProposito.setMaxLength(300);
		this.append(this.itProposito);

		this.itDetalhes = new TextArea("");
		this.itDetalhes.setName("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setPlaceHolder("digite os detalhes da atividade");
		this.itDetalhes.setSize(12);
		this.itDetalhes.setMaxLength(300);
		this.append(this.itDetalhes);

		this.btAdd.addEvent('click', function(evt:Event) {
			this.novaAtividade();
		}.bind(this));

		this.btSubmeter = new Button("Enviar");
		this.btSubmeter.setColor(EBasicColorStatus.INFO);
		this.btSubmeter.setIcon("glyphicon glyphicon-send");
		this.btSubmeter.addEvent('click', this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.append(this.btSubmeter,true);

		this.buildTileList({ itemViewResource: "trimestre/view/assets/html/evento" });
	}
	onStart():void{
		this.itIdResponsavel.fromService({
			url: "membro/getbysnativo/S"
		});
		this.itIdStatus.fromService({
			url: "atividade/getatividadestatus"
		});
		this.itIdPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
		this.itIdOrganizacao.fromService({
			"url": "organizacao"
		});
		this.itDtDisponivel.getInput().on("change", this.setDtEvento.bind(this));
		this.addEvent(Atividade.EVENT_BEFORE_DELETE, (evt: Event) => evt.preventDefault());
		this.addEvent(Atividade.EVENT_BEFORE_UPDATE, this.beforeUpdate.bind(this));
		this.addEvent(Atividade.EVENT_BEFORE_INSERT, this.beforeInsert.bind(this));
		this.addEvent(Atividade.EVENT_BEFORE_SAVE, this.beforeSave.bind(this));
		this.addEvent(Atividade.EVENT_AFTER_INSERT, this.afterInsert.bind(this));
	}
	private onReceiveDatasDisponiveis(tmpDatasDiponiveis: Atividade[]): void {
		this.itDtDisponivel.setDataProvider(tmpDatasDiponiveis);
		if (tmpDatasDiponiveis.length > 0) {
			this.itDtDisponivel.setEnable(true);
		} else {
			this.itDtDisponivel.setEnable(false);
		}
	}
	getByIdTrimestreIdPerfil(p_idTrimestre:number,p_idPerfil:number,p_saldo:number):void{
        this.clearFormItem();
        this.novaAtividade();
		this.itIdTrimestre.setValue(p_idTrimestre + "");
		$http
			.get("atividade/getbyidtrimestreidperfil/" + p_idTrimestre + "/" + p_idPerfil)
			.done((dta: IAtividade[]) => this.mainList.setDataProvider(dta));
		
		this.itIdData.fromService({
			"url": "trimestredatalivre/getbyidtrimestre/" + p_idTrimestre
		});
		$http
			.get("trimestredatalivre/getdisponiveisbyidtrimestre/" + p_idTrimestre)
			.done((dta: Atividade[]) => this.onReceiveDatasDisponiveis(dta));
	}
	private novaAtividade():void{
		this.itDsObservacao.setValue("Cadastre uma nova atividade clicando no '+'.");
		this.itDsObservacao.setColor(EBasicColorStatus.WARNING);
		this.itIdEvento.setValue("");
		this.itDescricao.setValue("");
		this.itPublicoAlvo.setValue("");
		this.itVestuario.setValue("");
		this.itProposito.setValue("");
		this.itDetalhes.setValue("");

		this.habilitarCampos(true);
		this.btSubmeter.setEnable(false);
		this.itIdStatus.setValue("1");

		this.itIdPerfil.setValue(PerfilBox.getIdPerfil()+"");
		this.itIdResponsavel.setValue(PerfilBox.idUsuario + "");
		this.itSnEditavel.setValue("S");
		this.itOrcamento.setValue(this.trimestreSaldo+"");
		this.itOrcamento.setMax(this.trimestreSaldo);
		//console.log(this.itOrcamento.maxvl);
		this.itIdData.setValue(this.itDtDisponivel.getValue());
		this.btSubmeter.setEnable(false);
	}
	private onChangeItem(p_item:IAtividade):IAtividade{
		//console.log(this.itIdData.getInput().val());
		var on = (p_item.snEditavel=="S");
		this.habilitarCampos(on);
		if(on){
			var tmpVlAtiv: number = p_item.orcamento;
			//console.log(tmpVlAtiv+":"+this._modTrimestreView.getSaldo());
			this.itOrcamento.setMax(this.trimestreSaldo + tmpVlAtiv);
			this.btSubmeter.setEnable(true);
		}else{
			this.btSubmeter.setEnable(false);
		}
		return p_item;
	}
	private habilitarCampos(on:boolean):void{
		this.itDescricao.setEnable(on);
		this.itLocal.setEnable(on);
		this.itDtDisponivel.setEnable(on);
		this.itHora.setEnable(on);
		this.itIdResponsavel.setEnable(on);
		this.itPublicoAlvo.setEnable(on);
		this.itVestuario.setEnable(on);
		this.itProposito.setEnable(on);
		this.itDetalhes.setEnable(on);
		this.itCodRefMLS.setEnable(on);
		this.btSubmeter.setEnable(on);
		this.itOrcamento.setEnable(on, 1);
		this.itOrcamento.setEnable(on, 3);
		this.itIdOrganizacao.setEnable(on);
		this.btSave.setEnable(on);
	}
	private setDtEvento(evt:Event):void{
		this.itIdData.setValue(this.itDtDisponivel.getValue());
	}
	private getIcone(p_idStatus:number):string{
		var tpAlert: string = "info";
		if (p_idStatus == EAtividadeStatus.PENDENTE) {
			tpAlert = "danger";
		} else if (p_idStatus == EAtividadeStatus.ENVIADA) {
			tpAlert = "warning";
		} else if (p_idStatus == EAtividadeStatus.LIBERADA) {
			tpAlert = "success";
		};
		return tpAlert;
	}
	private onUpdateAtividade(rt_save: boolean): void {
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		var tmpStatus: string = EAtividadeStatus[tmpItemAtiv.idStatus].toLowerCase();
		if (rt_save) {
			if (tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA) {
				tmpStatus = "aprovada";
			};
			tmpItemAtiv.dsObservacao = "Atividade enviada com sucesso, em breve sua atividade sera analisada e se tudo estiver correto ela sera " + tmpStatus + "!";
			this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			this.itDsObservacao.setColor(EBasicColorStatus.INFO);
		} else {
			tmpItemAtiv.dsObservacao = "A atividade nao pode ser " + tmpStatus + ", entre em contato com o bispado em caso de duvidas!";
			this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			this.itDsObservacao.setColor(EBasicColorStatus.DANGER);
		}
	}
	private submeter(): void {
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		if (tmpItemAtiv.snEditavel == "S") {
			tmpItemAtiv.snEditavel = "N";
			tmpItemAtiv.idStatus = EAtividadeStatus.ENVIADA;
			$http
				.put("atividade")
				.body(tmpItemAtiv)
				.done((res: boolean) => this.onUpdateAtividade(res));
		};
	}
	private beforeSave(evt: Event,p_obj: IAtividade): void {
		if (p_obj.local == "") {
			p_obj.local = "capela";
		};
		if (p_obj.vestuario == "") {
			p_obj.vestuario = "no padrao";
		};
		this.itOrcamento.setMax(p_obj.orcamento);
	}
	private beforeInsert(evt: Event,p_req_obj: IRequestConfig): void{
		p_req_obj.body.idStatus = EAtividadeStatus.ELABORADA;
		p_req_obj.body.iconStatus = "info";
	}
	private afterInsert(evt: Event,p_obj: IAtividade): void {		
		p_obj.datalivre = {
			id:p_obj.idData
			,snDisponivel:"N"
			,idTrimestre:p_obj.idTrimestre
			,momento:""
		}
	}
	private beforeUpdate(evt:Event,p_req_obj: IRequestConfig, p_old_obj:IAtividade):void {
		if(p_old_obj.snEditavel=="N"){
			evt.preventDefault();
		};
		p_old_obj.iconStatus = this.getIcone(p_old_obj.idStatus);
	}
}
