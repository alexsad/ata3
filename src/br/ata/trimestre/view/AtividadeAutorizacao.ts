import {ModWindow} from "../../../../lib/underas/container";
import {InputTime, Button, TextArea, NumericStepper, DatePicker, Select, AlertMsg, CheckBox, InputText, ListView, ItemView} from "../../../../lib/underas/controller";
import {SimpleToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {IAtividade, EAtividadeStatus} from "../model/ITrimestre";
import {PerfilBox} from "../../perfil/view/PerfilBox";
import jsPDF = require("../../../../lib/jspdf/jspdf");
import {PDFRender, IConfigColumnPrint, IConfigPrint} from "../../../../lib/jspdf/pdfrender"


declare var perfilBoxContainer: PerfilBox;

@ItemView("assets/html/evento.html")
export class AtividadeAutorizacao extends ModWindow {
	itIdEvento: InputText;
	itIdTrimestre: InputText;
	itSnEditavel: CheckBox;
	itDescricao: InputText;
	itDetalhes: TextArea;
	itCodRefMLS: InputText;
	itLocal: InputText;
	itMomento: Select;
	itHora: InputTime;
	itIdResponsavel: Select;
	itOrcamento: NumericStepper;
	itPublicoAlvo: InputText;
	itProposito: InputText;
	itIdStatus: Select;
	itIdPerfil: Select;
	itDsObservacao: AlertMsg;
	itVestuario: InputText;
	mainTb: SimpleToolBar;
	mainList: ListView;
	btPrintAta: Button;
	btSubmeter: Button;
	btCancelar: Button;
	_idStatus: EAtividadeStatus;
	constructor() {
		super("Atividades");
		this.setRevision("$Revision: 140 $");
		this.setSize(12);

		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);

		this.itDsObservacao = new AlertMsg("Autorizacao de atividade...");
		this.itDsObservacao.setColumn("#dsObservacao");
		this.itDsObservacao.setSize(12);
		this.itDsObservacao.setType(AlertMsg.TP_WARNING);
		this.append(this.itDsObservacao);


		this.itIdEvento = new InputText("");
		this.itIdEvento.setColumn("$id");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);
		this.itIdEvento.setSize(2);
		this.append(this.itIdEvento);

		this.itIdTrimestre = new InputText("");
		this.itIdTrimestre.setColumn("!idTrimestre");
		this.itIdTrimestre.setLabel("tri.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(2);
		this.append(this.itIdTrimestre);

		this.itCodRefMLS = new InputText("");
		this.itCodRefMLS.setColumn("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("cod. ref. MLS");
		this.itCodRefMLS.setSize(3);
		this.itCodRefMLS.setEnable(false);
		this.append(this.itCodRefMLS);

		this.itIdStatus = new Select("Status");
		this.itIdStatus.setColumn("@idStatus");
		this.itIdStatus.setLabel("Status");
		this.itIdStatus.setValueField("idStatus");
		this.itIdStatus.setLabelField("descricao");
		this.itIdStatus.setSize(3);
		this.itIdStatus.setEnable(false);
		this.append(this.itIdStatus);

		this.itSnEditavel = new CheckBox("Editavel?", "Sim");
		this.itSnEditavel.setColumn("@snEditavel");
		this.itSnEditavel.setCheckedValue("S");
		this.itSnEditavel.setUnCheckedValue("N");
		this.itSnEditavel.setLabel("Editavel");
		this.itSnEditavel.setSize(2);
		this.itSnEditavel.setEnable(false);
		this.append(this.itSnEditavel);

		this.itDescricao = new InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(12);
		this.itDescricao.setEnable(false);
		this.append(this.itDescricao);


		this.itMomento = new Select("data");
		this.itMomento.setColumn("@idData");
		this.itMomento.setPlaceHolder("ex. 31-12-2015");
		this.itMomento.setLabel("data");
		this.itMomento.setEnable(false);
		this.itMomento.setSize(4);
		this.itMomento.setValueField("id");
		this.itMomento.setLabelField("dsData");
		this.append(this.itMomento);


		this.itHora = new InputTime("19:00");
		this.itHora.setColumn("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);
		this.itHora.setEnable(false);
		this.append(this.itHora);

		this.itLocal = new InputText("capela");
		this.itLocal.setColumn("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(5);
		this.itLocal.setEnable(false);
		this.append(this.itLocal);

		this.itIdPerfil = new Select("selecione uma pefil");
		this.itIdPerfil.setColumn("@idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(4);
		this.itIdPerfil.setEnable(false);
		this.append(this.itIdPerfil);

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setColumn("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("nome");
		this.itIdResponsavel.setSize(5);
		this.itIdResponsavel.setEnable(false);
		this.append(this.itIdResponsavel);

		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setColumn("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		this.itOrcamento.setMin(0);
		this.itOrcamento.setMax(0);
		this.itOrcamento.setStep(5);
		this.itOrcamento.setEnable(false);
		this.itOrcamento.setSize(3);
		this.append(this.itOrcamento);

		this.itPublicoAlvo = new InputText("");
		this.itPublicoAlvo.setColumn("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");
		this.itPublicoAlvo.setSize(6);
		this.itPublicoAlvo.setMaxLength(220);
		this.itPublicoAlvo.setEnable(false);
		this.append(this.itPublicoAlvo);

		this.itVestuario = new InputText("no padrao");
		this.itVestuario.setColumn("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);
		this.itVestuario.setMaxLength(150);
		this.itVestuario.setEnable(false);
		this.append(this.itVestuario);

		this.itProposito = new InputText("");
		this.itProposito.setColumn("@proposito");
		this.itProposito.setPlaceHolder("digite o proposito da atividade");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);
		this.itProposito.setMaxLength(300);
		this.itProposito.setEnable(false);
		this.append(this.itProposito);

		this.itDetalhes = new TextArea("");
		this.itDetalhes.setColumn("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setPlaceHolder("digite os detalhes da atividade");
		this.itDetalhes.setSize(12);
		this.itDetalhes.setMaxLength(300);
		this.itDetalhes.setEnable(false);
		this.append(this.itDetalhes);

		this.btSubmeter = new Button("Autorizar");
		this.btSubmeter.getEle().removeClass("btn-default").addClass("btn-info");
		this.btSubmeter.setIcon("check");
		this.btSubmeter.addEvent('click', this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.addButton(this.btSubmeter);

		this.btCancelar = new Button("Pendente");
		this.btCancelar.getEle().removeClass("btn-default").addClass("btn-warning");
		this.btCancelar.setIcon("circle-arrow-down");
		this.btCancelar.addEvent('click', this.cancelar.bind(this));
		this.btCancelar.setEnable(false);
		this.mainTb.addButton(this.btCancelar);

		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("print");
		//this.btPrintAta.setEnable(false);
		this.btPrintAta.addEvent('click', this.printAta.bind(this));
		this.mainTb.addButton(this.btPrintAta);

		this.mainList = new ListView("Evento");
		this.append(this.mainList);
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
	}
	printAta():void{
		
		/*

		var pdfRender: PDFRender = new PDFRender();
		pdfRender.setConfig({
			title:"teste"
			,subtitle:"teste2"
			,plusLines:0
			,orientation:""
			,render:[
				{column:"id",label:"cod",width:20}
				, { column: "descricao", label: "descricao", width: 50 }
				, { column: "hora", label: "hora", width: 20 }
				, { column: "orcamento", label: "orcamento", width: 20 }
				
			]
		});
		pdfRender.setData(this.mainList.getDataProvider());
		pdfRender.render();

		*/

		//var pdfRender:any = 

		var jspdfdoc = new jsPDF();

		jspdfdoc.setJereport("ddd");

		jspdfdoc.save("relatorio_" + "name_report2" + ".pdf");	

		//jsPDF.setJereport(222);

	}
	getByIdStatus(p_idStatus:EAtividadeStatus):void{
		this._idStatus = p_idStatus;
		RequestManager.addRequest({
			url: "atividade/getbyidperfilidstatus/" + perfilBoxContainer.getIdPerfil() + "/" + p_idStatus
			, onLoad: function(dta: IAtividade[]) {
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	getAtividadesEnviadas():void{
		this.getByIdStatus(EAtividadeStatus.ENVIADA);
	}
	getAtividadesAprovadas(): void {
		this.getByIdStatus(EAtividadeStatus.APROVADA);
	}

	onChangeItem(p_item: IAtividade): IAtividade {
		var on = (p_item.idStatus == this._idStatus);
		this.itMomento.fromService({
			"url": "trimestredatalivre/getbyidtrimestre/" + p_item.idTrimestre
		});
		this.habilitarCampos(on);
		this.itIdEvento.setValue(p_item.id+"");
		this.itIdTrimestre.setValue(p_item.idTrimestre + "");
		this.itIdPerfil.setValue(p_item.idPerfil + "");
		this.itDescricao.setValue(p_item.descricao);
		this.itDsObservacao.setValue(p_item.dsObservacao);
		this.itCodRefMLS.setValue(p_item.codRefMLS + "");
		this.itIdStatus.setValue(p_item.idStatus + "");
		this.itSnEditavel.setValue(p_item.snEditavel);
		this.itMomento.setValue(p_item.idData+"");
		this.itHora.setValue(p_item.hora);
		this.itLocal.setValue(p_item.local);
		this.itIdResponsavel.setValue(p_item.idResponsavel + "");
		this.itOrcamento.setValue(p_item.orcamento + "");
		this.itPublicoAlvo.setValue(p_item.publicoAlvo);
		this.itVestuario.setValue(p_item.vestuario);
		this.itProposito.setValue(p_item.proposito);
		this.itDetalhes.setValue(p_item.detalhes);

		return p_item;
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
	cancelar(): void {
		var tmpItemAtiv: IAtividade = <IAtividade>this.mainList.getSelectedItem();
		if (tmpItemAtiv.snEditavel == "S") {
			tmpItemAtiv.snEditavel = "N";
			tmpItemAtiv.idStatus = EAtividadeStatus.PENDENTE;
			RequestManager.addRequest({
				url: "atividade"
				, method: "PUT"
				, data: tmpItemAtiv
				, onLoad: function(rt_save: boolean): void {
					this.itDsObservacao.setText("Atividade cancelada!");
					this.itDsObservacao.setType(AlertMsg.TP_WARNING);
				}.bind(this)
			});
		}
	}
	submeter(): void {
		var tmpItemAtiv: IAtividade = <IAtividade>this.mainList.getSelectedItem();
		if (tmpItemAtiv.idStatus == this._idStatus) {
			//tmpItemAtiv.snEditavel = "N";
			if (tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA) {
				tmpItemAtiv.idStatus = EAtividadeStatus.APROVADA;
			} else if (tmpItemAtiv.idStatus == EAtividadeStatus.APROVADA) {
				tmpItemAtiv.idStatus = EAtividadeStatus.LIBERADA;
			} else {
				tmpItemAtiv.idStatus = EAtividadeStatus.ENVIADA;
			}
			RequestManager.addRequest({
				url: "atividade"
				, method: "PUT"
				, data: tmpItemAtiv
				, onLoad: function(rt_save: boolean): void {
					var tmpStatus: string = EAtividadeStatus[tmpItemAtiv.idStatus].toLowerCase();
					if (rt_save) {
						if (tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA) {
							tmpStatus = "aprovada";
						};
						tmpItemAtiv.dsObservacao = "Atividade enviada com sucesso, em breve sua atividade sera analisada e se tudo estiver correto ela sera " + tmpStatus + "!";
						this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
						this.itDsObservacao.setType(AlertMsg.TP_INFO);
					} else {
						tmpItemAtiv.dsObservacao = "A atividade nao pode ser " + tmpStatus + ", entre em contato com o bispado em caso de duvidas!";
						this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
						this.itDsObservacao.setType(AlertMsg.TP_ERROR);
					}
				}.bind(this)
			});
		};
	}

}
