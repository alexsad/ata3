import {ModWindow} from "../../../../lib/underas/container";
import {ItemView,DatePicker,NumericStepper,InputText,Select,ListView} from "../../../../lib/underas/controller";
import {ToolBar,IDefaultRequest,RequestManager} from "../../../../lib/underas/net";
import {Underas} from "../../../../lib/underas/core";
import {IPerfilNotificacao} from "../model/IPerfil";

@ItemView("assets/html/perfilnotificacao.html")
export class ItemMenu extends ModWindow{
	itIdPerfilNotificacao:InputText;
	itIdPerfil: InputText;
	itDescricao:InputText;
	itMascara:InputText;
  itDtInicial:DatePicker;
  itDtFinal:DatePicker;
  itLimiteMax:NumericStepper;
  itLimiteMin:NumericStepper;
  itServicoList:Select;
  itServicoListAcao:InputText;
  itServicoContagem:InputText;
  itTpNotificacao:Select;

	mainTb:ToolBar;
	mainList:ListView;

	constructor(){
		super("*Nofificacoes.");
		this.setRevision("$Revision: 138 $");
		this.setSize(4);

		this.mainTb = new ToolBar({"domain":"perfilnotificacao"});
		this.append(this.mainTb);

		this.itIdPerfilNotificacao = new InputText("");
		this.itIdPerfilNotificacao.setColumn("$id");
		this.itIdPerfilNotificacao.setLabel("cod.");
		this.itIdPerfilNotificacao.setEnable(false);
		this.itIdPerfilNotificacao.setSize(3);
		this.append(this.itIdPerfilNotificacao);

		this.itIdPerfil = new InputText("");
		this.itIdPerfil.setColumn("!idPerfil");
		this.itIdPerfil.setLabel("perfil");
		this.itIdPerfil.setEnable(false);
		this.itIdPerfil.setSize(3);
		this.append(this.itIdPerfil);

		this.itDescricao = new InputText("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("label");
		this.itDescricao.setSize(6);
		this.append(this.itDescricao);

		this.itMascara = new InputText("");
		this.itMascara.setColumn("@mascara");
		this.itMascara.setLabel("mascara");
		this.itMascara.setSize(12);
		this.append(this.itMascara);

		this.itServicoList = new Select("selecione uma tela");
		this.itServicoList.setLabel("tela");
		this.itServicoList.setColumn("@servicoList");
		this.itServicoList.setSize(12);
		this.itServicoList.setValueField("modulo");
		this.itServicoList.setLabelField("descricao");
		this.append(this.itServicoList);

		this.itDtInicial = new DatePicker();
		this.itDtInicial.setLabel("Inicio");
		this.itDtInicial.setColumn("@dtInicial");
		this.itDtInicial.setSize(8);
		this.append(this.itDtInicial);

		this.itDtFinal = new DatePicker();
		this.itDtFinal.setLabel("Inicio");
		this.itDtFinal.setColumn("@dtFinal");
		this.itDtFinal.setSize(8);
		this.append(this.itDtFinal);

		this.itLimiteMax = new NumericStepper(5);
		this.itLimiteMax.setEnable(false,2);
		this.itLimiteMax.setSize(4);
		this.itLimiteMax.setLabel("Limite Max.");
		this.itLimiteMax.setMin(1);
		this.itLimiteMax.setMax(100);
		this.itLimiteMax.setStep(1);
		this.itLimiteMax.setColumn("@limiteMax");
		this.append(this.itLimiteMax);

		this.itLimiteMin = new NumericStepper(5);
		this.itLimiteMin.setEnable(false,2);
		this.itLimiteMin.setSize(4);
		this.itLimiteMin.setLabel("Limite Min.");
		this.itLimiteMin.setMin(1);
		this.itLimiteMin.setMax(100);
		this.itLimiteMin.setStep(1);
		this.itLimiteMin.setColumn("@limiteMin");
		this.append(this.itLimiteMin);


		this.itServicoListAcao = new InputText("");
		this.itServicoListAcao.setColumn("#servicoListAcao");
		this.itServicoListAcao.setLabel("acao do modulo");
		this.itServicoListAcao.setSize(6);
		this.append(this.itServicoListAcao);


		this.itServicoContagem = new InputText("");
		this.itServicoContagem.setColumn("@servicoContagem");
		this.itServicoContagem.setLabel("servico de contagem");
		this.itServicoContagem.setSize(6);
		this.append(this.itServicoContagem);


		this.itTpNotificacao = new Select("tipo de notificacao");
		this.itTpNotificacao.setLabel("tipo de notificacao");
		this.itTpNotificacao.setColumn("@tpNotificacao");
		this.itTpNotificacao.setSize(12);
		this.itTpNotificacao.setValueField("id");
		this.itTpNotificacao.setLabelField("descricao");
		this.append(this.itTpNotificacao);



		this.mainList = new ListView("ItemMenu");
		this.append(this.mainList);
	}
	onStart():void{
		var tmpUrl:string= Underas.getLocation();
		this.itServicoList.fromService({
			rootUrl: tmpUrl
			,url: "assets/modulo.json"
		});
		this.itTpNotificacao.fromService({
			url: "perfilnotificacao/tiposnotificaco"
		});
	}
	getByIdPerfil(p_idPerfil: number): void {
		this.itIdPerfil.setValue(p_idPerfil+"");
		RequestManager.addRequest({
			"url": "perfilnotificacao/getbyidperfil/" + p_idPerfil
			, "onLoad": function(dta: IPerfilNotificacao[]) {
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
	beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this.itIdPerfil.getValue()) {
			return null;
		};
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IPerfilNotificacao): IDefaultRequest{
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
