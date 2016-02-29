import {WebElement, IWebElementClass} from "lib/underas/core";
import {IReuniao} from "../model/IReuniao";
import {IDiscurso} from "../model/IDiscurso";


@WebElement({
	templateResource:"reuniao/view/assets/html/reuniaoporperiodo"
})
export class ReuniaoPeriodoList implements IWebElementClass{
	public reuniao: IReuniao[];
	private _selectedDiscurso: number;
	private _selectedReuniao: number;
	private _selectedIndxReuniao: number;
	private _selectedIndxDisc: number;
	public show: boolean;
	public onChangeDiscurso:(p_disc:IDiscurso)=>void;
	constructor(){
		this.reuniao = [];
		this._selectedDiscurso = 0;
		this._selectedReuniao = 0;
		this._selectedIndxReuniao=0;
		this._selectedIndxDisc=0;
		this.show = false;
	}
	private setSelectedDiscurso(p_iddisc:number,p_idreuniao:number):void{
		this._selectedDiscurso = p_iddisc;
		this._selectedReuniao = p_idreuniao;
		if (this.onChangeDiscurso) {

			var indexReuniao: number = 0;
			var indexDisc: number = 0;



			this.reuniao.every(function(p_reuniao: IReuniao,p_indx:number) {
				if (p_reuniao.id == p_idreuniao) {
					indexReuniao = p_indx;
					return false;
				};
				return true;
			});
			this.reuniao[indexReuniao].discursos.every(function(p_disc: IDiscurso, p_indx: number) {
				if (p_disc.id == p_iddisc) {
					indexDisc = p_indx;
					return false;
				};
				return true;
			});

			this._selectedIndxReuniao = indexReuniao;
			this._selectedIndxDisc = indexDisc;

			this.onChangeDiscurso(this.reuniao[indexReuniao].discursos[indexDisc]);
		}
	}
	updateDiscurso(p_disc:IDiscurso):void{
		this.reuniao[this._selectedIndxReuniao].discursos[this._selectedIndxDisc] = p_disc;
	}
	onRender(p_ele_seletor:string):void{}
}