import {ModWindow,WebContainer,ETypeModWindow} from "lib/underas/container";
import {TextInput,CheckBox,TextArea,Select,PassWordInput,EmailInput} from "lib/underas/controller";
import {ListView} from "lib/underas/listview";
import {ToolBar} from "lib/underas/net";
import {$http,IRequestConfig} from "lib/underas/http";
import {IMembro} from "../model/IMembro";

@WebContainer({
	itemViewResource: "organizacao/view/assets/html/membro"
})
export class Membro extends ModWindow{
	itIdMembro:TextInput;
	itIdOrgnizacao: Select;
	itNmMembro:TextInput;
	itSnAtivo:CheckBox;
	itTelefone:TextInput;
	itCelular:TextInput;
	chSexo:CheckBox;
	taObs:TextArea;
	mainTb:ToolBar;
	mainList:ListView<IMembro>;
	constructor(){
	 	super("usuarios por organizacao");		
		this.setSize(8);
		this.setType(ETypeModWindow.INFO);

		this.mainTb = new ToolBar({"domain":"membro"});
		this.append(this.mainTb);

		this.itIdMembro = new TextInput("");
		this.itIdMembro.setColumn("$id");
		this.itIdMembro.setLabel("cod.");
		this.itIdMembro.setEnable(false);
		this.itIdMembro.setSize(2);
		this.append(this.itIdMembro);

		this.itNmMembro = new TextInput("");
		this.itNmMembro.setColumn("@nome");
		this.itNmMembro.setLabel("Nome");
		this.itNmMembro.setSize(5);
		this.append(this.itNmMembro);

		this.itIdOrgnizacao = new Select("organizacao");
		this.itIdOrgnizacao.setColumn("@idOrganizacao");
		this.itIdOrgnizacao.setLabel("organizacao");
		//this.itIdOrgnizacao.setEnable(false);
		this.itIdOrgnizacao.setValueField("id");
		this.itIdOrgnizacao.setLabelField("descricao");
		this.itIdOrgnizacao.setSize(3);
		this.append(this.itIdOrgnizacao);


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

		this.itTelefone = new TextInput("");
		this.itTelefone.setLabel("telefone:");
		this.itTelefone.setMaxLength(14);
		this.itTelefone.setColumn("@telefone");
		this.itTelefone.setSize(4);
		this.append(this.itTelefone);

		this.itCelular = new TextInput("");
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

		this.mainList = new ListView<IMembro>("Membro");
		this.append(this.mainList);
	}
	onStart():void{
		this.itIdOrgnizacao.fromService({
			"url":"organizacao"
		});
	}
	getByIdOrganizacao(p_idOrganizacao:number):void{
		this.itIdOrgnizacao.setValue(p_idOrganizacao+"");		
		$http
			.get("membro/getbyidorganizacao/" + p_idOrganizacao)
			.done((dta: IMembro[]) => this.mainList.setDataProvider(dta));
	}
}
