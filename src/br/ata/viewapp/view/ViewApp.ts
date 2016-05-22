import {SystemApplication,ICustomComponent} from "lib/underas/core";
import {ViewPager,Tab, Box, StyleResource,Form} from "lib/underas/container";
import {LinkButton} from "lib/underas/button";
import {EViewSize, EBasicColorStatus} from "lib/underas/component";
import MenuAdm = require("../../menu/view/MenuAdm");
import {IItemMenu} from "../../perfil/model/IPerfil";
import {AtividadePorTrimestre} from "../../trimestre/view/AtividadePorTrimestre";
import {TrimestreView} from "../../trimestre/view/TrimestreView";


interface IBasicModule{
	onStart(): void;
}

@StyleResource("viewapp/view/assets/css/view_app")
class ViewAppStatic extends ViewPager {
	private tabApps:Tab;
	private atividades: AtividadePorTrimestre;
	private trimestreView: TrimestreView;
	//public EVENT_AUTHENTICATION_SUCCESS: string = "AUTH:SUCCESS";
	constructor() {
		super();
		this.addStyleName("ViewApp");
	}
	init(): void {
		this.append(MenuAdm);
		
		this.tabApps = new Tab();
		this.tabApps.navTab.addStyleName("bg-primary");
		this.tabApps.setCssProperties({
			padding:"0px"
		});
		this.tabApps.setSize(12);
		this.append(this.tabApps);

		(<ICustomComponent>MenuAdm).addEvent(MenuAdm.EVENT_SELECT_MODULE,(evt:Event,p_mod:IItemMenu)=>this.loadModule(p_mod))
		this.autoLoadModule();


		this.buildAtividades();

		this.buildTrimestre();

	}
	private buildAtividades():void{
		this.atividades = new AtividadePorTrimestre();
		let tmplinkatividade: LinkButton = new LinkButton("Atividades");
		tmplinkatividade.setIcon("glyphicon glyphicon-globe");
		this.tabApps.append(tmplinkatividade,this.atividades,true);
	}
	private buildTrimestre(): void {
		this.trimestreView = new TrimestreView();
		let tmplinktrimestre: LinkButton = new LinkButton("Meus Rascunhos");
		tmplinktrimestre.setIcon("glyphicon glyphicon-star");

		this.tabApps.append(tmplinktrimestre, this.trimestreView, false);
		//this.atividades.setIdTrimestre(2);
		this.trimestreView.init();

		//this.trimestreView.setIdPerfil(MenuAdm.idPerfil);

		(<ICustomComponent>MenuAdm).addEvent(MenuAdm.EVENT_CHANGE_PERFIL, (evt: Event, p_idperfil: number) => this.trimestreView.setIdPerfil(p_idperfil));

		this.trimestreView.addEvent(TrimestreView.EVENT_TRIMESTRE_CHANGE,(evt:Event,{id})=>{
			this.atividades.setIdTrimestre(id);
		});
	}
	private loadModule({label,funcao,icone,tela}:IItemMenu): void {
		var nextload: boolean = true;
		var moduleToLoad: string = tela;
		var varModuleToLoadTmpM: string[] = moduleToLoad.split(".");
		var varModuleToLoadTmp: string = varModuleToLoadTmpM[varModuleToLoadTmpM.length - 1];
		var varModuleToLoadTmpCapt: string = varModuleToLoadTmp;
		varModuleToLoadTmp = varModuleToLoadTmp.toLowerCase();
		if (nextload) {
			var urlModuleLoad: string = moduleToLoad;
			SystemApplication.loadModules([urlModuleLoad.replace(/\./g, "/")]
				,(_Form: any)=>{
					let tmp_Form:Form = new _Form[varModuleToLoadTmpCapt]();
					let tmpLink: LinkButton = new LinkButton(label);
					tmpLink.setIcon("glyphicon glyphicon-remove-sign _eligible_to_close_");
					
					this.tabApps.append(tmpLink, tmp_Form,true);
					if ((<IBasicModule><any>tmp_Form).onStart) {
						(<IBasicModule><any>tmp_Form).onStart();
					}
					if (funcao) {
						//console.log(funcao);
						tmp_Form[funcao]();
					};					
				}
			);
		};
	}
	private autoLoadModule(): void {		
		let moduleToLoad: string = SystemApplication.getUrlParam("module");
		if (moduleToLoad){
			this.loadModule({
				label:""
				,funcao:""				
				,idMenu:0
				,tela: moduleToLoad
				,icone:""
				,ordem:0
			});
		}
		
		//this.fireEvent(this.EVENT_AUTHENTICATION_SUCCESS);
	}
}

var ViewApp: ViewAppStatic = new ViewAppStatic();
export = ViewApp; 