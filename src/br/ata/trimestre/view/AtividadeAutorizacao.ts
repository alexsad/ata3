import {SystemApplication} from "lib/underas/core";
import {EBasicColorStatus,EViewSize} from "lib/underas/component";
import {Form,ToolBar} from "lib/underas/container";
import {TimeInput, TextArea, NumericStepper, DatePickerInput, Select, CheckBox, TextInput} from "lib/underas/input";
import {TileList} from "lib/underas/widget_mod/TileList";
import {Button} from "lib/underas/button";
import {Alert} from "lib/underas/widget";
import {$http, IRequestConfig} from "lib/underas/http";
import {IAtividade, EAtividadeStatus} from "../model/ITrimestre";
import PerfilBox = require("../../perfil/view/PerfilBox");
import {jsPDF} from "lib/jspdf/jsPDF";
import {IReportTemplate, IReportTemplateItem} from "lib/jspdf/ijspdf";

export class AtividadeAutorizacao extends Form {
	itIdEvento: TextInput;
	itIdTrimestre: TextInput;
	itSnEditavel: CheckBox;
	itDescricao: TextInput;
	itDetalhes: TextArea;
	itCodRefMLS: TextInput;
	itLocal: TextInput;
	itMomento: TextInput;
	itHora: TimeInput;
	itIdOrganizacao: Select;
	itIdResponsavel: Select;
	itOrcamento: NumericStepper;
	itPublicoAlvo: TextInput;
	itProposito: TextInput;
	itIdStatus: Select;
	itIdPerfil: Select;
	itDsObservacao: Alert;
	itVestuario: TextInput;
	mainTb:ToolBar;
	mainList: TileList<IAtividade>;
	btPrintAta: Button;
	btSubmeter: Button;
	btCancelar: Button;
	btReload: Button;
	_idStatus: EAtividadeStatus;
	constructor() {
		super();
		this.setSize(12);

		this.mainTb = new ToolBar();
		this.append(this.mainTb);

		this.itDsObservacao = new Alert("Autorizacao de atividade...");
		//this.itDsObservacao.setName("#dsObservacao");
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
		this.itDescricao.setSize(8);
		this.itDescricao.setSize(7,EViewSize.EXTRA_SMALL)
		this.itDescricao.setEnable(false);
		this.append(this.itDescricao);


		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setName("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		this.itOrcamento.setMin(0);
		this.itOrcamento.setMax(0);
		this.itOrcamento.setStep(5);
		this.itOrcamento.setEnable(false);
		this.itOrcamento.setSize(4);
		this.itOrcamento.setSize(5, EViewSize.EXTRA_SMALL);
		this.append(this.itOrcamento);


		this.itMomento = new TextInput("data");
		this.itMomento.setIcon("calendar");
		this.itMomento.setName("@datalivre.dsData");
		this.itMomento.setPlaceHolder("ex. 31-12-2015");
		this.itMomento.setLabel("data");
		this.itMomento.setEnable(false);
		this.itMomento.setSize(4);
		//this.itMomento.setValueField("id");
		//this.itMomento.setLabelField("dsData");
		this.append(this.itMomento);


		this.itHora = new TimeInput("19:00");
		this.itHora.setName("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);
		this.itHora.setEnable(false);
		this.append(this.itHora);

		this.itLocal = new TextInput("capela");
		this.itLocal.setName("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(5);
		this.itLocal.setEnable(false);
		this.append(this.itLocal);

		this.itIdPerfil = new Select("selecione uma pefil");
		this.itIdPerfil.setName("@idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(4);
		this.itIdPerfil.setEnable(false);
		this.append(this.itIdPerfil);

		this.itIdOrganizacao = new Select("organizacao");
		this.itIdOrganizacao.setName("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao:");
		this.itIdOrganizacao.setValueField("id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(4);
		this.itIdOrganizacao.setEnable(false);
		this.append(this.itIdOrganizacao);

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setName("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("nome");
		this.itIdResponsavel.setSize(4);
		this.itIdResponsavel.setEnable(false);
		this.append(this.itIdResponsavel);


		this.itPublicoAlvo = new TextInput("");
		this.itPublicoAlvo.setName("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");
		this.itPublicoAlvo.setSize(6);
		this.itPublicoAlvo.setMaxLength(220);
		this.itPublicoAlvo.setEnable(false);
		this.append(this.itPublicoAlvo);

		this.itVestuario = new TextInput("no padrao");
		this.itVestuario.setName("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);
		this.itVestuario.setMaxLength(150);
		this.itVestuario.setEnable(false);
		this.append(this.itVestuario);

		this.itProposito = new TextInput("");
		this.itProposito.setName("@proposito");
		this.itProposito.setPlaceHolder("digite o proposito da atividade");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);
		this.itProposito.setMaxLength(300);
		this.itProposito.setEnable(false);
		this.append(this.itProposito);

		this.itDetalhes = new TextArea("");
		this.itDetalhes.setName("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setPlaceHolder("digite os detalhes da atividade");
		this.itDetalhes.setSize(12);
		this.itDetalhes.setMaxLength(300);
		this.itDetalhes.setEnable(false);
		this.append(this.itDetalhes);

		this.btSubmeter = new Button("Autorizar");
		this.btSubmeter.setColor(EBasicColorStatus.INFO);
		this.btSubmeter.setIcon("glyphicon glyphicon-check");
		this.btSubmeter.addEvent('click', this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.append(this.btSubmeter,true);

		this.btCancelar = new Button("Pendente");
		this.btSubmeter.setColor(EBasicColorStatus.WARNING);
		this.btCancelar.setIcon("glyphicon glyphicon-circle-arrow-down");
		this.btCancelar.addEvent('click', this.cancelar.bind(this));
		this.btCancelar.setEnable(false);
		this.mainTb.append(this.btCancelar);

		this.btReload = new Button("Reload");
		this.btReload.setIcon("glyphicon glyphicon-refresh");
		this.btReload.addEvent('click', this.Atualizar.bind(this));
		this.btReload.setEnable(true);
		this.mainTb.append(this.btReload);

		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("glyphicon glyphicon-print");
		//this.btPrintAta.setEnable(false);
		this.btPrintAta.addEvent('click', this.printAta.bind(this));
		this.mainTb.append(this.btPrintAta);

		this.mainList = new TileList<IAtividade>("Evento");
		this.mainList.setItemViewResource("trimestre/view/assets/html/evento");
		this.append(this.mainList);

		this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE,this.onChangeItem.bind(this));
	}
	onStart(): void {
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
	}
	private onReportReady(reporttemplate: IReportTemplate): void {
		var tmpAtiv:IAtividade = this.mainList.getSelectedItem();
		console.log(tmpAtiv);
		tmpAtiv.nmResponsavel = (<AtividadeAutorizacao>this).itIdResponsavel.getDescFromServiceByValue(tmpAtiv.idResponsavel + "");
		//tmpAtiv.momento = (<AtividadeAutorizacao>this).itMomento.getDescFromServiceByValue(tmpAtiv.idData + "");
		//tmpAtiv.momento = tmpAtiv.momento.substring(0, 10);
		tmpAtiv.momento = tmpAtiv.datalivre.dsData.substring(0, 10);
		tmpAtiv.dsOrganizacao = (<AtividadeAutorizacao>this).itIdOrganizacao.getDescFromServiceByValue(tmpAtiv.idOrganizacao + "");
		reporttemplate.dataSets[0].itens.push(<IReportTemplateItem>tmpAtiv);

		var jspdfdoc = new jsPDF('p', 'pt', 'a4');
		jspdfdoc.setJereport(reporttemplate);
		jspdfdoc.save("ata_" + tmpAtiv.codRefMLS + ".pdf");
	}
	printAta():void{
		$http
			.get("assets/reports/ata_atividade2.json?rev=" + SystemApplication.getProjectVersion(), { rootUrl: SystemApplication.getLocation()})
			.done((reporttemplate: IReportTemplate) => this.onReportReady(reporttemplate));
	}
	getByIdStatus(p_idStatus:EAtividadeStatus):void{
		this._idStatus = p_idStatus;
		$http
			.get("atividade/getbyidperfilidstatus/" + PerfilBox.getIdPerfil() + "/" + p_idStatus)
			.done((dta: IAtividade[]) => this.mainList.setDataProvider(dta));
	}
	private Atualizar(evt:Event):void{
		this.getByIdStatus(this._idStatus);
	}
	getAtividadesEnviadas():void{
		this.getByIdStatus(EAtividadeStatus.ENVIADA);
	}
	getAtividadesAprovadas(): void {
		this.itCodRefMLS.setName("@codRefMLS");
		this.getByIdStatus(EAtividadeStatus.APROVADA);
	}

	private onChangeItem(evt:Event,p_item: IAtividade): void {
		var on = (p_item.idStatus == this._idStatus);
		this.habilitarCampos(on);
		this.setFormItem(p_item);
		/*
		this.itMomento.fromService({
			"url": "trimestredatalivre/getbyidtrimestre/" + p_item.idTrimestre
		});
		*/
	}
	habilitarCampos(on: boolean): void {
		this.itCodRefMLS.setEnable(on);
		this.btSubmeter.setEnable(on);
	}
	getIcone(p_idStatus: number): string {
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
	private onCancel(rt_save: boolean): void {
		this.itDsObservacao.setText("Atividade cancelada!");
		this.itDsObservacao.setColor(EBasicColorStatus.WARNING);
	}
	cancelar(): void {
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		if (tmpItemAtiv.snEditavel == "S") {
			tmpItemAtiv.snEditavel = "N";
			tmpItemAtiv.idStatus = EAtividadeStatus.PENDENTE;
			$http
				.put("atividade")
				.body(tmpItemAtiv)
				.done((res: boolean) => this.onCancel(res));
		}
	}
	private onUpdateAtividade(rt_atividade: IAtividade): void {
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		var tmpStatus: string = EAtividadeStatus[rt_atividade.idStatus].toLowerCase();
		if(rt_atividade.idStatus == EAtividadeStatus.LIBERADA || rt_atividade.idStatus == EAtividadeStatus.APROVADA) {
			//tmpStatus = "aprovada";
			//tmpItemAtiv.codRefMLS = rt_atividade.codRefMLS;
			tmpItemAtiv.dsObservacao = "Atividade enviada com sucesso, em breve sua atividade sera analisada e se tudo estiver correto ela sera " + tmpStatus + "!";
			this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			this.itDsObservacao.setColor(EBasicColorStatus.INFO);
		}else{
			tmpItemAtiv.dsObservacao = "A atividade nao pode ser " + tmpStatus + ", entre em contato com o bispado em caso de duvidas!";
			this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			this.itDsObservacao.setColor(EBasicColorStatus.DANGER);
		}
	}
	private submeter(): void {
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		if (tmpItemAtiv.idStatus == this._idStatus) {
			//tmpItemAtiv.snEditavel = "N";
			if(this.itCodRefMLS.isValid()){
				this.itCodRefMLS.setValid(true);

				if (tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA) {
					tmpItemAtiv.idStatus = EAtividadeStatus.APROVADA;
				} else if (tmpItemAtiv.idStatus == EAtividadeStatus.APROVADA) {
					tmpItemAtiv.idStatus = EAtividadeStatus.LIBERADA;
				} else {
					tmpItemAtiv.idStatus = EAtividadeStatus.ENVIADA;
				};

				if(this.itCodRefMLS.getValue()){
					tmpItemAtiv.codRefMLS = parseInt(this.itCodRefMLS.getValue());
				};
				$http
					.put("atividade")
					.body(tmpItemAtiv)
					.done((rt_atividade: IAtividade) => this.onUpdateAtividade(rt_atividade));
			}else{
				this.itCodRefMLS.setValid(false);
			}
		};
	}

}
