import {ModWindow} from "../../../../lib/container";
import {Button,InputText,AlertMsg,DatePicker,ListView,ItemView} from "../../../../lib/controller";
import {RequestManager,IDefaultRequest} from "../../../../lib/net";
import {ITrimestre,ITrimestreDataLivre} from "../model/ITrimestre";
import {Trimestre} from "./Trimestre";

/*
idData:number;
idTrimestre:string;
momento:Date;
*/

@ItemView({url:"js/br/ata/trimestre/view/assets/html/trimestredatalivre.html","list":"mainList"})
export class TrimestreDataLivre extends ModWindow{
  itIdData:InputText;
	itMomento:DatePicker;
	aviso:AlertMsg;
	btAddData:Button;
	btDelData:Button;
	mainList:ListView;
	_modTrimestre: Trimestre;
	constructor(p_modTrimestre:Trimestre){
		super("*Perfis Associados","br.ata.trimestre.view.TrimestreDataLivre");
		this.setRevision("$Revision: 1 $");
		this.setSize(4);

		this.aviso = new AlertMsg("Cadastro");
		this.aviso.setType(AlertMsg.TP_ERROR);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itIdData = new InputText();
		this.itIdData.setLabel("Cod:");
    this.itIdData.setColumn("$idData");
		this.itIdData.setSize(12);
		this.append(this.itIdData);

    this.itMomento = new DatePicker();
    this.itMomento.setLabel("Cod:");
    this.itMomento.setColumn("$momento");
    this.itMomento.setSize(12);
    this.append(this.itMomento);

		this.btAddData = new Button("Adicionar");
		this.btAddData.addEvent("click",this.addData.bind(this));
		this.btAddData.setSize(6);
		this.append(this.btAddData);

		this.btDelData = new Button("Remover");
		this.btDelData.addEvent("click",this.delData.bind(this));
		this.btDelData.getEle().removeClass("btn-default").addClass("btn-warning");
		this.btDelData.setSize(6);
		this.append(this.btDelData);

		this.mainList = new ListView("perfis");
		//this.setMainList("mainList");
		this.append(this.mainList);
		this._modTrimestre = p_modTrimestre;
	}
	onStart():void{
	}
	onChangeItem(p_obj:ITrimestreDataLivre):ITrimestreDataLivre{
		//this.itPerfil.setValue(p_obj.idPerfil);
		return p_obj;
	}
	addData(event:Event):void{
		event.preventDefault();
		if(this.itMomento.getValue()){
      var tmpDate = new Date(this.itIdData.getValue());
			var tmpTrimestreSelecionado:ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
			var tmpDataSelecionada:ITrimestreDataLivre = 	<ITrimestreDataLivre>this.getMainList().getSelectedItem();
			if(!tmpTrimestreSelecionado.datasLivres){
				tmpTrimestreSelecionado.datasLivres = [];
			}else{
				var indexPerfil:number = tmpTrimestreSelecionado.datasLivres.indexOf(tmpDate);
				if (indexPerfil > -1) {
					this.aviso.setText("O usuario ja possui esse data!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpTrimestreSelecionado.datasLivres.push(tmpDate);
			this.aviso.setText("Salve o cadastro de trimestre para completar a acao!");
			this.aviso.setType(AlertMsg.TP_INFO);
			this.getPerfis();
		}else{
			this.aviso.setText("Por favor selecione um trimestre!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	delData(event:Event):void{
		event.preventDefault();
		var tmpTrimestreSelecionado:ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
		var tmpDataSelecionada:ITrimestreDataLivre = 	<ITrimestreDataLivre>this.getMainList().getSelectedItem();
		if(tmpTrimestreSelecionado && tmpDataSelecionada){
			var tmpDatasLivres:Date[] = tmpTrimestreSelecionado.datasLivres;
      var tmpDate = new Date(this.itIdData.getValue());
			var indexPerfil:number = tmpDatasLivres.indexOf(tmpDate);
			if (indexPerfil > -1) {
				tmpDatasLivres.splice(indexPerfil, 1);
				this.aviso.setText("Salve o cadastro de trimestre para completar a acao!");
				this.aviso.setType(AlertMsg.TP_INFO);
			}else{
				this.aviso.setText("O trimestre nao possui mais essa data!");
				this.aviso.setType(AlertMsg.TP_ERROR);
			}
			this.getPerfis();
		}else{
			this.aviso.setText("Por favor selecione um trimestre!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	getPerfis():void{
		//console.log(p_idUsuario);
		var tmpTrimestre:ITrimestre = <ITrimestre>this._modTrimestre.getMainList().getSelectedItem();
		var tmpDatasLivres:Date[] = tmpTrimestre.datasLivres;
		var tmpArrayDatasLivres:ITrimestreDataLivre[] = [];
		if(tmpDatasLivres){
			var tmPerfis:number = tmpDatasLivres.length;
			for(var x:number = 0 ;x<tmPerfis;x++){
				tmpArrayDatasLivres.push({"idData":x,"momento":tmpDatasLivres[x]});
			};
		};
		this.getMainList().setDataProvider(tmpArrayDatasLivres);
	}
}