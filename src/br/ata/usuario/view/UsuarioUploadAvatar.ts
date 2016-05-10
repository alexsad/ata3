import {Form} from "lib/underas/container";
import {FileInput} from "lib/underas/input";
import {$http} from "lib/underas/http";
import {Button} from "lib/underas/button";
import {Alert} from "lib/underas/widget";

export class UsuarioUploadAvatar extends Form{
	private idUsuario: number;
	itFile: FileInput;
	btSubmit: Button;
	constructor(p_idUsuario:number){
		super();
		this.idUsuario = p_idUsuario;
		this.itFile = new FileInput("Escolha uma foto!");
		this.itFile.setLabel("escolha uma foto!");
		this.itFile.setName("fileUploaded");
		this.itFile.setSize(12);
		//this.append(this.itFile);
		this.itFile.addEvent('fileselect', this.readyToUpload.bind(this));
		this.append(this.itFile);

		this.btSubmit = new Button("enviar");
		this.btSubmit.setIcon("send");
		this.btSubmit.setEnable(false);
		this.btSubmit.addEvent('click', this.enviarAvatarFile.bind(this));

		this.append(this.btSubmit);

		this.$.find("form").on("submit", function(event:Event) {
			event.stopPropagation();
		}).attr({ 
			"action": $http.rootUrl  +"usuario/upload_avatar/"+this.idUsuario
			,"method":"post"
			,"enctype":"multipart/form-data"
			,"target":"itarget"
		});
	}
	enviarAvatarFile():void{
		if(this.itFile.isValid()){
			this.$.find("form").trigger("submit");
			$("#itarget").on('load', function() { 
				this.$.trigger('avatarchanged',[]);
			}.bind(this));
		};		
	}
	readyToUpload(evt:Event, numFiles:number, label:string) {
		if($("#itarget").length == 0 ){
			$("#hiddenThings").append('<iframe name="itarget" id="itarget"></iframe>');
		};
		this.btSubmit.setEnable(true);
	}
}