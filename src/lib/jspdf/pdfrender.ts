import jsPDF = require("./jspdf");

export interface IConfigColumnPrint{
	column: string;
	width: number;
	label: string;
}

export interface IConfigPrint{
	"render": IConfigColumnPrint[];
	"title":string;
	"subtitle":string;
	"orientation":string;
	"plusLines": number; 
}


export class PDFRender{
	private _config: IConfigPrint;
	private _data: any[];
	private _tmDta:number;	
	private _tmLinha: number;
	private _margin_superior: number;
	private _margem_lateral: number;
	private _poYO: number;
	private _poY: number;
	private _tmLinhaH:number;
	private _limitLinhas: number;
	private _pagA: number;
	private _doc: any;


	constructor(){
		this._tmLinha = 6;
		this._margin_superior = 22;
		this._margem_lateral = 10;
		this._poYO = this._margin_superior + 9;
		this._poY = this._poYO;
		this._tmLinhaH = 190;
		this._limitLinhas = 39;
		this._pagA = 1;
		if(!this._doc){
			this._doc = new jsPDF('p', 'pt', 'a4');
		}
	}
	getTotalPags():number{
		return parseInt((this._tmDta / this._limitLinhas) + "") + 1;
	}
	setData(p_data:any[]){
		this._data = p_data;
		this._tmDta = this._data.length;
	}
	setConfig(p_config:IConfigPrint){
		this._config = p_config;
	}
	render():void{
		this.setHeaderPage(0, true);
		var xc:number = 0;//contador de linhas
		for (var x:number = 0; x < this._tmDta; x++) {
			var r:number = 255;
			var g:number = 255;
			var b:number = 255;
			if (x % 2 == 0) {
				//0xE0DDD7
				r = 223;
				g = 220;
				b = 216;
			}
			this._poY += this._tmLinha;
			this._doc.setDrawColor(0);
			this._doc.setFillColor(r, g, b);
			this._doc.rect(
				this._margem_lateral
				, this._poY - this._tmLinha
				, this._tmLinhaH, this._tmLinha
				, 'FD'); // filled red square with black borders
			var posiX = this._margem_lateral + 1;
			var tmC = this._config.render.length;
			for (var z = 0; z < tmC; z++) {
				var textI:string = this._data[x][this._config.render[z].column]+"";
				var widthTMP:number = this.getWidth(this._config.render[z].width);
				if(widthTMP>0) {
					textI = textI.substring(0, (parseInt((widthTMP / 3)+"") + 2));
				}
				this._doc.text(posiX, this._poY - 2, "" + textI);
				posiX += widthTMP;
			}
			xc++;
			if ((xc) > this._limitLinhas) {
				this._pagA++;
				//limitLinhas+=limitLinhas;
				this._poY = this._poYO;
				xc = 0;
				this._doc.addPage();				
				//this._doc.setFontSize(12);
				//this._doc.text(tmLinhaH-4,18,"pag.: " + pagA + "/" + totalPags);
				//this._doc.text(tmLinhaH-4,24,dataHJ);		
				//this._doc.line(margem_lateral,25,tmLinhaH+15,25); // horizontal line	
				this.setHeaderPage(0, true);
				//this._doc.setFontSize(14);
			}
		}
		this._poY += this._tmLinha;
		this._doc.setDrawColor(0);
		this._doc.setFillColor(59, 56, 63);
		this._doc.rect(this._margem_lateral, this._poY - this._tmLinha, this._tmLinhaH, this._tmLinha, 'FD'); // filled red square with black borders
		this._doc.setTextColor(255, 255, 255);
		this._doc.text(this._margem_lateral + 1, this._poY - 1, "Total de Registros: " + this._tmDta);
		this._doc.setTextColor(0, 0, 0);		
		this._doc.save("relatorio_" + "name_report" + ".pdf");	
		//return this._doc.output('datauristring');
	}
	getWidth(p_perc:number):number{
		var tmpTm: number = parseInt((p_perc * this._tmLinha / 100) + "") - this._margem_lateral;
		return tmpTm;
	}
	getBase64Image(img:any):string{
		// Create an empty canvas element
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		// Copy the image contents to the canvas
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		// Get the data-URL formatted image
		// Firefox supports PNG and JPEG. You could check img.src to
		// guess the original format, but be aware the using "image/jpg"
		// will re-encode the image.
		var dataURL = canvas.toDataURL("image/png");
		//console.log(dataURL); //here is where I get 'data:,' 
		//return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		return dataURL;
	}
	setHeaderPage(altura:number, showTitleAgain:boolean):void{
		var hj:Date = new Date();
		var diaS:string = "" + hj.getDate();
		if (diaS.length < 2) {
			diaS = "0" + diaS;
		}
		var totalPgs: number = this.getTotalPags();
		var totalPs: string = "" + totalPgs;
		if (totalPgs < 10) {
			totalPs = "0" + totalPgs;
		}
		var pagAS:string = "" + this._pagA;
		if (this._pagA < 10) {
			pagAS = "0" + this._pagA;
		}
		var montS:string = "" + (hj.getMonth() + 1);
		if (montS.length < 2) {
			montS = "0" + montS;
		}
		var dateParsed:string = diaS + '/' + montS + '/' + hj.getFullYear();
		var imgLogo:JQuery = $("#logReports");
		var marginLogo:number = 0;
		if (imgLogo.length > 0) {
			var imgData = this.getBase64Image(imgLogo[0]);
			this._doc.addImage(imgData, 'JPEG', this._margem_lateral, 10, 12, 12);
			marginLogo = 13;
		}

		if (showTitleAgain) {
			this._doc.setFontSize(24);
			this._doc.text(this._margem_lateral + marginLogo, 16, this._config.title);
			this._doc.setFontSize(12);
			this._doc.text(this._margem_lateral + marginLogo, 22, this._config.subtitle);
		}
		this._doc.text(this._tmLinhaH - 11, altura + 17, "pag.: " + pagAS + "/" + totalPs);
		this._doc.text(this._tmLinhaH - 11, altura + 22, dateParsed);
		this._doc.line(this._margem_lateral, altura + 23, this._tmLinhaH + 10, altura + 23); // horizontal line	
			
		this._doc.setDrawColor(0);
		this._doc.setFillColor(59, 56, 63);
		this._doc.rect(this._margem_lateral, this._poY - this._tmLinha, this._tmLinhaH, this._tmLinha, 'FD'); // filled red square with black borders
		this._doc.setTextColor(255, 255, 255);
		var posiX1 = this._margem_lateral + 1;
		var tmC = this._config.render.length;
		for (var y = 0; y < tmC; y++) {
			var textI = new String(this._config.render[y].label);	
			//alert(textI);				
			this._doc.text(posiX1, this._poY - 2, "" + textI);
			posiX1 += this.getWidth(this._config.render[y].width);
		}
		this._doc.setTextColor(0, 0, 0);
	};

}

