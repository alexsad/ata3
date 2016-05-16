import {Box} from "lib/underas/container";
import {ICustomComponent} from "lib/underas/core";
import {Atividade} from "./Atividade";
import {AtividadeList} from "./AtividadeList";
import {TrimestreViewList} from "./TrimestreViewList";
import {ITrimestre,IAtividade} from "../model/ITrimestre";
import PerfilBox = require("../../perfil/view/PerfilBox");

export class TrimestreView extends Box {
	private trimestreViewList: TrimestreViewList;
	private atividadeForm: Atividade;
	private atividadeList: AtividadeList;
	static EVENT_TRIMESTRE_CHANGE: string = "trimestre:change";
	constructor() {
		super();
		this.trimestreViewList = new TrimestreViewList();
		this.append(this.trimestreViewList);

		this.atividadeList = new AtividadeList();
		this.append(this.atividadeList);

		this.buildAtividadeForm();
	}
	private buildAtividadeForm(): void {
		if (!this.atividadeForm) {
			this.atividadeForm = new Atividade();
			this.append(this.atividadeForm);
			this.atividadeForm.init();
		}
		this.atividadeForm.addEvent(Atividade.EVENT_CADASTRO_CANCEL, () => {
			this.trimestreViewList.visible = true;
			this.atividadeList.visible = true;
			this.atividadeForm.show(false);
		});
		this.atividadeForm.show(false);
		this.atividadeForm.addEvent(Atividade.EVENT_CADASTRO_SUBMIT,(evt:Event,ativ:IAtividade)=>{
			//console.log(ativ);
			this.atividadeForm.show(false);
			this.trimestreViewList.visible = true;
			this.atividadeList.visible = true;
			this.setEnable(false);
			this.atividadeList.saveAtividade(ativ);
		});
	}
	setIdPerfil(p_idperfil:number):void{
		this.trimestreViewList.getTrimestresByIdPerfil(p_idperfil);
	}
	init(): void {
		(<ICustomComponent>this.trimestreViewList).addEvent(
			TrimestreViewList.EVENT_ITEM_CHANGE
			, (evt: Event, p_trimestre: ITrimestre, saldo: number) => { 
				this.atividadeList.getByIdTrimestreIdPerfil(p_trimestre.id, PerfilBox.getIdPerfil()) 
				this.atividadeForm.setIdTrimestreIdPerfilSaldo(p_trimestre.id, PerfilBox.getIdPerfil(), saldo);
				this.fireEvent(TrimestreView.EVENT_TRIMESTRE_CHANGE, p_trimestre);
			}
		);

		(<ICustomComponent>this.trimestreViewList).addEvent(
			TrimestreViewList.EVENT_ATIVIDADE_ADICIONAR
			, (evt: Event, {id}: ITrimestre, saldo: number) => {
				
				this.trimestreViewList.visible = false;
				this.atividadeList.visible = false;

				this.atividadeForm.show(true);

				this.atividadeForm.setAtividade(<IAtividade>{});

				this.atividadeForm.setIdTrimestreIdPerfilSaldo(id, PerfilBox.getIdPerfil(), saldo);

			}
		);
		//this.atividadeForm.onStart();

		(<ICustomComponent>this.atividadeList).addEvent(AtividadeList.EVENT_ATIVIDADE_SAVE_SUCCESS, (evt: Event) => {
			this.setEnable(true);
		});

		(<ICustomComponent>this.atividadeList).addEvent(AtividadeList.EVENT_ATIVIDADE_EDIT,(evt:Event,ativ:IAtividade)=>{
			//console.log(ativ);
			this.trimestreViewList.visible=false;
			this.atividadeList.visible = false;

			this.atividadeForm.show(true);
			
			this.atividadeForm.setAtividade(ativ);
		});
	}
}