import {Form} from "lib/underas/container";
import {TimeInput,TextArea, NumericStepper, Select, CheckBox, TextInput} from "lib/underas/input";
import {CRUDToolBar} from "../../toolbar/view/CRUDToolBar";
import {TileList} from "lib/underas/widget_mod/TileList";
import {IAtividade,EAtividadeStatus} from "../model/ITrimestre";
import {TrimestreLancamentoAtividade} from "./TrimestreLancamentoAtividade";
import PerfilBox = require("../../perfil/view/PerfilBox");
import {TrimestreView} from "./TrimestreView";

export class AtividadeEdicao extends Form {
	itIdEvento: TextInput;
	itIdTrimestre: Select;
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
	itVestuario: TextInput;
	mainTb:CRUDToolBar;
	mainList: TileList<IAtividade>;
	constructor() {
		super();		
		this.setSize(12);

		this.mainList = new TileList<IAtividade>("Evento");

		this.mainTb = new CRUDToolBar({
			"domain": "atividade" 
			,"form":this
			,"list":this.mainList
		});
		this.append(this.mainTb);

		this.itIdEvento = new TextInput("");
		this.itIdEvento.setName("$id");
		this.itIdEvento.setLabel("cod.");
		this.itIdEvento.setEnable(false);
		this.itIdEvento.setSize(1);
		this.append(this.itIdEvento);

		this.itIdTrimestre = new Select();
		this.itIdTrimestre.setName("@idTrimestre");
		this.itIdTrimestre.setLabel("tri.");
		this.itIdTrimestre.setValueField("id");
		this.itIdTrimestre.setLabelField("dsTrimestre");
		this.itIdTrimestre.setSize(2);
		this.append(this.itIdTrimestre);

		this.itCodRefMLS = new TextInput("");
		this.itCodRefMLS.setName("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("cod. ref. MLS");
		this.itCodRefMLS.setSize(1);		
		this.append(this.itCodRefMLS);

		this.itIdData = new Select("data");
		this.itIdData.setName("@idData");
		this.itIdData.setPlaceHolder("ex. 31-12-2015");
		this.itIdData.setValueField("id");
		this.itIdData.setLabelField("dsData");
		this.itIdData.setLabel("data");
		this.itIdData.setSize(3);
		this.append(this.itIdData);

		this.itHora = new TimeInput("19:00");
		this.itHora.setName("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(1);
		this.append(this.itHora);


		this.itIdStatus = new Select("Status");
		this.itIdStatus.setName("@idStatus");
		this.itIdStatus.setLabel("Status");
		this.itIdStatus.setValueField("idStatus");
		this.itIdStatus.setLabelField("descricao");
		this.itIdStatus.setSize(2);
		this.append(this.itIdStatus);

		this.itSnEditavel = new CheckBox("Editavel?", "Sim");
		this.itSnEditavel.setName("@snEditavel");
		this.itSnEditavel.setCheckedValue("S");
		this.itSnEditavel.setUnCheckedValue("N");
		this.itSnEditavel.setLabel("Editavel");
		this.itSnEditavel.setSize(2);		
		this.append(this.itSnEditavel);

		this.itDescricao = new TextInput("");
		this.itDescricao.setName("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(12);
		this.append(this.itDescricao);

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
		this.append(this.itIdPerfil);

		this.itIdOrganizacao = new Select("organizacao");
		this.itIdOrganizacao.setName("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao:");
		this.itIdOrganizacao.setValueField("id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(3);		
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

		this.mainList.setItemViewResource("trimestre/view/assets/html/evento");
		this.append(this.mainList);
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
		this.itIdData.fromService({
			"url":"trimestredatalivre"
		});
		this.itIdTrimestre.fromService({ "url": "trimestre" });
		this.mainTb.reloadItens();
	}
	afterInsert(p_obj: IAtividade): IAtividade {		
		p_obj.datalivre = {
			id:p_obj.idData
			,snDisponivel:"N"
			,idTrimestre:p_obj.idTrimestre
			,momento:""
		}
		return p_obj;
	}
}
