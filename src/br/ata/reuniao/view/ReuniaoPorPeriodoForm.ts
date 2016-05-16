import {Form, ToolBar} from "lib/underas/container";
import {TextInput, Select, TextArea, NumericStepper, DatePickerInput, EDatePartType} from "lib/underas/input";
import {$http, IRequestConfig} from "lib/underas/http";
import {Button} from "lib/underas/button";
import {IReuniao} from "../model/IReuniao";
import {IDiscurso} from "../model/IDiscurso";
import {ReuniaoPeriodoList} from "./ReuniaoPeriodoList";
import { ICustomComponent} from "lib/underas/core";
import {EViewSize} from "lib/underas/component";

export class ReuniaoPorPeriodoForm extends Form {
	itIdDiscurso: TextInput;
	itIdMembro: Select;
	itTempo: NumericStepper;
	itTema: TextInput;
	itFonte: TextArea;
	itLinkFonte: TextInput;
	itDtaF: DatePickerInput;
	itDtaI: DatePickerInput;
	btPesquisar: Button;
	btPrintSintetico: Button;
	btPrintConvites: Button;
	btSalvarConvite: Button;
	mainTb: ToolBar;
	reuniaoPeriodoList: ReuniaoPeriodoList;
	constructor() {
		super();
		this.setSize(12);

		this.mainTb = new ToolBar();
		this.append(this.mainTb);

		this.btPesquisar = new Button("Pesquisar");
		this.btPesquisar.addEvent('click', this.pesquisar.bind(this));
		this.btPesquisar.setIcon("glyphicon glyphicon-search");
		this.mainTb.append(this.btPesquisar, false);

		this.btPrintSintetico = new Button("Discursos");
		this.btPrintSintetico.setIcon("glyphicon glyphicon-print");
		this.btPrintSintetico.addEvent('click', this.printSintetico.bind(this));
		this.btPrintSintetico.setEnable(false);
		this.mainTb.append(this.btPrintSintetico);

		this.btPrintConvites = new Button("Convites");
		this.btPrintConvites.setIcon("glyphicon glyphicon-envelope");
		this.btPrintConvites.addEvent('click', this.printConvites.bind(this));
		this.btPrintConvites.setEnable(false);
		this.mainTb.append(this.btPrintConvites);

		this.btSalvarConvite = new Button("Salvar");
		this.btSalvarConvite.setIcon("glyphicon glyphicon-floppy-save");
		this.btSalvarConvite.addEvent('click', this.salvarConvite.bind(this));
		this.btSalvarConvite.setEnable(true);
		this.mainTb.append(this.btSalvarConvite);

		this.itDtaI = new DatePickerInput();
		this.itDtaI.setLabel("inicio:");
		this.itDtaI.setSize(6);
		this.itDtaI.setDate(EDatePartType.year, 2010);
		this.append(this.itDtaI);

		this.itDtaF = new DatePickerInput();
		this.itDtaF.setLabel("fim:");
		this.itDtaF.setSize(6);
		this.itDtaF.addDate(EDatePartType.month, 3);
		this.append(this.itDtaF);

		this.itIdDiscurso = new TextInput("");
		this.itIdDiscurso.setName("$id");
		this.itIdDiscurso.setLabel("cod.");
		this.itIdDiscurso.setEnable(false);
		this.itIdDiscurso.setSize(2);
		this.append(this.itIdDiscurso);

		this.itIdMembro = new Select("selecione um discursante");
		this.itIdMembro.setName("@idMembro");
		this.itIdMembro.setLabel("membro");
		this.itIdMembro.setValueField("id");
		this.itIdMembro.setLabelField("nome");
		this.itIdMembro.setSize(8);
		this.itIdMembro.setSize(7,EViewSize.EXTRA_SMALL);
		this.append(this.itIdMembro);

		this.itTempo = new NumericStepper(5);
		this.itTempo.setName("@tempo");
		this.itTempo.setLabel("tempo");		
		this.itTempo.setMin(5);
		this.itTempo.setMax(15);
		this.itTempo.setStep(5);
		this.itTempo.setEnable(false, 2);
		this.itTempo.setSize(2);
		this.itTempo.setSize(3,EViewSize.EXTRA_SMALL);
		this.append(this.itTempo);

		this.itTema = new TextInput("");
		this.itTema.setName("@tema");
		this.itTema.setLabel("tema");
		this.itTema.setSize(12);
		this.append(this.itTema);

		this.itFonte = new TextArea("alia. pg.");
		this.itFonte.setName("@fonte");
		this.itFonte.setLabel("ajuda");
		this.itFonte.setSize(12);
		this.itFonte.setMaxLength(25);
		this.append(this.itFonte);

		this.itLinkFonte = new TextInput("");
		this.itLinkFonte.setName("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);
		this.append(this.itLinkFonte);

		this.reuniaoPeriodoList = new ReuniaoPeriodoList();
		this.append(this.reuniaoPeriodoList);
	}
	onStart(): void {
		this.itIdMembro.fromService({
			"url": "membro/getbysnativo/S"
		});
		(<ICustomComponent>this.reuniaoPeriodoList).addEvent(ReuniaoPeriodoList.EVENT_ITEM_CHANGE, (evt: Event, p_obj: IDiscurso) => this.setFormItem(p_obj));
	}
	private atualizar(p_atualizado: IDiscurso): void {
		var tmpNewNome = this.itIdMembro.getText();
		$http
			.put("discurso")
			.body(p_atualizado)
			.done((p_item_updated: IDiscurso) => this.reuniaoPeriodoList.updateDiscurso(p_item_updated));
	}
	pesquisar(evt?: Event): void {
		if (evt) {
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
	private printSintetico(evt: Event): void {
		evt.preventDefault();
	}
	private printConvites(evt: Event): void {
		evt.preventDefault();
	}
	private salvarConvite(evt: Event): void {
		evt.preventDefault();
		var tmpDiscursoForms: IDiscurso = <IDiscurso>this.getFormItem();
		this.atualizar(tmpDiscursoForms);
	}
}
