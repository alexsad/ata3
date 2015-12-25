import {AlertWindow} from "lib/underas/container";
import {FileInput, AlertMsg,Button} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";

export class UsuarioUploadAvatar extends AlertWindow{
	private idUsuario: number;
	itFile: FileInput;
	btSubmit: Button;
	constructor(p_idUsuario:number){
		super("Escolha uma foto!","");
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

		this.addButton(this.btSubmit);

		this.getEle("form").on("submit", function(event:Event) {
			event.stopPropagation();
		}).attr({ 
			"action": RequestManager.getRootUrl()  +"usuario/upload_avatar/"+this.idUsuario
			,"method":"post"
			,"enctype":"multipart/form-data"
			,"target":"itarget"
		});
	}
	enviarAvatarFile():void{
		if(this.itFile.isValid()){
			this.getEle("form").trigger("submit");
			$("#itarget").on('load', function() { 
				this.getEle().trigger('avatarchanged',[]);
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