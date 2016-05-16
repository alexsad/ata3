import {Render, ICustomComponent} from "lib/underas/core";
import {IEvent} from "lib/underas/component";
import {$http, IRequestConfig} from "lib/underas/http";
import {IAtividade,EAtividadeStatus} from "../model/ITrimestre";
import jquery = require("jquery");

@Render({
	templateResource: "trimestre/view/assets/html/atividade_list"
	, styleResource: ["trimestre/view/assets/css/atividade_list"]
})
export class AtividadeList implements ICustomComponent {
	static EVENT_ATIVIDADE_CHANGE: string = "atividade:change";
	static EVENT_ATIVIDADE_EDIT: string = "atividade:edit";
	static EVENT_ATIVIDADE_SEND: string = "atividade:send";
	static EVENT_ATIVIDADE_SAVE_SUCCESS: string = "atividade:sendsuccess";
	private atividades: IAtividade[];
	public visible:boolean;
	private indxAtividade: number;
	constructor() {
		this.atividades = [];
		this.indxAtividade = 0;
		this.visible = true;
	}
	public saveAtividade(p_ativ:IAtividade):void{
		p_ativ.idStatus = EAtividadeStatus.ELABORADA;
		p_ativ.snEditavel = "S";
		if(p_ativ.id){
			//atualizar
			let tmpAtividade: IAtividade = this.atividades[this.indxAtividade];
			if (p_ativ.idData === tmpAtividade.idData) {
				p_ativ.datalivre = tmpAtividade.datalivre;
			};
			let {idOrganizacao,idPerfil,idTrimestre,idResponsavel} = tmpAtividade;
			tmpAtividade = p_ativ;
			tmpAtividade.idOrganizacao = idOrganizacao;
			tmpAtividade.idPerfil = idPerfil;
			tmpAtividade.idTrimestre = idTrimestre;
			tmpAtividade.idResponsavel = idResponsavel;
			this.atividades[this.indxAtividade] = tmpAtividade;
			
			$http
				.put("atividade")
				.body(tmpAtividade)
				.done(() => {
					(<ICustomComponent>this).fireEvent(AtividadeList.EVENT_ATIVIDADE_SAVE_SUCCESS);
				});
		}else{
			//nova atividade
			this.atividades.unshift(p_ativ);
			$http
				.post("atividade")
				.body(p_ativ)
				.done(() => {
					(<ICustomComponent>this).fireEvent(AtividadeList.EVENT_ATIVIDADE_SAVE_SUCCESS);
				});
		};
	}
	private setAtividadeIndex(p_index: number): void {
		this.indxAtividade = p_index;
		(<ICustomComponent>this).fireEvent(AtividadeList.EVENT_ATIVIDADE_CHANGE, this.atividades[this.indxAtividade]);
	}
	public getByIdTrimestreIdPerfil(p_idTrimestre: number, p_idPerfil: number): void {
		$http
			.get("atividade/getrascunhosenviadasbyidtrimestreidperfil/" + p_idTrimestre + "/" + p_idPerfil)
			.done((dta: IAtividade[]) => this.atividades = dta);
	}
	private edit(p_index: number): void {
		this.indxAtividade = p_index;
		(<ICustomComponent>this).fireEvent(AtividadeList.EVENT_ATIVIDADE_EDIT, this.atividades[this.indxAtividade]);
	}
	private send(p_index: number): void {
		this.indxAtividade = p_index;
		let evt:IEvent = (<ICustomComponent>this).fireEvent(AtividadeList.EVENT_ATIVIDADE_SEND, this.atividades[this.indxAtividade]);
		if(!evt.isDefaultPrevented()){
			var tmpItemAtiv: IAtividade = this.atividades[this.indxAtividade];
			if (tmpItemAtiv.snEditavel === "S") {
				tmpItemAtiv.snEditavel = "N";
				tmpItemAtiv.idStatus = EAtividadeStatus.ENVIADA;
				$http
					.put("atividade")
					.body(tmpItemAtiv)
					.done((res: boolean) => this.onUpdateAtividade(res));
			};
		};
	}
	private onUpdateAtividade(rt_save: boolean): void {
		var tmpItemAtiv: IAtividade = this.atividades[this.indxAtividade];
		var tmpStatus: string = EAtividadeStatus[tmpItemAtiv.idStatus].toLowerCase();
		if (rt_save) {
			if (tmpItemAtiv.idStatus === EAtividadeStatus.ENVIADA) {
				tmpStatus = "aprovada";
			};
			tmpItemAtiv.dsObservacao = "Atividade enviada com sucesso, em breve sua atividade sera analisada e se tudo estiver correto ela sera " + tmpStatus + "!";
			//this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			//this.itDsObservacao.setColor(EBasicColorStatus.INFO);
		} else {
			tmpItemAtiv.dsObservacao = "A atividade nao pode ser " + tmpStatus + ", entre em contato com o bispado em caso de duvidas!";
			//this.itDsObservacao.setText(tmpItemAtiv.dsObservacao);
			//this.itDsObservacao.setColor(EBasicColorStatus.DANGER);
		}
	}
	onRender(p_target: string): void {
		//console.log(p_target);
		jquery(p_target).addClass("AtividadeList col-xs-12");
	}
}