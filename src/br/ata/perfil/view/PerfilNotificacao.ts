import {DatePickerInput, NumericStepper, TextInput, Select} from "lib/underas/input";
import {IRequestConfig, $http} from "lib/underas/http";
import {SystemApplication} from "lib/underas/core";
import {IPerfilNotificacao, IModulo, IModuloAcao} from "../model/IPerfil";
import {CRUDForm} from "../../form/view/CRUDForm";

export class PerfilNotificacao extends CRUDForm<IPerfilNotificacao>{
	itIdPerfilNotificacao: TextInput;
	itIdPerfil: Select;
	itDescricao: TextInput;
	itMascara: TextInput;
	itDtInicial: DatePickerInput;
	itDtFinal: DatePickerInput;
	itLimiteMax: NumericStepper;
	itLimiteMin: NumericStepper;
	itModulo: Select;
	itModuloAcao: Select;
	itServicoContagem: TextInput;
	itTpNotificacao: Select;
	itIcone: Select;
	itModuloIcone: Select;

	constructor() {
		super({ "domain": "perfilnotificacao" });
		this.setSize(8);

		this.buildToolBar();

		this.itIdPerfilNotificacao = new TextInput("");
		this.itIdPerfilNotificacao.setName("$id");
		this.itIdPerfilNotificacao.setLabel("cod.");
		this.itIdPerfilNotificacao.setEnable(false);
		this.itIdPerfilNotificacao.setSize(2);
		this.append(this.itIdPerfilNotificacao);


		this.itDescricao = new TextInput("");
		this.itDescricao.setName("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(6);
		this.append(this.itDescricao);

		this.itIdPerfil = new Select("pefil");
		this.itIdPerfil.setName("!idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(4);
		this.itIdPerfil.setEnable(true);
		this.append(this.itIdPerfil);

		this.itMascara = new TextInput("");
		this.itMascara.setName("@mascara");
		this.itMascara.setLabel("mascara");
		this.itMascara.setSize(6);
		this.itMascara.setEnable(true);
		this.append(this.itMascara);

		this.itIcone = new Select("icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setName("@icone");
		this.itIcone.setSize(3);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itTpNotificacao = new Select("tipo de notificacao");
		this.itTpNotificacao.setLabel("tipo de notificacao");
		this.itTpNotificacao.setName("@tpNotificacao");
		this.itTpNotificacao.setSize(3);
		this.itTpNotificacao.setValueField("id");
		this.itTpNotificacao.setLabelField("descricao");
		this.append(this.itTpNotificacao);

		this.itServicoContagem = new TextInput("");
		this.itServicoContagem.setName("@servicoContagem");
		this.itServicoContagem.setLabel("servico de contagem");
		this.itServicoContagem.setSize(12);
		this.append(this.itServicoContagem);

		this.itModulo = new Select("selecione uma tela");
		this.itModulo.setLabel("tela");
		this.itModulo.setName("@modulo");
		this.itModulo.setSize(5);
		this.itModulo.setValueField("modulo");
		this.itModulo.setLabelField("descricao");
		this.itModulo.$.on("change", this.getAcoes.bind(this));
		this.append(this.itModulo);

		this.itModuloAcao = new Select("acao do modulo:");
		this.itModuloAcao.setLabel("acao da tela");
		this.itModuloAcao.setName("#moduloAcao");
		this.itModuloAcao.setSize(4);
		this.itModuloAcao.setValueField("comando");
		this.itModuloAcao.setLabelField("descricao");
		this.itModuloAcao.setEnable(false);
		this.append(this.itModuloAcao);

		this.itModuloIcone = new Select("icone");
		this.itModuloIcone.setLabel("icone da tela");
		this.itModuloIcone.setName("@moduloIcone");
		this.itModuloIcone.setSize(3);
		this.itModuloIcone.setValueField("icon");
		this.itModuloIcone.setLabelField("desc");
		this.append(this.itModuloIcone);

		this.itLimiteMin = new NumericStepper(5);
		//this.itLimiteMin.setEnable(false, 2);
		this.itLimiteMin.setSize(3);
		this.itLimiteMin.setLabel("Limite Min.");
		this.itLimiteMin.setMin(0);
		this.itLimiteMin.setMax(100);
		this.itLimiteMin.setStep(1);
		this.itLimiteMin.setName("@limiteMin");
		this.append(this.itLimiteMin);

		this.itLimiteMax = new NumericStepper(5);
		//this.itLimiteMax.setEnable(false,2);
		this.itLimiteMax.setSize(3);
		this.itLimiteMax.setLabel("Limite Max.");
		this.itLimiteMax.setMin(1);
		this.itLimiteMax.setMax(100);
		this.itLimiteMax.setStep(1);
		this.itLimiteMax.setName("@limiteMax");
		this.append(this.itLimiteMax);

		this.itDtInicial = new DatePickerInput();
		this.itDtInicial.setLabel("Inicio");
		this.itDtInicial.setName("@dtInicial");
		this.itDtInicial.setEnable(false);
		this.itDtInicial.setSize(3);
		this.append(this.itDtInicial);

		this.itDtFinal = new DatePickerInput();
		this.itDtFinal.setLabel("Inicio");
		this.itDtFinal.setName("@dtFinal");
		this.itDtFinal.setEnable(false);
		this.itDtFinal.setSize(3);
		this.append(this.itDtFinal);

		this.buildTileList({ itemViewResource: "perfil/view/assets/html/perfilnotificacao" });
	}
	onStart(): void {
		var tmpUrl: string = SystemApplication.getLocation();
		this.itModulo.fromService({
			rootUrl: tmpUrl
			, url: "assets/modulo.json?rev=" + SystemApplication.getProjectVersion()
		});
		this.itTpNotificacao.fromService({
			url: "perfilnotificacao/tiposnotificaco"
		});
		this.itIdPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
		this.itIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev=" + SystemApplication.getProjectVersion()
		});
		this.itModuloIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev=" + SystemApplication.getProjectVersion()
		});

		this.addEvent(PerfilNotificacao.EVENT_BEFORE_INSERT,(evt:Event)=>this.checkPerfilNotificacao(evt))
		this.addEvent(PerfilNotificacao.EVENT_BEFORE_UPDATE, (evt: Event) => this.checkPerfilNotificacao(evt))
		this.addEvent(PerfilNotificacao.EVENT_BEFORE_DELETE, (evt: Event) => this.checkPerfilNotificacao(evt))
	}
	private onReceiveAcoes(dta: IModulo[]): void {
		var tmpIdModule: string = this.itModulo.getValue();
		dta.every(function(itmod: IModulo, index: number): boolean {
			if (itmod.modulo == tmpIdModule) {
				if (itmod.acao.length > 0) {
					(<PerfilNotificacao>this).itModuloAcao.setEnable(true);
					(<PerfilNotificacao>this).itModuloAcao.setDataProvider(itmod.acao);
				};
				return false;
			};
			return true;
		}.bind(this));
	}
	private getAcoes(evt: Event): void {
		this.itModuloAcao.setEnable(false);
		this.itModuloAcao.setDataProvider([]);
		this.itModuloAcao.setValue("");
		$http
			.get("assets/modulo.json?rev=" + SystemApplication.getProjectVersion(), {
				rootUrl: SystemApplication.getLocation()				
			})
			.done((dta: IModulo[]) => this.onReceiveAcoes(dta));
	}
	getByIdPerfil(p_idPerfil: number): void {
		this.itIdPerfil.setValue(p_idPerfil + "");
		$http
			.get("perfilnotificacao/getbyidperfil/" + p_idPerfil)
			.done((dta: IPerfilNotificacao[]) => this.mainList.setDataProvider(dta));
	}
	private checkPerfilNotificacao(evt:Event):void{
		if (!this.itIdPerfil.getValue()) {
			evt.preventDefault();
		};
	}
}