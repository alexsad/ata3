import {EBasicColorStatus,EViewSize} from "lib/underas/component";
import {Form,ToolBar,Box} from "lib/underas/container";
import {Button} from "lib/underas/button";
import {TimeInput, TextArea, NumericStepper, Select, CheckBox, TextInput} from "lib/underas/input";
import {$http, IRequestConfig} from "lib/underas/http";
import {IAtividade,EAtividadeStatus} from "../model/ITrimestre";

export class Atividade extends Form{
	itIdAtividade: TextInput;
	itIdTrimestre: TextInput;
	itCodRefMLS: TextInput;
	itIdOrganizacao: Select;
	itIdResponsavel: Select;
	itIdPerfil: TextInput;

	itDescricao: TextInput;
	itDetalhes: TextArea;
	itLocal: TextInput;
	itIdData: Select;
	itHora: TimeInput;
	itOrcamento: NumericStepper;
	itPublicoAlvo: TextInput;
	itProposito: TextInput;
	itDtDisponivel: Select;
	itVestuario: TextInput;
	btSubmeter: Button;
	btCancel: Button;
	trimestreSaldo: number;
	static EVENT_CADASTRO_CANCEL: string = "cadastro:cancel";
	static EVENT_CADASTRO_SUBMIT: string = "cadastro:submit";

	constructor() {
		super();		
		this.setSize(12);
		this.addStyleName("AtividadeForm");

		this.itIdAtividade = new TextInput();
		this.itIdAtividade.setLabel("cod.");
		this.itIdAtividade.setName("$id");
		this.itIdAtividade.setSize(3);
		this.itIdAtividade.show(false);
		this.append(this.itIdAtividade);


		this.itIdTrimestre = new TextInput();
		this.itIdTrimestre.setName("@idTrimestre");
		this.itIdTrimestre.setLabel("tri.");
		this.itIdTrimestre.setSize(3);
		this.itIdTrimestre.show(false);
		this.append(this.itIdTrimestre);

		this.itCodRefMLS = new TextInput("");
		this.itCodRefMLS.setName("#codRefMLS");
		this.itCodRefMLS.setLabel("ref. MLS");
		this.itCodRefMLS.setPlaceHolder("cod. ref. MLS");
		this.itCodRefMLS.setSize(3);
		this.itCodRefMLS.show(false);
		this.append(this.itCodRefMLS);

		this.itIdPerfil = new TextInput("pefil");
		this.itIdPerfil.setName("@idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setSize(3);
		this.itIdPerfil.show(false);
		this.append(this.itIdPerfil);

		this.itDescricao = new TextInput("");
		this.itDescricao.setName("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setPlaceHolder("digite a descricao da atividade");
		this.itDescricao.setSize(8);
		this.itDescricao.setSize(7,EViewSize.EXTRA_SMALL);
		this.append(this.itDescricao);

		this.itOrcamento = new NumericStepper(0);
		this.itOrcamento.setName("@orcamento");
		this.itOrcamento.setLabel("orcamento");
		this.itOrcamento.setMin(0);
		this.itOrcamento.setMax(0);
		this.itOrcamento.setStep(5);
		this.itOrcamento.setEnable(false, 2);
		this.itOrcamento.setEnable(false, 1);
		this.itOrcamento.setEnable(false, 3);
		this.itOrcamento.setSize(4);
		this.itOrcamento.setSize(5,EViewSize.EXTRA_SMALL)
		this.append(this.itOrcamento);

		this.itDtDisponivel = new Select("datas disponiveis");
		this.itDtDisponivel.setLabel("Dts. Livres");
		this.itDtDisponivel.setValueField("id");
		this.itDtDisponivel.setLabelField("dsData");
		this.itDtDisponivel.setEnable(false,1);
		this.itDtDisponivel.setSize(5);
		this.itDtDisponivel.setSize(6, EViewSize.EXTRA_SMALL);
		this.append(this.itDtDisponivel);
		this.itDtDisponivel.getInput().on("change", this.setDtEvento.bind(this));

		this.itIdData = new Select("data");
		this.itIdData.setName("@idData");
		this.itIdData.setPlaceHolder("ex. 31-12-2015");
		this.itIdData.setValueField("id");
		this.itIdData.setLabelField("dsData");
		this.itIdData.setLabel("data");
		this.itIdData.setEnable(false);
		this.itIdData.setSize(4);
		this.itIdData.setSize(6, EViewSize.EXTRA_SMALL);
		this.append(this.itIdData);		

		this.itHora = new TimeInput("19:00");
		this.itHora.setName("@hora");
		this.itHora.setPlaceHolder("hora da atividade ex. 19:00");
		this.itHora.setLabel("hora");
		this.itHora.setSize(3);
		this.itHora.setSize(6,EViewSize.EXTRA_SMALL);
		this.append(this.itHora);

		this.itLocal = new TextInput("capela");
		this.itLocal.setName("@local");
		this.itLocal.setLabel("local");
		this.itLocal.setPlaceHolder("local da atividade");
		this.itLocal.setSize(12);
		this.itLocal.setSize(6, EViewSize.EXTRA_SMALL);
		this.append(this.itLocal);

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

		this.itIdOrganizacao = new Select("organizacao");
		this.itIdOrganizacao.setName("@idOrganizacao");
		this.itIdOrganizacao.setLabel("organizacao:");
		this.itIdOrganizacao.setValueField("id");
		this.itIdOrganizacao.setLabelField("descricao");
		this.itIdOrganizacao.setSize(5);
		this.append(this.itIdOrganizacao);	

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setName("@idResponsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("nome");
		this.itIdResponsavel.setSize(7);
		this.append(this.itIdResponsavel);

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

		let toolbar = new Box();
		toolbar.setSize(12);
		toolbar.addStyleName("box-actions");


		this.btSubmeter = new Button("");
		this.btSubmeter.setColor(EBasicColorStatus.PRIMARY);
		this.btSubmeter.addStyleName("pull-right btn-lg btn-round");
		this.btSubmeter.setIcon("glyphicon glyphicon-floppy-disk");
		this.btSubmeter.addEvent('click', this.submeter.bind(this));
		toolbar.append(this.btSubmeter);

		this.btCancel = new Button("");
		this.btCancel.setColor(EBasicColorStatus.DANGER);
		this.btCancel.addStyleName("pull-right btn-lg btn-round");
		this.btCancel.setIcon("glyphicon glyphicon-floppy-remove");
		this.btCancel.addEvent('click',()=>this.fireEvent(Atividade.EVENT_CADASTRO_CANCEL));
		toolbar.append(this.btCancel);

		this.append(toolbar);
	}
	init(): void {
		this.itIdResponsavel.fromService({
			url: "membro/getbysnativo/S"
		});
		this.itIdOrganizacao.fromService({
			"url": "organizacao"
		});
	}
	private onReceiveDatasDisponiveis(tmpDatasDiponiveis: Atividade[]): void {
		this.itDtDisponivel.setDataProvider(tmpDatasDiponiveis);
		if (tmpDatasDiponiveis.length > 0) {
			this.itDtDisponivel.setEnable(true);
		} else {
			this.itDtDisponivel.setEnable(false);
		}
	}
	setAtividade(p_atividade:IAtividade):void{
		this.setFormItem(p_atividade);
	}
	setIdTrimestreIdPerfilSaldo(p_idTrimestre:number,p_idPerfil:number,p_saldo:number):void{
        this.clearFormItem();		
		this.itIdData.fromService({
			"url": "trimestredatalivre/getbyidtrimestre/" + p_idTrimestre
		});
		$http
			.get("trimestredatalivre/getdisponiveisbyidtrimestre/" + p_idTrimestre)
			.done((dta: Atividade[]) => this.onReceiveDatasDisponiveis(dta));
		this.itOrcamento.setMax(p_saldo);
		if(p_saldo > 0){
			this.itOrcamento.setEnable(true, 1);
			this.itOrcamento.setEnable(true, 3);
		};
		this.itOrcamento.setValue(p_saldo+"");
		this.itIdPerfil.setValue(p_idPerfil+"");
		this.itIdTrimestre.setValue(p_idTrimestre+"");


	}
	private setDtEvento(evt:Event):void{
		this.itIdData.setValue(this.itDtDisponivel.getValue());
	}
	private submeter(): void {		
		if(this.validAllItens()){
			let tmpItemAtiv: IAtividade = this.getFormItem<IAtividade>();
			tmpItemAtiv.datalivre = {
				id: tmpItemAtiv.idData
				, snDisponivel: "N"
				, idTrimestre:0
				, momento: this.itDtDisponivel.getDesc()
				,dsData:this.itDtDisponivel.getDescFromServiceByValue(this.itIdData.getValue())
			}
			this.fireEvent(Atividade.EVENT_CADASTRO_SUBMIT,tmpItemAtiv);
		}
	}
}
