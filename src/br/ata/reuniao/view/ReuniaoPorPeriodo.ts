import {ModWindow, WebContainer} from "lib/underas/container";
import {Button, TextInput, Select, TextArea, NumericStepper, DatePicker, DatePartType} from "lib/underas/controller";
import {$http,IRequestConfig} from "lib/underas/http";
import {IReuniao} from "../model/IReuniao";
import {SimpleToolBar} from "lib/underas/net";
import {IDiscurso} from "../model/IDiscurso";
import {Discursante} from "./Discursante";
import {FastMembro} from "../../organizacao/view/FastMembro";
import {ReuniaoPeriodoList} from "./ReuniaoPeriodoList";

@WebContainer({
	itemViewResource: "reuniao/view/assets/html/reuniaoporperiodo"
})
export class ReuniaoPorPeriodo extends ModWindow{
	itIdDiscurso:TextInput;
	itIdMembro:Select;
	itTempo:NumericStepper;
	itTema:TextInput;
	itFonte:TextArea;
	itLinkFonte:TextInput;	
	itDtaF:DatePicker;
	itDtaI:DatePicker;
	btPesquisar:Button;
	btPrintSintetico:Button;
	btPrintConvites:Button;
	btSalvarConvite: Button;
	mainTb:SimpleToolBar;
	reuniaoPeriodoList: ReuniaoPeriodoList;
	_modMembros:FastMembro;
	constructor(){
		super("*discursantes da reuniao");		
		this.setSize(8);
		this.showTitle(false);

		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);

		this.btPesquisar = new Button("Pesquisar");
		this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
		this.btPesquisar.setIcon("search");
		this.mainTb.addButton(this.btPesquisar,false);

		this.btPrintSintetico = new Button("Discursos");
		this.btPrintSintetico.setIcon("print");
		this.btPrintSintetico.addEvent('click',this.printSintetico.bind(this));
		this.btPrintSintetico.setEnable(false);
		this.mainTb.addButton(this.btPrintSintetico);

		this.btPrintConvites = new Button("Convites");
		this.btPrintConvites.setIcon("envelope");
		this.btPrintConvites.addEvent('click',this.printConvites.bind(this));
		this.btPrintConvites.setEnable(false);
		this.mainTb.addButton(this.btPrintConvites);

		this.btSalvarConvite = new Button("Salvar");
		this.btSalvarConvite.setIcon("floppy-save");
		this.btSalvarConvite.addEvent('click', this.salvarConvite.bind(this));
		this.btSalvarConvite.setEnable(true);
		this.mainTb.addButton(this.btSalvarConvite);

		this.itDtaI = new DatePicker();
	    this.itDtaI.setLabel("inicio:");
	    this.itDtaI.setSize(6);
	    this.itDtaI.setDate(DatePartType.year,2010);
	    this.append(this.itDtaI);

	    this.itDtaF = new DatePicker();
	    this.itDtaF.setLabel("fim:");
	    this.itDtaF.setSize(6);
	    this.itDtaF.addDate(DatePartType.month,3);
	    this.append(this.itDtaF);

		this.itIdDiscurso = new TextInput("");
		this.itIdDiscurso.setColumn("$id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);
		this.itIdDiscurso.setSize(2);
		this.append(this.itIdDiscurso);

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setColumn("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("id");
		this.itIdMembro.setLabelField("nome");
		this.itIdMembro.setSize(8);
		this.append(this.itIdMembro);

		this.itTempo = new NumericStepper(5);
		this.itTempo.setColumn("@tempo");
		this.itTempo.setLabel("tempo");
		this.itTempo.setSize(2);
	    this.itTempo.setMin(5);
	    this.itTempo.setMax(15);
	    this.itTempo.setStep(5);
	    this.itTempo.setEnable(false,2);
	    this.append(this.itTempo);

		this.itTema = new TextInput("");
		this.itTema.setColumn("@tema");
		this.itTema.setLabel("tema");
		this.itTema.setSize(12);
		this.append(this.itTema);

		this.itFonte = new TextArea("alia. pg.");
		this.itFonte.setColumn("@fonte");
		this.itFonte.setLabel("ajuda");
		this.itFonte.setSize(12);
		this.itFonte.setMaxLength(25);
		this.append(this.itFonte);

		this.itLinkFonte = new TextInput("");
		this.itLinkFonte.setColumn("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);
		this.append(this.itLinkFonte);

		this.reuniaoPeriodoList = new ReuniaoPeriodoList();
		this.append(this.reuniaoPeriodoList);
	}
	onStart():void{
		this.itIdMembro.fromService({
			"url":"membro/getbysnativo/S"
		});
		this._modMembros = new FastMembro();
		this.getModView().append(this._modMembros);
		this.reuniaoPeriodoList.onChangeDiscurso = this.setFormItem.bind(this);
	}
	onChangeItem(p_obj: IDiscurso): IDiscurso {
		//console.log(p_obj);
		this.setFormItem(p_obj);
		return p_obj;
	}
	atualizar(p_atualizado:IDiscurso):void{

		var tmpNewNome = this.itIdMembro.getText();		
		$http
			.put("discurso")
			.body(p_atualizado)
			.done((p_item_updated: IDiscurso) => this.reuniaoPeriodoList.updateDiscurso(p_item_updated));
	}
	pesquisar(evt?:Event):void{
		if(evt){
			evt.preventDefault();
		};
		$http
			.get("reuniao/getbyperiodo")
			.params({
				"inicio": this.itDtaI.getValue()
				, "fim": this.itDtaF.getValue()
			})
			.done((dta: IReuniao[]) => this.reuniaoPeriodoList.reuniao = dta);
	}
	printSintetico(evt:Event):void{
		evt.preventDefault();
	}
	printConvites(evt:Event):void{
		evt.preventDefault();
	}
	salvarConvite(evt: Event): void {
		evt.preventDefault();
		var tmpDiscursoForms: IDiscurso = <IDiscurso>this.getFormItem();
		this.atualizar(tmpDiscursoForms);
	}
}
