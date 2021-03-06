import {ModWindow, WebContainer} from "lib/underas/container";
import {TimeInput, Button, TextArea, NumericStepper, DatePicker, Select, AlertMsg, CheckBox, TextInput, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "lib/underas/net";
import {IAtividade,EAtividadeStatus} from "../model/ITrimestre";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import PerfilBox = require("../../perfil/view/PerfilBox");
import {TrimestreView} from "./TrimestreView";

@WebContainer({
	itemViewResource: "trimestre/view/assets/html/evento"
})
export class Atividade extends ModWindow {
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
	itDsObservacao:AlertMsg;
	itVestuario: TextInput;
	mainTb: ToolBar;
	mainList: ListView<IAtividade>;
	btSubmeter: Button;
	_modTrimestreView: TrimestreView;
	constructor(p_trimestre_view:TrimestreView) {
		super("Atividades");		
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "atividade" });
		this.mainTb.btDel.$.hide();
		this.append(this.mainTb);

		this.itDsObservacao = new AlertMsg("Cadastro de Nova Atividade...");
		this.itDsObservacao.setColumn("#dsObservacao");
		this.itDsObservacao.setSize(12);
		this.itDsObservacao.setType(AlertMsg.TP_WARNING);
		this.append(this.itDsObservacao);


		this.itIdEvento = new TextInput("");
		this.itIdEvento.setColumn("$id");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);
		this.itIdEvento.setSize(2);
		this.append(this.itIdEvento);

		this.itIdTrimestre = new TextInput("");
		this.itIdTrimestre.setColumn("!idTrimestre");
		this.itIdTrimestre.setLabel("tri.");
		this.itIdTrimestre.setEnable(false);
		this.itIdTrimestre.setSize(2);
		this.append(this.itIdTrimestre);

		this.itCodRefMLS = new TextInput("");
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

		this.itDescricao = new TextInput("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(12);
		this.append(this.itDescricao);

		this.itDtDisponivel = new Select("datas disponiveis");
		this.itDtDisponivel.setLabel("Dts. Livres");
		this.itDtDisponivel.setValueField("id");
		this.itDtDisponivel.setLabelField("dsData");
		this.itDtDisponivel.setEnable(true);
		this.itDtDisponivel.setSize(5);
		this.append(this.itDtDisponivel);


		this.itIdData = new Select("data");
		this.itIdData.setColumn("@idData");
		this.itIdData.setPlaceHolder("ex. 31-12-2015");
		this.itIdData.setValueField("id");
		this.itIdData.setLabelField("dsData");
		this.itIdData.setLabel("data");
		this.itIdData.setEnable(false);
		this.itIdData.setSize(4);
		this.append(this.itIdData);


		this.itHora = new TimeInput("19:00");
		this.itHora.setColumn("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);
		this.append(this.itHora);

		this.itLocal = new TextInput("capela");
		this.itLocal.setColumn("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(12);
		this.append(this.itLocal);

		this.itIdPerfil = new Select("pefil");
		this.itIdPerfil.setColumn("@idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(3);
		this.itIdPerfil.setEnable(false);
		this.append(this.itIdPerfil);

		this.itIdOrganizacao = new Select("organizacao");
		this.itIdOrganizacao.setColumn("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao:");
		this.itIdOrganizacao.setValueField("id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(3);
		this.itIdOrganizacao.setEnable(false);
		this.append(this.itIdOrganizacao);		

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setColumn("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("nome");
		this.itIdResponsavel.setSize(3);
		this.append(this.itIdResponsavel);

		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setColumn("@orcamento");
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
		this.itPublicoAlvo.setColumn("@publicoAlvo");
		this.itPublicoAlvo.setLabel("publico alvo");
		this.itPublicoAlvo.setPlaceHolder("digite o publico da atividade ex. toda a ala");
		this.itPublicoAlvo.setSize(6);
		this.itPublicoAlvo.setMaxLength(220);
		this.append(this.itPublicoAlvo);

		this.itVestuario = new TextInput("no padrao");
		this.itVestuario.setColumn("@vestuario");
		this.itVestuario.setLabel("vestuario");
		this.itVestuario.setPlaceHolder("digite o vestuario da atividade ex. no esporte fino");
		this.itVestuario.setSize(6);
		this.itVestuario.setMaxLength(150);
		this.append(this.itVestuario);

		this.itProposito = new TextInput("");
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
		this.btSubmeter.$.removeClass("btn-default").addClass("btn-info");
		this.btSubmeter.setIcon("send");
		this.btSubmeter.addEvent('click', this.submeter.bind(this));
		this.btSubmeter.setEnable(false);
		this.mainTb.addButton(this.btSubmeter,true);

		this.mainList = new ListView<IAtividade>("Evento");
		this.append(this.mainList);

		this._modTrimestreView = p_trimestre_view;
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
	}
	getByIdTrimestreIdPerfil(p_idTrimestre:number,p_idPerfil:number):void{
        this.clearFormItem();
        this.novaAtividade();
		this.itIdTrimestre.setValue(p_idTrimestre + "");
		RequestManager.addRequest({
			url: "atividade/getbyidtrimestreidperfil/"+p_idTrimestre+"/"+p_idPerfil
			, onLoad: function(dta: IAtividade[]) {
				(<Atividade>this).mainList.setDataProvider(dta);
			}.bind(this)
		});
		this.itIdData.fromService({
			"url": "trimestredatalivre/getbyidtrimestre/" + p_idTrimestre
		});
		RequestManager.addRequest({
			url: "trimestredatalivre/getdisponiveisbyidtrimestre/" + p_idTrimestre
			, onLoad: function(tmpDatasDiponiveis: Atividade[]) {
				(<Atividade>this).itDtDisponivel.setDataProvider(tmpDatasDiponiveis);
				if(tmpDatasDiponiveis.length > 0){
					(<Atividade>this).itDtDisponivel.setEnable(true);
				}else{
					(<Atividade>this).itDtDisponivel.setEnable(false);
				}
			}.bind(this)
		});
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

		this.itIdPerfil.setValue(PerfilBox.getIdPerfil()+"");
		this.itIdResponsavel.setValue(PerfilBox.idUsuario + "");
		this.itSnEditavel.setValue("S");
		this.itOrcamento.setValue(this._modTrimestreView.getSaldo()+"");
		this.itOrcamento.setMax(this._modTrimestreView.getSaldo());
		//console.log(this.itOrcamento.maxvl);
		this.itIdData.setValue(this.itDtDisponivel.getValue());
		this.btSubmeter.setEnable(false);
	}
	onChangeItem(p_item:IAtividade):IAtividade{
		var on = (p_item.snEditavel=="S");
		this.habilitarCampos(on);
		if(on){
			var tmpVlAtiv: number = p_item.orcamento;
			//console.log(tmpVlAtiv+":"+this._modTrimestreView.getSaldo());
			this.itOrcamento.setMax(this._modTrimestreView.getSaldo() + tmpVlAtiv);
			this.btSubmeter.setEnable(true);
		}else{
			this.btSubmeter.setEnable(false);
		}
		return p_item;
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
		this.btSubmeter.setEnable(on);
		this.itOrcamento.setEnable(on, 1);
		this.itOrcamento.setEnable(on, 3);
		this.itIdOrganizacao.setEnable(on);
		this.mainTb.btSave.setEnable(on);
	}
	setDtEvento(evt:Event):void{
		this.itIdData.setValue(this.itDtDisponivel.getValue());
	}
	beforeSave(p_obj:IAtividade):IAtividade{
		if (p_obj.local == "") {
			p_obj.local = "capela";
		};
		if (p_obj.vestuario == "") {
			p_obj.vestuario = "no padrao";
		};
		this.itOrcamento.setMax(p_obj.orcamento);
		return p_obj;
	}
	getIcone(p_idStatus:number):string{
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
	beforeInsert(p_req_obj:IDefaultRequest): IDefaultRequest{
		p_req_obj.data.idStatus = EAtividadeStatus.ELABORADA;
		p_req_obj.data.iconStatus = "info";
		return p_req_obj;
	}
	beforeUpdate(p_req_obj: IDefaultRequest, p_old_obj:IAtividade): IDefaultRequest {
		if(p_old_obj.snEditavel=="N"){
			return null;
		};
		p_old_obj.iconStatus = this.getIcone(p_old_obj.idStatus);
		return p_req_obj;
	}

	beforeDelete(p_req: IDefaultRequest, p_old_obj: IAtividade): IDefaultRequest {
		return null;
	}

	submeter():void{
		var tmpItemAtiv: IAtividade = this.mainList.getSelectedItem();
		if(tmpItemAtiv.snEditavel=="S"){
			tmpItemAtiv.snEditavel = "N";			
			tmpItemAtiv.idStatus = EAtividadeStatus.ENVIADA;			
			RequestManager.addRequest({
				url: "atividade"
				,method:"PUT"
				,data:tmpItemAtiv
				,onLoad:function(rt_save:boolean):void{
					var tmpStatus:string = EAtividadeStatus[tmpItemAtiv.idStatus].toLowerCase();
					if(rt_save){
						if (tmpItemAtiv.idStatus == EAtividadeStatus.ENVIADA) {
							tmpStatus = "aprovada";
						};
						tmpItemAtiv.dsObservacao = "Atividade enviada com sucesso, em breve sua atividade sera analisada e se tudo estiver correto ela sera " + tmpStatus + "!";
						(<Atividade>this).itDsObservacao.setText(tmpItemAtiv.dsObservacao);
						(<Atividade>this).itDsObservacao.setType(AlertMsg.TP_INFO);
					}else{
						tmpItemAtiv.dsObservacao = "A atividade nao pode ser " + tmpStatus + ", entre em contato com o bispado em caso de duvidas!";
						(<Atividade>this).itDsObservacao.setText(tmpItemAtiv.dsObservacao);
						(<Atividade>this).itDsObservacao.setType(AlertMsg.TP_ERROR);
					}
				}.bind(this)
			});
		};
	}

}
