import {SystemApplication} from "lib/underas/core";
import {EViewSize,EBasicColorStatus} from "lib/underas/component";
import {Form,StyleResource} from "lib/underas/container";
import {Button} from "lib/underas/button";
import {Alert} from "lib/underas/widget";
import {CheckBox, PassWordInput, EmailInput } from "lib/underas/input";
import {$http} from "lib/underas/http";
import {IUsuario} from "../model/IUsuario";
import PerfilBox = require("../../perfil/view/PerfilBox");
import Cookies = require("lib/cookies/cookies");

@StyleResource("usuario/view/assets/css/login")
class LoginStatic extends Form {
	amAviso: Alert;
	itlogin: EmailInput;
	itsenha: PassWordInput;
	chlembrar: CheckBox;
	btEntrar: Button;
	btBaixarAplicativo: Button;
	public EVENT_LOGIN_SUCCESS:string="login:success";
	constructor() {
		super();
		this.setSize(12);
		this.addStyleName("FormLogin");
		
		this.amAviso = new Alert("");
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

		this.chlembrar = new CheckBox("Lembrar login:", "Sim, desejo lembrar o login nesse computador.");
		this.chlembrar.setCheckedValue("S");
		this.chlembrar.setUnCheckedValue("N");
		this.chlembrar.setSize(12);
		this.append(this.chlembrar);

		this.btEntrar = new Button("Logar");
		this.btEntrar.addEvent("click", this.logar.bind(this));
		this.append(this.btEntrar);

		this.btBaixarAplicativo = new Button("Baixar Aplicativo");
		this.btBaixarAplicativo.setIcon("phone");
		this.btBaixarAplicativo.setSize(4);
		this.btBaixarAplicativo.setSize(8, EViewSize.EXTRA_SMALL);
		this.btBaixarAplicativo.addStyleName("pull-right visible-xs");
		//this.btBaixarAplicativo.show(false);
		this.btBaixarAplicativo.setColor(EBasicColorStatus.PRIMARY);
		this.btBaixarAplicativo.$.attr("href", "assets/bin/nav4.2.apk");
		this.append(this.btBaixarAplicativo);
		

	}
	init(): void {
		//this.autoLogin();		
		if (Cookies.get("clogin")){
			this.chlembrar.setValue("S");
			this.itlogin.setValue(Cookies.get("clogin"));
		};
		var agentAppVersion: string = SystemApplication.getUrlParam("nav");
		if (agentAppVersion != "") {
			this.btBaixarAplicativo.$.hide().removeClass("visible-xs");
		};
	}
	private onLogar(dta: boolean): void {
		if (dta == true) {
			if (this.chlembrar.getValue() == "S") {
				Cookies.set("clogin", this.itlogin.getValue(), { expires: Infinity });
			};
			this.amAviso.show(false);
			this.getDados();
			//$("#logo_menu").addClass("hidden-xs");
		} else {
			this.amAviso.setText("Login ou senha invalidos!");
			this.amAviso.setColor(EBasicColorStatus.DANGER);
			this.amAviso.show(true);
			//_gaq.push(['_trackEvent', 'usuario.business.UsuarioBLL.logar', 'invalido']);
		}
	}
	private logar(): void {
		if (!this.itlogin.isValid()) {
			this.itlogin.setValid(false);
			this.amAviso.setText("Login invalido!");
			this.amAviso.setColor(EBasicColorStatus.DANGER);
			this.amAviso.show(true);
			return;
		} else {
			this.itlogin.setValid(true);
			this.amAviso.show(false);
			this.itlogin.setValue(this.itlogin.getValue().toLowerCase());
		}
		if (!this.itsenha.isValid()) {
			this.itsenha.setValid(false);
			this.amAviso.setText("Digite uma senha!");
			this.amAviso.setColor(EBasicColorStatus.DANGER);
			this.amAviso.show(true);
			return;
		} else {
			this.itsenha.setValid(true);
			this.amAviso.show(false);
		}

		$http
			.post("usuario/logar")
			.body({
				"login": this.itlogin.getValue()
				, "senha": this.itsenha.getValue()
			})
			.done((res: boolean) => this.onLogar(res));
	}
	private onReceiveDados(dta: IUsuario): void {
		if (dta) {
			PerfilBox.setLogin(dta.login);
			PerfilBox.getPerfisByIdUsuario(dta.id);
			this.fireEvent(this.EVENT_LOGIN_SUCCESS,dta);
		}
	}
	private getDados(): void {
		$http
		.get("usuario/getbylogin/" + this.itlogin.getValue())
		.done((dta: IUsuario) => this.onReceiveDados(dta));
	}
	logOff(): void {
		this.clearAll();
		this.itsenha.setValue("");
		this.itlogin.setValue("");
		//this.getModView().show(true).showNav(false);
	}
	clearAll(): void {
		//$("#sidebar,#tabs_menu,#navbarlist").html("");
		//$("#conteudo div.ModView").not(".mdwLogin").remove();
	}
	autoLogin(): void {
		var tl:string = SystemApplication.getUrlParam("login");
		var ts:string = SystemApplication.getUrlParam("senha");
		var tmp_ala:string = SystemApplication.getUrlParam("ala");

        //alert(tl+":"+ts);
		if(tl != ""){
			this.itlogin.setValue(tl);
			this.itsenha.setValue(ts);
			this.logar();
		};
		if(tmp_ala=="casa_amarela"){
			$http.rootUrl = "http://wclin.com.br:8330/";
		};
	}
}

var Login: LoginStatic = new LoginStatic();
export = Login;