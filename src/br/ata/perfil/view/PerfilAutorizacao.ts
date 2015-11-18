import {PerfilView} from "./PerfilView";
import {ModWindow} from "../../../../lib/underas/container";
import {InputText, CheckBox, Button, AlertMsg, Select, ListView, ItemView} from "../../../../lib/underas/controller";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {IPerfil, IPerfilAutorizacao, EPerfilAutorizacaoTP} from "../model/IPerfil";


@ItemView("assets/html/perfilautorizacao.html")
export class PerfilAutorizacao extends ModWindow {
	itPerfil: Select;
	itIdPerfilAutorizacao: InputText;
	itTpAutorizacao: CheckBox;
	itPerfilAlvo: Select;
	aviso: AlertMsg;
	mainTb: ToolBar;
	mainList: ListView;
	constructor() {
		super("*Perfis Associados");
		this.setRevision("$Revision: 1 $");
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "perfilautorizacao" });
		this.append(this.mainTb);

		this.aviso = new AlertMsg("Cadastro");
		this.aviso.setType(AlertMsg.TP_ERROR);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itIdPerfilAutorizacao = new InputText("cod.");
		this.itIdPerfilAutorizacao.setLabel("cod.");
		this.itIdPerfilAutorizacao.setSize(3);
		this.itIdPerfilAutorizacao.setColumn("$id");
		this.itIdPerfilAutorizacao.setEnable(false);
		this.append(this.itIdPerfilAutorizacao);

		this.itPerfil = new Select("pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setColumn("!idPerfil");
		this.itPerfil.setValueField("id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setEnable(false);
		this.itPerfil.setSize(9);
		this.append(this.itPerfil);

		this.itPerfilAlvo = new Select("pefil");
		this.itPerfilAlvo.setLabel("Perfil Alvo:");
		this.itPerfilAlvo.setColumn("@idPerfilAlvo");
		this.itPerfilAlvo.setValueField("id");
		this.itPerfilAlvo.setLabelField("descricao");
		this.itPerfilAlvo.setSize(12);
		this.append(this.itPerfilAlvo);



		this.itTpAutorizacao = new CheckBox("Autorizacao", "permite liberacao?");
		this.itTpAutorizacao.setLabel("Autorizacao:");
		this.itTpAutorizacao.setColumn("@tpAutorizacao");
		this.itTpAutorizacao.setCheckedValue(EPerfilAutorizacaoTP.LIBERACAO+"");
		this.itTpAutorizacao.setUnCheckedValue(EPerfilAutorizacaoTP.APROVACAO+"");
		this.itTpAutorizacao.setSize(12);
		this.append(this.itTpAutorizacao);

		this.mainList = new ListView("perfis");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart(): void {
		this.itPerfil.fromService({
			"url": "perfil/getbysnativo/S"
		});
		this.itPerfilAlvo.fromService({
			"url": "perfil/getbysnativo/S"
		});
	}
	getByIdPerfil(p_idPerfil:number):void{
		this.itPerfil.setValue(p_idPerfil + "");
		RequestManager.addRequest({
			"url":"perfilautorizacao/getbyidperfil/"+p_idPerfil
			,"onLoad":function(dta:IPerfilAutorizacao[]){
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}	
}
