import {ModWindow} from "../../../../lib/container";
import {InputText,CheckBox,TextArea,Select,InputPassWord,InputEmail,ListView,ItemView} from "../../../../lib/controller";
import {ToolBar,RequestManager,IDefaultRequest} from "../../../../lib/net";
import {IMembro} from "../model/IMembro";
import {IOrganizacao} from "../model/IOrganizacao";
import {Organizacao} from "./Organizacao";

@ItemView("assets/html/membro.html")
export class Membro extends ModWindow{
	itIdMembro:InputText;
	itNmMembro:InputText;
	itSnAtivo:CheckBox;
	itTelefone:InputText;
	itCelular:InputText;
	chSexo:CheckBox;
	taObs:TextArea;
	mainTb:ToolBar;
	mainList:ListView;
  _modOrganizacao:Organizacao;
	constructor(p_modOrganizacao:Organizacao){
	 	super("*Cadastro de usuarios.");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new ToolBar({"domain":"usuario"});
		this.append(this.mainTb);

		this.itIdMembro = new InputText("");
		this.itIdMembro.setColumn("$_id");
		this.itIdMembro.setLabel("cod.");
		this.itIdMembro.setEnable(false);
		this.itIdMembro.setSize(2);
		this.append(this.itIdMembro);

		this.itNmMembro = new InputText("");
		this.itNmMembro.setColumn("@nome");
		this.itNmMembro.setLabel("Nome");
		this.itNmMembro.setSize(8);
		this.append(this.itNmMembro);

		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setColumn("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.append(this.itSnAtivo);

		this.chSexo = new CheckBox("sacerdocio:","S");
		this.chSexo.setCheckedValue("M");
		this.chSexo.setUnCheckedValue("F");
		this.chSexo.setColumn("@sexo");
		this.chSexo.setSize(4);
		this.append(this.chSexo);

		this.itTelefone = new InputText("");
		this.itTelefone.setLabel("telefone:");
		this.itTelefone.setMaxLength(14);
		this.itTelefone.setColumn("@telefone");
		this.itTelefone.setSize(4);
		this.append(this.itTelefone);

		this.itCelular = new InputText("");
		this.itCelular.setLabel("celular:");
		this.itCelular.setMaxLength(14);
		this.itCelular.setColumn("@celular");
		this.itCelular.setSize(4);
		this.append(this.itCelular);

		this.taObs = new TextArea("");
		this.taObs.setLabel("obs:");
		this.taObs.setMaxLength(124);
		this.taObs.setColumn("@obs");
		this.append(this.taObs);

		this.mainList = new ListView("Membro");
		this.append(this.mainList);
    this._modOrganizacao = p_modOrganizacao;
	}
  beforeInsert(p_req_obj: IDefaultRequest): IDefaultRequest{
		if (!this._modOrganizacao.itIdOrganizacao.getValue()) {
			return null;
		};
		var tmpOrg: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
		if(!tmpOrg.membro) {
			tmpOrg.membro = [];
		};
		//tmpOrg.membro.push(<IMembro>p_req_obj.data);
    	//this._modOrganizacao.mainTb.saveItem(null);
		p_req_obj.url="organizacao/membro/"+this._modOrganizacao.itIdOrganizacao.getValue();
		return p_req_obj;
	}
	beforeUpdate(p_req_new_obj: IDefaultRequest, p_old_obj: IMembro): IDefaultRequest{
    if (!this._modOrganizacao.itIdOrganizacao.getValue()) {
			return null;
		};
		var tmpOrg: IOrganizacao = <IOrganizacao> this._modOrganizacao.getMainList().getSelectedItem();
		if(!tmpOrg.membro){
			tmpOrg.membro = [];
		};
		//tmpMenu.children[0] =  p_req_new_obj.data;
		var indx: number = p_old_obj._ind;
		tmpOrg.membro[indx] = <IMembro>p_req_new_obj.data;
		this._modOrganizacao.mainTb.saveItem(null);
		return null;
	}
	beforeDelete(p_req_delete: IDefaultRequest, p_old_obj: IMembro): IDefaultRequest {
    if (!this._modOrganizacao.itIdOrganizacao.getValue()) {
			return null;
		};
		//p_req_delete.url = "perfil/menu/menuitem/" + this._modOrganizacao.itIdOrganizacao.getValue() + "," + p_old_obj._id;
		var tmpMenu: IOrganizacao = <IOrganizacao>this._modOrganizacao.getMainList().getSelectedItem();
		var indx: number = p_old_obj._ind;
		//tmpMenu.children[indx] = <IItemMenu>p_req_new_obj.data;
		tmpMenu.membro.splice(indx, 1);
		this._modOrganizacao.mainTb.saveItem(null);
		return null;
	}
}
