import {Form} from "lib/underas/container";
import {FileInput} from "lib/underas/input";
import {Button} from "lib/underas/button";
import {$http} from "lib/underas/http";

export class UsuarioUploadAvatar extends Form {
	private idUsuario: number;
	itFile: FileInput;
	btSubmit: Button;
	static EVENT_UPLOAD_SUCCESS: string = "upload:success";
	constructor(p_idUsuario: number) {
		//super("Escolha uma foto!","");
		super();
		this.idUsuario = p_idUsuario;
		this.itFile = new FileInput("Escolha uma foto!");
		this.itFile.setLabel("escolha uma foto!");
		//this.itFile.setName("fileUploaded");
		this.itFile.setSize(12);
		this.itFile.addEvent('fileselect', this.readyToUpload.bind(this));
		this.append(this.itFile);

		this.btSubmit = new Button("enviar");
		this.btSubmit.setIcon("send");
		this.btSubmit.setEnable(false);
		this.btSubmit.addEvent('click', this.enviarAvatarFile.bind(this));

		this.append(this.btSubmit);
	}
	private enviarAvatarFile(): void {
		if (this.itFile.isValid() && this.btSubmit.isEnable()) {
			$http
				.post("usuario/upload_avatar/" + this.idUsuario, { fileUpload: true })
				.params({ fileUploaded: this.itFile.getValue() })
				.done(() => { 
					this.fireEvent(UsuarioUploadAvatar.EVENT_UPLOAD_SUCCESS); 
				});
		};
	}
	private readyToUpload(): void {
		this.btSubmit.setEnable(true);
	}
}