import {ModWindow} from "../../../../lib/underas/container";
import {Button, InputText, Select, TextArea, NumericStepper, DatePicker, DatePartType, ListView, ItemView} from "../../../../lib/underas/controller";
import {SimpleToolBar,RequestManager,IDefaultRequest} from "../../../../lib/underas/net";
import {IReuniao} from "../model/IReuniao";
import {IDiscurso} from "../model/IDiscurso";
import {Discursante} from "./Discursante";
import {FastMembro} from "../../organizacao/view/FastMembro";


@ItemView("assets/html/reuniaoporperiodo.html")
export class ReuniaoPorPeriodo extends ModWindow{
	itIdDiscurso:InputText;
	itIdMembro:Select;
	itTempo:NumericStepper;
	itTema:InputText;
	itFonte:TextArea;
	itLinkFonte:InputText;	
	itDtaF:DatePicker;
	itDtaI:DatePicker;
	btPesquisar:Button;
	btPrintSintetico:Button;
	btPrintConvites:Button;
	btSalvarConvite: Button;
	mainTb:SimpleToolBar;
	mainList:ListView;
	_modMembros:FastMembro;
	constructor(){
		super("*discursantes da reuniao");
		this.setRevision("$Revision: 138 $");
		this.setSize(8);

		this.mainTb = new SimpleToolBar();
		this.append(this.mainTb);

		this.btPesquisar = new Button("Pesquisar");
		this.btPesquisar.addEvent('click',this.pesquisar.bind(this));
		this.btPesquisar.setIcon("search");
		this.mainTb.addButton(this.btPesquisar);

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
		this.btSalvarConvite.setIcon("disk");
		this.btSalvarConvite.addEvent('click', this.salvarConvite.bind(this));
		this.btSalvarConvite.setEnable(true);
		this.mainTb.addButton(this.btSalvarConvite);

		this.itDtaI = new DatePicker();
	    this.itDtaI.setLabel("inicio:");
	    //this.itDtaI.show(false);
	    this.itDtaI.setSize(6);
	    this.itDtaI.setDate(DatePartType.year,2010);
	    this.append(this.itDtaI);

	    this.itDtaF = new DatePicker();
	    this.itDtaF.setLabel("fim:");
	    this.itDtaF.setSize(6);
	    this.itDtaF.addDate(DatePartType.month,3);
	    //this.itDtaF.show(false);
	    this.append(this.itDtaF);

		this.itIdDiscurso = new InputText("");
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
	    this.itTempo.setEnable(false);
	    this.append(this.itTempo);

		this.itTema = new InputText("");
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

		this.itLinkFonte = new InputText("");
		this.itLinkFonte.setColumn("@linkFonte");
		this.itLinkFonte.setLabel("link");
		this.itLinkFonte.setSize(12);
		this.append(this.itLinkFonte);

		this.mainList = new ListView("Discurso");
		this.append(this.mainList);
	}
	onStart():void{
		this.itIdMembro.fromService({
			"url":"membro/getbysnativo/S"
		});
		this._modMembros = new FastMembro();
		this.getModView().append(this._modMembros);
		this.getMainList().setDataProvider([]);
		//this.pesquisar();
		/*
		this.mainList.getEle(".tilecellgrid").on("mouseenter", ".convite_reuniao", function(evt:Event) {
			var _this:JQuery = $(evt.target);
			if (_this.hasClass("convite_reuniao")) {
				var tmpIndex: number = parseInt(_this.attr("data-ind"));
				this.getMainList().changeToIndex(tmpIndex);
			};
		}.bind(this));
		*/
	}
	addDroppableEvent(){
		/*
		var tmpConviteDom =  this.mainList.getEle(".tilecellgrid").find(".convite_reuniao");
		if(!tmpConviteDom.attr("data-droppable")){
			tmpConviteDom.attr("data-droppable","y");
		*/
		console.log("add droppable");

		this.mainList.getEle(".tilecellgrid .convite_reuniao").droppable({
		accept: ".discursante_drag,.convite_drag"
	  	,drop: function( event:Event, ui:any ){
			var tmpMembroDom = $(ui.helper);
			var tmpConviteDom = $(event.target);
			if (tmpMembroDom.hasClass("discursante_drag")) {
				console.log("eh membro!");

				if (!tmpConviteDom.attr("data-updating") && tmpConviteDom.hasClass("active")) {
					tmpConviteDom.attr("data-updating", "y");
					console.log("membro");

					console.log(tmpMembroDom.attr("data-iddiscursante") + ":" + tmpMembroDom.attr("data-nomedisc"));
					console.log("convite");
					//console.log(tmpConviteDom.attr("data-idconvite"));
					//tmpConviteDom.addClass("selectedLine active");
					//console.log(tmpConviteDom);
					var tmpIndex: number = parseInt(tmpConviteDom.attr("data-ind"));
					//this.getMainList()._ind = tmpIndex;
					//this.getMainList().changeToIndex(tmpIndex);
					var tmpDiscurso: IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();

					console.log(tmpDiscurso.idMembro + ":" + tmpDiscurso.nmMembro + " : " + tmpIndex);


					tmpDiscurso.idMembro = parseInt(tmpMembroDom.attr("data-iddiscursante"));
					//tmpDiscurso

					tmpDiscurso.nmMembro = tmpMembroDom.attr("data-nomedisc");
					tmpConviteDom.find("h4 .nmMembro").html(tmpDiscurso.nmMembro);
					//console.log(tmpConviteDom);
					//tmpMembroDom.find(".nmMembro").html(tmpDiscurso.nmMembro);
					if (tmpDiscurso.id) {
						this.atualizar(tmpDiscurso,function(){});
					} else {
						tmpDiscurso.tema = "..defina o tema";
						tmpDiscurso.linkFonte = "#";
						tmpDiscurso.fonte = "Alia.";
						this.inserir(tmpDiscurso);
					};
					//this.getMainList().updateItem(tmpDiscurso);
					this.addDroppableEvent();
				};
			} else if(tmpMembroDom.hasClass("convite_drag")) {
				console.log("eh reuniao!");

				var tmpDiscurso1: IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();
				var idReuniao1: number = tmpDiscurso1.idReuniao;



				//console.log(tmpMembroDom.attr("data-iddiscursante") + ":" + tmpMembroDom.attr("data-nomedisc"));

				var tmpIndex1: number = parseInt(tmpMembroDom.attr("data-indconv"));

				//var tmpIndexConvite: number =

				this.getMainList().changeToIndex(tmpIndex1);

				var tmpDiscurso2: IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();

				if(!tmpDiscurso2.id){

					tmpDiscurso2.tema = tmpDiscurso1.tema;
					tmpDiscurso2.linkFonte = tmpDiscurso1.linkFonte;
					tmpDiscurso2.fonte = tmpDiscurso1.fonte;
					this.inserir(tmpDiscurso2);

				}else{

					var idReuniao2: number = tmpDiscurso2.idReuniao;
					var idDisc1: number = tmpDiscurso1.id;
					tmpDiscurso1.idReuniao = idReuniao2;
					tmpDiscurso2.idReuniao = idReuniao1;
					tmpDiscurso1.id = tmpDiscurso2.id;
					tmpDiscurso2.id = idDisc1;
					//this.mainList.updateItem(tmpDiscurso2);
					//this.mainList.replaceItem(tmpDiscurso2,tmpIndex1);
					//this.getMainList().changeToIndex(tmpDiscurso2._ind);
					//this.mainList.updateItem(tmpDiscurso1);
					//this.mainList.replaceItem(tmpDiscurso1, tmpDiscurso2._ind);
					//replaceWith
					//
					this.atualizar(tmpDiscurso2);
					this.atualizar(tmpDiscurso1);

				}

			}


	  	}.bind(this)

		}).find(".convite_drag").draggable({
			helper: "clone"
		});

		//this.mainList.get
	}
	onChangeItem(p_obj: IReuniao): IReuniao {
		this.setFormItem(p_obj.discursos[0]);
		return p_obj;
	}
	inserir(p_novo:IDiscurso):void{
		RequestManager.addRequest({
			"url":"reuniao/discurso/"+ p_novo.idReuniao
			,"method":"post"
			,"data":p_novo
			,"onLoad":function(newId:number):void{
				//var tmpDiscurso:IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();
				this.getMainList().getSelectedItem().id = newId;
			}.bind(this)
		});
	}
	atualizar(p_atualizado:IDiscurso):void{
		RequestManager.addRequest({
			"url":"reuniao/discurso/"+ p_atualizado.idReuniao
			,"method":"put"
			,"data":p_atualizado
			,"onLoad":function(allOk:boolean):void{

			}.bind(this)
		});
	}
	pesquisar(evt?:Event):void{
		if(evt){
			evt.preventDefault();
		};
		RequestManager.addRequest({
			"url": "reuniao/getbyperiodo"
			, "data": {
				"inicio": this.itDtaI.getValue()
				, "fim": this.itDtaF.getValue()
			}
			, "onLoad": function(dta: IReuniao[]) {
				this.getMainList().setDataProvider(dta);
			}.bind(this)
		});
	}
	printSintetico(evt:Event):void{
		evt.preventDefault();
		//js.underas.core.Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/convite_sintetico.json');
	}
	printConvites(evt:Event):void{
		evt.preventDefault();
		//js.underas.core.Underas.printDataProvider(this.getMainList().getDataProvider(),'assets/reports/convites.json');
	}
	salvarConvite(evt: Event): void {
		evt.preventDefault();

		var tmpDiscurso: IDiscurso = <IDiscurso>this.getMainList().getSelectedItem();


		var tmpDiscursoForms: IDiscurso = <IDiscurso>this.getFormItem();
		tmpDiscursoForms.idReuniao = tmpDiscurso.idReuniao;


		this.atualizar(tmpDiscursoForms);
		//this.pesquisar();

	}
}
