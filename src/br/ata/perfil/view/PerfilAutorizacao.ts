import {EBasicColorStatus} from "lib/underas/component";
import {TextInput, CheckBox, Select} from "lib/underas/input";
import {Button} from "lib/underas/button";
import {Alert} from "lib/underas/widget";
import {CRUDForm} from "../../form/view/CRUDForm";
import {$http, IRequestConfig} from "lib/underas/http";
import {IPerfil} from "../model/IPerfil";
import {IPerfilAutorizacao, EPerfilAutorizacaoTP} from "../model/IPerfilAutorizacao";
import {PerfilView} from "./PerfilView";

export class PerfilAutorizacao extends CRUDForm<IPerfilAutorizacao>{
	itPerfil: Select;
	itIdPerfilAutorizacao: TextInput;
	itTpAutorizacao: CheckBox;
	itPerfilAlvo: Select;
	aviso: Alert;
	constructor() {
		super({"domain": "perfilautorizacao"});		
		this.setSize(8);

		this.buildToolBar();
		
		this.aviso = new Alert("Cadastro");
		this.aviso.setColor(EBasicColorStatus.PRIMARY);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itIdPerfilAutorizacao = new TextInput("cod.");
		this.itIdPerfilAutorizacao.setLabel("cod.");
		this.itIdPerfilAutorizacao.setSize(3);
		this.itIdPerfilAutorizacao.setName("$id");
		this.itIdPerfilAutorizacao.setEnable(false);
		this.append(this.itIdPerfilAutorizacao);

		this.itPerfil = new Select("pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setName("!idPerfil");
		this.itPerfil.setValueField("id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setEnable(false);
		this.itPerfil.setSize(9);
		this.append(this.itPerfil);

		this.itPerfilAlvo = new Select("pefil");
		this.itPerfilAlvo.setLabel("Perfil Alvo:");
		this.itPerfilAlvo.setName("@idPerfilAlvo");
		this.itPerfilAlvo.setValueField("id");
		this.itPerfilAlvo.setLabelField("descricao");
		this.itPerfilAlvo.setSize(12);
		this.append(this.itPerfilAlvo);

		this.itTpAutorizacao = new CheckBox("Autorizacao", "permite liberacao?");
		this.itTpAutorizacao.setLabel("Autorizacao:");
		this.itTpAutorizacao.setName("@tpAutorizacao");
		this.itTpAutorizacao.setCheckedValue(EPerfilAutorizacaoTP.LIBERACAO+"");
		this.itTpAutorizacao.setUnCheckedValue(EPerfilAutorizacaoTP.APROVACAO+"");
		this.itTpAutorizacao.setSize(12);
		this.append(this.itTpAutorizacao);

		this.buildTileList({ itemViewResource: "perfil/view/assets/html/perfilautorizacao" });
	
		this.addEvent("module:start",()=>this.onStart());

		this.addEvent(PerfilAutorizacao.EVENT_AFTER_SAVE, (evt: Event, p_obj: IPerfilAutorizacao) => this.afterSave(p_obj));
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
		$http
			.get("perfilautorizacao/getbyidperfil/" + p_idPerfil)
			.done((dta: IPerfilAutorizacao[]) => this.mainList.setDataProvider(dta));
	}	
	afterSave(p_obj: IPerfilAutorizacao): void {	
		if(!p_obj.perfil){
			p_obj.perfil = <IPerfil>{};
		};	
		p_obj.perfil.id = p_obj.idPerfilAlvo;
		p_obj.perfil.descricao = this.itPerfilAlvo.getText();
		p_obj.perfil.snAtivo = 'S';
	}
}
