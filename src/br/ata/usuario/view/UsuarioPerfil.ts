import {IUsuario} from "../model/IUsuario";
import {Usuario} from "./Usuario";
import {ModWindow} from "../../../../lib/container";
import {Button,AlertMsg,Select,ListView,ItemView} from "../../../../lib/controller";
import {RequestManager,IDefaultRequest} from "../../../../lib/net";

interface IUsuarioPerfil{
	idPerfil:string;
	descricao: string;
}

@ItemView("assets/html/usuarioperfil.html")
export class UsuarioPerfil extends ModWindow{
	itPerfil:Select;
	aviso:AlertMsg;
	btAddPerfil:Button;
	btDelPerfil:Button;
	mainList:ListView;
	_modUsuario: Usuario;
	constructor(p_modUsuario:Usuario){
		super("*Perfis Associados");
		this.setRevision("$Revision: 1 $");
		this.setSize(4);

		this.aviso = new AlertMsg("Cadastro");
		this.aviso.setType(AlertMsg.TP_ERROR);
		this.aviso.show(true);
		this.append(this.aviso);

		this.itPerfil = new Select("selecione uma pefil");
		this.itPerfil.setLabel("Perfil:");
		this.itPerfil.setValueField("_id");
		this.itPerfil.setLabelField("descricao");
		this.itPerfil.setSize(12);
		this.append(this.itPerfil);

		this.btAddPerfil = new Button("Adicionar");
		this.btAddPerfil.addEvent("click",this.addPerfil.bind(this));
		this.btAddPerfil.setSize(6);
		this.append(this.btAddPerfil);

		this.btDelPerfil = new Button("Remover");
		this.btDelPerfil.addEvent("click",this.delPerfil.bind(this));
		this.btDelPerfil.getEle().removeClass("btn-default").addClass("btn-warning");
		this.btDelPerfil.setSize(6);
		this.append(this.btDelPerfil);

		this.mainList = new ListView("perfis");
		//this.setMainList("mainList");
		this.append(this.mainList);
		this._modUsuario = p_modUsuario;
	}
	onStart():void{
		this.itPerfil.fromService({
			"url":"perfil/perfilsimples"
		});
	}
	onChangeItem(p_obj:IUsuarioPerfil):IUsuarioPerfil{
		this.itPerfil.setValue(p_obj.idPerfil);
		return p_obj;
	}
	addPerfil(event:Event):void{
		event.preventDefault();
		if(this.itPerfil.getValue()){
			var tmpUsuarioSelecionado:IUsuario = <IUsuario>this._modUsuario.getMainList().getSelectedItem();
			var tmpPerfilSelecionado:IUsuarioPerfil = 	<IUsuarioPerfil>this.getMainList().getSelectedItem();
			if(!tmpUsuarioSelecionado.perfis){
				tmpUsuarioSelecionado.perfis = [];
			}else{
				var indexPerfil:number = tmpUsuarioSelecionado.perfis.indexOf(this.itPerfil.getValue());
				if (indexPerfil > -1) {
					this.aviso.setText("O usuario ja possui esse perfil!");
					this.aviso.setType(AlertMsg.TP_ERROR);
					return;
				};
			};
			tmpUsuarioSelecionado.perfis.push(this.itPerfil.getValue());
			this.aviso.setText("Salve o cadastro de usuario para completar a acao!");
			this.aviso.setType(AlertMsg.TP_INFO);
			this.getPerfis();
		}else{
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	delPerfil(event:Event):void{
		event.preventDefault();
		var tmpUsuarioSelecionado:IUsuario = <IUsuario>this._modUsuario.getMainList().getSelectedItem();
		var tmpPerfilSelecionado:IUsuarioPerfil = 	<IUsuarioPerfil>this.getMainList().getSelectedItem();
		if(tmpUsuarioSelecionado && tmpPerfilSelecionado){
			var tmpPerfis:string[] = tmpUsuarioSelecionado.perfis;
			var indexPerfil:number = tmpPerfis.indexOf(tmpPerfilSelecionado.idPerfil);
			if (indexPerfil > -1) {
				tmpPerfis.splice(indexPerfil, 1);
				this.aviso.setText("Salve o cadastro de usuario para completar a acao!");
				this.aviso.setType(AlertMsg.TP_INFO);
			}else{
				this.aviso.setText("O usuario nao possui mais esse perfil!");
				this.aviso.setType(AlertMsg.TP_ERROR);
			}
			this.getPerfis();
		}else{
			this.aviso.setText("Por favor selecione um perfil!");
			this.aviso.setType(AlertMsg.TP_WARNING);
		};
	}
	getPerfis():void{
		//console.log(p_idUsuario);
		var tmpPerfil:IUsuario = <IUsuario>this._modUsuario.getMainList().getSelectedItem();
		var tmpPerfis:string[] = tmpPerfil.perfis;
		var tmpArrayPerfis:IUsuarioPerfil[] = [];
		if(tmpPerfis){
			var tmPerfis:number = tmpPerfis.length;
			for(var x:number = 0 ;x<tmPerfis;x++){
				var tmpDescPerfil:string = this.itPerfil.getDescFromServiceByValue(tmpPerfis[x]);
				//console.log(tmpDescPerfil);
				tmpArrayPerfis.push({"idPerfil":tmpPerfis[x],"descricao":tmpDescPerfil});
			};
		};
		this.getMainList().setDataProvider(tmpArrayPerfis);
	}
}
