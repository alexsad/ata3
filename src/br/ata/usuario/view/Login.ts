import {Underas} from "lib/underas/core";
import {ModWindow} from "lib/underas/container";
import {Button,CheckBox, PassWordInput, EmailInput, AlertMsg} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";
import {IUsuario} from "../model/IUsuario";
import {PerfilBox} from "../../perfil/view/PerfilBox";

declare var perfilBoxContainer: PerfilBox;

export class Login extends ModWindow{
	amAviso:AlertMsg;
	itlogin:EmailInput;
	itsenha:PassWordInput;
	chlembrar: CheckBox;
	btEntrar:Button;
	btBaixarAplicativo: Button;
	constructor(){
		super("Login");
		this.setRevision("$Revision: 144 $");
		this.setSize(4);

		this.getEle().addClass("col-sm-offset-4 col-xs-offset-0");

		this.amAviso = new AlertMsg("");
		this.amAviso.show(false);
		this.append(this.amAviso);

		this.itlogin = new EmailInput("");
		this.itlogin.setLabel("login");
		this.itlogin.setPlaceHolder("digite seu login");
		this.itlogin.setSize(12);
		this.itlogin.setIcon("user");
		this.append(this.itlogin);

		this.itsenha = new PassWordInput("");
		this.itsenha.setLabel("senha");
		this.itsenha.setPlaceHolder("digite sua senha");
		this.itsenha.setSize(12);
		this.append(this.itsenha);

		this.chlembrar = new CheckBox("Lembrar login:","Sim, desejo lembrar o login nesse computador.");
		this.chlembrar.setCheckedValue("S");
		this.chlembrar.setUnCheckedValue("N");
		this.chlembrar.setSize(12);
		this.append(this.chlembrar);

		this.btEntrar = new Button("Logar");
		this.btEntrar.addEvent("click",this.logar.bind(this));
		this.append(this.btEntrar);

		this.btBaixarAplicativo = new Button("Baixar Aplicativo");
		this.btBaixarAplicativo.setIcon("phone");
		this.btBaixarAplicativo.setSize(4)
		this.btBaixarAplicativo.getEle()
			.removeClass("btn-default")
			.addClass("btn-primary pull-right col-xs-8 visible-xs")
			.attr("href", "assets/bin/nav4.1.apk");
		this.append(this.btBaixarAplicativo);

	}
	onStart():void{
		this.getModView().showNav(false);
		//this.autoLogin();
		perfilBoxContainer = new PerfilBox(this);
		if (Cookies.get("clogin")){
			this.chlembrar.setValue("S");
			this.itlogin.setValue(Cookies.get("clogin"));
		};

		var agentAppVersion: string = Underas.getUrlParam("nav");
		if (agentAppVersion != "") {
			this.btBaixarAplicativo.getEle().hide().removeClass("visible-xs");
		};
	}
	logar():void{
	   if(!this.itlogin.isValid()){
		   this.itlogin.setValid(false);
		   this.amAviso.setText("Login invalido!");
		   this.amAviso.setType(AlertMsg.TP_ERROR);
		   this.amAviso.show(true);
		   return;
	   }else{
		   this.itlogin.setValid(true);
		   this.amAviso.show(false);
			 this.itlogin.setValue(this.itlogin.getValue().toLowerCase());
	   }
	   if(!this.itsenha.isValid()){
		   this.itsenha.setValid(false);
		   this.amAviso.setText("Digite uma senha!");
		   this.amAviso.setType(AlertMsg.TP_ERROR);
		   this.amAviso.show(true);
		   return;
	   }else{
		   this.itsenha.setValid(true);
		   this.amAviso.show(false);
	   }

	   RequestManager.addRequest({
		   "url":"usuario/logar"
		   ,"method":"post"
		   ,"data":{
				"login":this.itlogin.getValue()
				,"senha":this.itsenha.getValue()
		   }
		   ,"onLoad":function(dta:boolean){
		   	if(dta==true){
				if (this.chlembrar.getValue()=="S") {
					Cookies.set("clogin", this.itlogin.getValue(), { expires: Infinity });
				};
	           this.amAviso.show(false);
	           this.getDados();

			   $("#logo_menu").addClass("hidden-xs");

		   	}else{
		   		this.amAviso.setText("Login ou senha invalidos!");
		   		this.amAviso.setType(AlertMsg.TP_ERROR);
		   		this.amAviso.show(true);
		   		//_gaq.push(['_trackEvent', 'usuario.business.UsuarioBLL.logar', 'invalido']);
		   	}
	   }.bind(this)});
	}
	getDados():void{
		RequestManager.addRequest({
			"url":"usuario/getbylogin/"+this.itlogin.getValue()
			,"onLoad" : function(dta:IUsuario){
				if(dta){
					perfilBoxContainer.getPerfisByIdUsuario(dta.id);
				}
			}.bind(this)
		});
	}
	logOff():void{
		this.clearAll();
		this.itsenha.setValue("");
		this.itlogin.setValue("");
		this.getModView().show(true).showNav(false);
	}
	clearAll():void{
		$("#sidebar,#tabs_menu,#navbarlist").html("");
		$("#conteudo div.ModView").not(".mdwLogin").remove();
	}
	autoLogin():void{
		var tl = Underas.getUrlParam("login");
		var ts = Underas.getUrlParam("senha");
		if(tl!=""){
			this.itlogin.setValue(tl);
			this.itsenha.setValue(ts);
			this.logar();
		}
	}
}
