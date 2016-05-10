import {TextInput,CheckBox,TextArea,Select,PassWordInput,EmailInput} from "lib/underas/input";
import {CRUDForm} from "../../form/view/CRUDForm";
import {$http,IRequestConfig} from "lib/underas/http";
import {IMembro} from "../model/IMembro";

export class Membro extends CRUDForm<IMembro>{
	itIdMembro:TextInput;
	itIdOrgnizacao: Select;
	itNmMembro:TextInput;
	itSnAtivo:CheckBox;
	itTelefone:TextInput;
	itCelular:TextInput;
	chSexo:CheckBox;
	taObs:TextArea;
	constructor(){
	 	super({
			"domain": "membro"
	 	});	
		this.setSize(8);

		this.buildToolBar();

		this.itIdMembro = new TextInput("");
		this.itIdMembro.setName("$id");
		this.itIdMembro.setLabel("cod.");
		this.itIdMembro.setEnable(false);
		this.itIdMembro.setSize(2);
		this.append(this.itIdMembro);

		this.itNmMembro = new TextInput("");
		this.itNmMembro.setName("@nome");
		this.itNmMembro.setLabel("Nome");
		this.itNmMembro.setSize(5);
		this.append(this.itNmMembro);

		this.itIdOrgnizacao = new Select("organizacao");
		this.itIdOrgnizacao.setName("@idOrganizacao");
		this.itIdOrgnizacao.setLabel("organizacao");
		//this.itIdOrgnizacao.setEnable(false);
		this.itIdOrgnizacao.setValueField("id");
		this.itIdOrgnizacao.setLabelField("descricao");
		this.itIdOrgnizacao.setSize(3);
		this.append(this.itIdOrgnizacao);


		this.itSnAtivo = new CheckBox("Ativo?","Sim");
		this.itSnAtivo.setCheckedValue("S");
		this.itSnAtivo.setUnCheckedValue("N");
		this.itSnAtivo.setName("@snAtivo");
		this.itSnAtivo.setSize(2);
		this.append(this.itSnAtivo);

		this.chSexo = new CheckBox("sacerdocio:","S");
		this.chSexo.setCheckedValue("M");
		this.chSexo.setUnCheckedValue("F");
		this.chSexo.setName("@sexo");
		this.chSexo.setSize(4);
		this.append(this.chSexo);

		this.itTelefone = new TextInput("");
		this.itTelefone.setLabel("telefone:");
		this.itTelefone.setMaxLength(14);
		this.itTelefone.setName("@telefone");
		this.itTelefone.setSize(4);
		this.append(this.itTelefone);

		this.itCelular = new TextInput("");
		this.itCelular.setLabel("celular:");
		this.itCelular.setMaxLength(14);
		this.itCelular.setName("@celular");
		this.itCelular.setSize(4);
		this.append(this.itCelular);

		this.taObs = new TextArea("");
		this.taObs.setSize(12);
		this.taObs.setLabel("obs:");
		this.taObs.setMaxLength(124);
		this.taObs.setName("@obs");
		this.append(this.taObs);

		this.buildTileList({ itemViewResource: "organizacao/view/assets/html/membro" });
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
