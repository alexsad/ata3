import {ModWindow} from "../../../../lib/container";
import {InputTime, Button, TextArea, NumericStepper, DatePicker, Select, AlertMsg, CheckBox, InputText, ListView, ItemView} from "../../../../lib/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/net";
import {ITrimestre,IAtividade} from "../model/ITrimestre";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import {PerfilBox} from "../../perfil/view/PerfilBox";

declare var perfilBoxContainer: PerfilBox;

@ItemView("assets/html/evento.html")
export class Evento extends ModWindow {
	itIdEvento: InputText;
	itSnEditavel: CheckBox;	
	itIdTrimestre: InputText;	
	itDescricao: InputText;	 
	itDetalhes: TextArea;	 
	itCodRefMLS: InputText;
	itLocal: InputText;	 
	itMomento: DatePicker;	 
	itHora: InputTime;	 
	itIdResponsavel: Select;	 
	itOrcamento: NumericStepper;	 
	itPublicoAlvo: InputText;	 
	itProposito: InputText;	 
	itIdStatus: Select;	 
	itIdPerfil: InputText;
	itDtDisponivel: Select;	 
	itDsObservacao:AlertMsg;	 
	itVestuario: InputText;	
	mainTb: ToolBar;
	mainList: ListView; 
	btPrintAta: Button;
	btSubmeter: Button;

	constructor() {
		super("Atividades","br.ata.trimestre.view.Evento");
		this.setRevision("$Revision: 140 $");
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "evento" });
		this.append(this.mainTb);

		this.itDsObservacao = new AlertMsg("Cadastro de Nova Atividade...");
		this.itDsObservacao.setColumn("#dsObservacao");
		this.itDsObservacao.setSize(12);
		this.itDsObservacao.setType(AlertMsg.TP_WARNING);
		this.append(this.itDsObservacao);


		this.itIdEvento = new InputText("");
		this.itIdEvento.setColumn("$idEvento");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);
		this.itIdEvento.setSize(2);
		this.append(this.itIdEvento);

		this.itIdTrimestre = new InputText("");
		this.itIdTrimestre.setColumn("!idTrimestre");
		this.itIdTrimestre.setLabel("trim.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(2);
		this.itIdTrimestre.show(true);
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
		this.itIdStatus.setEnable(false);
		this.itIdStatus.setSize(5);
		this.append(this.itIdStatus);


		this.itDescricao = new InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(10);
		this.append(this.itDescricao);

		this.itSnEditavel = new CheckBox("Editavel?", "Sim");
		this.itSnEditavel.setColumn("@snEditavel");
		this.itSnEditavel.setCheckedValue("S");
		this.itSnEditavel.setUnCheckedValue("N");
		this.itSnEditavel.setLabel("Editavel");
		this.itSnEditavel.setSize(2);
		this.itSnEditavel.setEnable(false);
		this.append(this.itSnEditavel);

		this.itDtDisponivel = new Select("datas disponiveis");
		this.itDtDisponivel.setLabel("Dts. Livres");
		this.itDtDisponivel.setValueField("dtEventoData");
		this.itDtDisponivel.setLabelField("dsEventoData");
		this.itDtDisponivel.setEnable(true);
		this.itDtDisponivel.setSize(5);
		this.append(this.itDtDisponivel);


		this.itMomento = new DatePicker();
		this.itMomento.setColumn("@momento");
		this.itMomento.setPlaceHolder("ex. 31-12-2015");
		this.itMomento.setLabel("data");
		this.itMomento.setEnable(false);
		this.itMomento.setSize(4);
		this.append(this.itMomento);	


		this.itHora = new InputTime("19:00");
		this.itHora.setColumn("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);	
		this.append(this.itHora);

		this.itLocal = new InputText("capela");
		this.itLocal.setColumn("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(12);
		this.append(this.itLocal);

		this.itIdPerfil = new InputText("");
		this.itIdPerfil.setColumn("@idPerfil");
		this.itIdPerfil.setLabel("perfil");
		this.itIdPerfil.setSize(4);
		this.itIdPerfil.setEnable(false);
		this.append(this.itIdPerfil);

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setColumn("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("_id");
		this.itIdResponsavel.setLabelField("nmMembro");
		this.itIdResponsavel.setSize(5);
		this.append(this.itIdResponsavel);


		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setColumn("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		this.itOrcamento.setMin(0);
		this.itOrcamento.setMax(0);
		this.itOrcamento.setStep(5);
		this.itOrcamento.setEnable(false, 2);
		this.itOrcamento.setSize(3);
		this.append(this.itOrcamento);

		this.itPublicoAlvo = new InputText("");
		this.itPublicoAlvo.setColumn("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");
		this.itPublicoAlvo.setSize(6);
		this.itPublicoAlvo.setMaxLength(220);
		this.append(this.itPublicoAlvo);

		this.itVestuario = new InputText("no padrao");
		this.itVestuario.setColumn("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);
		this.itVestuario.setMaxLength(150);
		this.append(this.itVestuario);

		this.itProposito = new InputText("");
		this.itProposito.setColumn("@proposito");
		this.itProposito.setPlaceHolder("digite o proposito da atividade");
		this.itProposito.setLabel("proposito");
		this.itProposito.setSize(12);
		this.itProposito.setMaxLength(300);
		this.append(this.itProposito);

		this.itDetalhes = new TextArea("");
		this.itDetalhes.setColumn("@detalhes");
		this.itDetalhes.setLabel("detalhes");
		this.itDetalhes.setPlaceHolder("digite os detalhes da atividade");
		this.itDetalhes.setSize(12);
		this.itDetalhes.setMaxLength(300);
		this.append(this.itDetalhes);

		this.mainTb.btAdd.addEvent('click', function(evt:Event) {
			this.novaAtividade();
		}.bind(this));

		this.btSubmeter = new Button("Enviar");
		this.btSubmeter.setIcon("check");
		//this.btSubmeter.addEvent('click', this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.addButton(this.btSubmeter);

		this.btPrintAta = new Button("Ata");
		this.btPrintAta.setIcon("print");
		//this.btPrintAta.addEvent('click', this.printAta.bind(this));
		this.mainTb.addButton(this.btPrintAta);


		this.mainList = new ListView("Evento");
		this.append(this.mainList);	
	}
	onStart():void{
		this.itIdResponsavel.fromService({
			url: "usuario/getbysnativo/S"
		});		
		this.itIdStatus.fromService({
			url: "trimestre/getAtividadeStatus"
		});		
		this.itDtDisponivel.getInput().on("change", this.setDtEvento.bind(this));
	}
	novaAtividade():void{

		this.itDsObservacao.setValue("Cadastro de nova atividade...");
		this.itDsObservacao.setType(AlertMsg.TP_WARNING);
		this.itIdEvento.setValue("");
		this.itDescricao.setValue("");
		this.itPublicoAlvo.setValue("");
		this.itVestuario.setValue("");
		this.itProposito.setValue("");
		this.itDetalhes.setValue("");

		this.habilitarCampos(true);
		this.btSubmeter.setEnable(false);
		this.itIdStatus.setValue("1");

		this.itIdPerfil.setValue(perfilBoxContainer.getIdPerfil());
		this.itIdResponsavel.setValue(perfilBoxContainer.idUsuario);
		this.itSnEditavel.setValue("S");
		//this.itOrcamento.setMax(trimestreview.getSaldo());
		this.itOrcamento.setValue(this.itOrcamento.maxvl+"");

		this.itMomento.setValue(this.itDtDisponivel.getValue());
	}
	habilitarCampos(on:boolean):void{
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
	}
	setDtEvento(evt:Event):void{
		this.itMomento.setValue(this.itDtDisponivel.getValue());
	}
	setDatasDisponiveis(p_dtas:Date[]):void{
		var tmpDatasDiponiveis: { 
			dtEventoData:string
			,dsEventoData:string
		}[] = [];
		var tmpDiaSemana: string[] = [
			'Domingo', 'Segunda-Feira','Terça-Feira'
			, 'Quarta-Feia', 'Quinta-Feira', 'Sexta-Feira'
			, 'Sabado'
		];
		p_dtas.forEach(function(tmpData:Date){
			var dtaSimples: string = tmpData + "";
			var tmpDataB: Date = new Date(dtaSimples);
			dtaSimples = dtaSimples.replace(/^(\d{4})\D(\d{1,2})\D(\d{1,2})\D.*/, "$3-$2-$1");
			dtaSimples += " - " + tmpDiaSemana[tmpDataB.getDay()];
			tmpDatasDiponiveis.push({
				dtEventoData:tmpData+""
				, dsEventoData: dtaSimples
			});
		});
		this.itDtDisponivel.setDataProvider(tmpDatasDiponiveis);
	}
	beforeSave(p_obj:IAtividade):IAtividade{
		if (p_obj.local == "") {
			p_obj.local = "capela";
		}
		if (p_obj.vestuario == "") {
			p_obj.vestuario = "no padrao";
		}
		return p_obj;
	}
	beforeInsert(p_req_obj:IDefaultRequest): IDefaultRequest{
		p_req_obj.data.idStatus = 1;
		p_req_obj.url = "trimestre/atividade/" + this.itIdTrimestre.getValue();
		return p_req_obj;
	}

}

