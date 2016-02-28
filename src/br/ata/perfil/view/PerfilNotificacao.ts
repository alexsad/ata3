import {ModWindow, WebContainer} from "lib/underas/container";
import {DatePicker, NumericStepper, TextInput, Select} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar, IDefaultRequest, RequestManager} from "lib/underas/net";
import {System} from "lib/underas/core";
import {IPerfilNotificacao, IModulo, IModuloAcao} from "../model/IPerfil";

@WebContainer({
	itemViewResource: "perfil/view/assets/html/perfilnotificacao"
})
export class PerfilNotificacao extends ModWindow {
	itIdPerfilNotificacao: TextInput;
	itIdPerfil: Select;
	itDescricao: TextInput;
	itMascara: TextInput;
	itDtInicial: DatePicker;
	itDtFinal: DatePicker;
	itLimiteMax: NumericStepper;
	itLimiteMin: NumericStepper;
	itModulo: Select;
	itModuloAcao: Select;
	itServicoContagem: TextInput;
	itTpNotificacao: Select;
	itIcone: Select;
	itModuloIcone: Select;
	mainTb: ToolBar;
	mainList: ListView<IPerfilNotificacao>;

	constructor() {
		super("Nofificacoes do Perfil");
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "perfilnotificacao" });
		this.append(this.mainTb);

		this.itIdPerfilNotificacao = new TextInput("");
		this.itIdPerfilNotificacao.setColumn("$id");
		this.itIdPerfilNotificacao.setLabel("cod.");
		this.itIdPerfilNotificacao.setEnable(false);
		this.itIdPerfilNotificacao.setSize(2);
		this.append(this.itIdPerfilNotificacao);


		this.itDescricao = new TextInput("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(6);
		this.append(this.itDescricao);

		this.itIdPerfil = new Select("pefil");
		this.itIdPerfil.setColumn("!idPerfil");
		this.itIdPerfil.setLabel("perfil:");
		this.itIdPerfil.setValueField("id");
		this.itIdPerfil.setLabelField("descricao");
		this.itIdPerfil.setSize(4);
		this.itIdPerfil.setEnable(true);
		this.append(this.itIdPerfil);

		this.itMascara = new TextInput("");
		this.itMascara.setColumn("@mascara");
		this.itMascara.setLabel("mascara");
		this.itMascara.setSize(6);
		this.itMascara.setEnable(true);
		this.append(this.itMascara);

		this.itIcone = new Select("icone");
		this.itIcone.setLabel("icone");
		this.itIcone.setColumn("@icone");
		this.itIcone.setSize(3);
		this.itIcone.setValueField("icon");
		this.itIcone.setLabelField("desc");
		this.append(this.itIcone);

		this.itTpNotificacao = new Select("tipo de notificacao");
		this.itTpNotificacao.setLabel("tipo de notificacao");
		this.itTpNotificacao.setColumn("@tpNotificacao");
		this.itTpNotificacao.setSize(3);
		this.itTpNotificacao.setValueField("id");
		this.itTpNotificacao.setLabelField("descricao");
		this.append(this.itTpNotificacao);

		this.itServicoContagem = new TextInput("");
		this.itServicoContagem.setColumn("@servicoContagem");
		this.itServicoContagem.setLabel("servico de contagem");
		this.itServicoContagem.setSize(12);
		this.append(this.itServicoContagem);

		this.itModulo = new Select("selecione uma tela");
		this.itModulo.setLabel("tela");
		this.itModulo.setColumn("@modulo");
		this.itModulo.setSize(5);
		this.itModulo.setValueField("modulo");
		this.itModulo.setLabelField("descricao");
		this.itModulo.$.on("change", this.getAcoes.bind(this));
		this.append(this.itModulo);

		this.itModuloAcao = new Select("acao do modulo:");
		this.itModuloAcao.setLabel("acao da tela");
		this.itModuloAcao.setColumn("#moduloAcao");
		this.itModuloAcao.setSize(4);
		this.itModuloAcao.setValueField("comando");
		this.itModuloAcao.setLabelField("descricao");
		this.itModuloAcao.setEnable(false);
		this.append(this.itModuloAcao);

		this.itModuloIcone = new Select("icone");
		this.itModuloIcone.setLabel("icone da tela");
		this.itModuloIcone.setColumn("@moduloIcone");
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
		this.itLimiteMin.setColumn("@limiteMin");
		this.append(this.itLimiteMin);

		this.itLimiteMax = new NumericStepper(5);
		//this.itLimiteMax.setEnable(false,2);
		this.itLimiteMax.setSize(3);
		this.itLimiteMax.setLabel("Limite Max.");
		this.itLimiteMax.setMin(1);
		this.itLimiteMax.setMax(100);
		this.itLimiteMax.setStep(1);
		this.itLimiteMax.setColumn("@limiteMax");
		this.append(this.itLimiteMax);

		this.itDtInicial = new DatePicker();
		this.itDtInicial.setLabel("Inicio");
		this.itDtInicial.setColumn("@dtInicial");
		this.itDtInicial.setEnable(false);
		this.itDtInicial.setSize(3);
		this.append(this.itDtInicial);

		this.itDtFinal = new DatePicker();
		this.itDtFinal.setLabel("Inicio");
		this.itDtFinal.setColumn("@dtFinal");
		this.itDtFinal.setEnable(false);
		this.itDtFinal.setSize(3);
		this.append(this.itDtFinal);

		this.mainList = new ListView<IPerfilNotificacao>("ItemMenu");
		this.append(this.mainList);
	}
	onStart(): void {
		var tmpUrl: string = System.getLocation();
		this.itModulo.fromService({
			rootUrl: tmpUrl
			, url: "assets/modulo.json?rev=" + this.getRevision()
		});
		this.itTpNotificacao.fromService({
			url: "perfilnotificacao/tiposnotificaco"
		});
		this.itIdPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
		this.itIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev=" + this.getRevision()
		});
		this.itModuloIcone.fromService({
			rootUrl: tmpUrl
			, url: "assets/icons.json?rev=" + this.getRevision()
		});

	}
	getAcoes(evt: Event): void {
		//evt.preventDefault();
		var _ele: JQuery = $(evt.target);

		var tmpIdModule: string = this.itModulo.getValue();
		this.itModuloAcao.setEnable(false);
		this.itModuloAcao.setDataProvider([]);
		this.itModuloAcao.setValue("");

		RequestManager.addRequest({
			rootUrl: System.getLocation()
			, url: "assets/modulo.json?rev=" + this.getRevision()
			, onLoad: function(dta: IModulo[]) {
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

			}.bind(this)
		});
	}
	getByIdPerfil(p_idPerfil: number): void {
		this.itIdPerfil.setValue(p_idPerfil + "");
		RequestManager.addRequest({
			"url": "perfilnotificacao/getbyidperfil/" + p_idPerfil
			, "onLoad": function(dta: IPerfilNotificacao[]) {
				(<PerfilNotificacao>this).mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest {
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IPerfilNotificacao): IDefaultRequest {
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_new_obj;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IPerfilNotificacao): IDefaultRequest {
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_delete;
	}
}