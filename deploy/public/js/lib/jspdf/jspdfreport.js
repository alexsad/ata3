(function (jsPDFAPI) {
	'use strict';
	jsPDFAPI.hex2rgb = function (hexStr){
		// note: hexStr should be #rrggbb
		hexStr = hexStr.toLowerCase();
		var hex = parseInt(hexStr.substring(1), 16);
		var r = (hex & 0xff0000) >> 16;
		var g = (hex & 0x00ff00) >> 8;
		var b = hex & 0x0000ff;
		return [r, g, b];
	};
	jsPDFAPI.rgb2array = function (rgbStr){
		// note: hexStr should be #rrggbb
		rgbStr = rgbStr.toLowerCase().replace(/\s*/gi,"");
		var rs = rgbStr.match(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/);
		return [parseInt(rs[1]), parseInt(rs[2]), parseInt(rs[3])];
	};
	jsPDFAPI.addImage2 = function(props){
		props = $.extend({"_top":150,"id":"t121@","borderSize":1,"borderColor":"rgb(200,200,200)","fillColor":"rgb(0,0,0)","width":0,"height":0,"top":100,"left":50,"right":200},props);
		props._fillColor = this.rgb2array(props.fillColor);
		props._borderColor = this.rgb2array(props.borderColor);
		this.setLineWidth(props.borderSize);
		this.setDrawColor(props._borderColor[0],props._borderColor[1],props._borderColor[2]);
		this.setFillColor(props._fillColor[0],props._fillColor[1],props._fillColor[2]);
		//this.setDrawColor(props._borderColor);			
		//var imgData = getBase64Image(imgLogo[0]);
		this.addImage(props.imgData,'PNG',props.left,props._top,props.width,props.height);		
		this.setDrawColor(0);	
		return null;
	};
	jsPDFAPI.addTriangle = function(props){
		props = $.extend({"_top":150,"id":"t121@","borderSize":1,"borderColor":"rgb(200,200,200)","fillColor":"rgb(0,0,0)","width":0,"height":0,"top":100,"left":50,"right":200},props);
		props._fillColor = this.rgb2array(props.fillColor);
		props._borderColor = this.rgb2array(props.borderColor);
		this.setLineWidth(props.borderSize);
		this.setDrawColor(props._borderColor[0],props._borderColor[1],props._borderColor[2]);
		this.setFillColor(props._fillColor[0],props._fillColor[1],props._fillColor[2]);
		//this.setDrawColor(props._borderColor);
		this.triangle(props.left,(props._top+props.height),props.left+(props.width/2),props._top,(props.left+props.width),(props._top+props.height), 'FD');
		//this.triangle(50,150,100,50, 150, 150, 'FD');
		//this.rect(props.left,props._top,props.width,props.height, 'FD'); // filled red square with black borders
		this.setDrawColor(0);
		return null;
	};
	jsPDFAPI.addRect = function(props){
		this.addElement(props);	
		return null;
	};
	jsPDFAPI.addElement = function(props){
		props = $.extend({"_top":0,"id":"ez121@","borderSize":1,"borderColor":"rgb(200,200,200)","fillColor":"rgb(0,0,0)","width":0,"height":0,"top":0,"left":0},props);
		props._fillColor = this.rgb2array(props.fillColor);
		props._borderColor = this.rgb2array(props.borderColor);
		this.setLineWidth(props.borderSize);
		this.setDrawColor(props._borderColor[0],props._borderColor[1],props._borderColor[2]);
		this.setFillColor(props._fillColor[0],props._fillColor[1],props._fillColor[2]);
		//this.setDrawColor(props._borderColor);
		this.rect(props.left,props._top,props.width,props.height, 'FD'); // filled red square with black borders
		this.setDrawColor(0);
		return null;
	};
	jsPDFAPI.addTextElement = function(props){
		props = $.extend({"_top":0,"type":"text","id":"te121@","textHorizontalAlign":"left","textVerticalAlign":"left","fillColor":"rgb(0,0,0)","fontSize":12,"fontColor":"rgb(0,0,0)","width":0,"height":0,"top":0,"left":0,"text":""},props);
		props._fontColor = this.rgb2array(props.fontColor);
		props._text = props._text || props.text;
		this.setFontSize(props.fontSize);
		this.setTextColor(props._fontColor[0],props._fontColor[1],props._fontColor[2]);
		
		
		var topTmp =  parseInt(props._top)+parseInt(props.height)-5;	
		if(props.height > props.fontSize * 2){			
			var splitText = this.splitTextToSize(props._text,props.width*2+100);
			this.text(parseInt(props.left),topTmp-props.height+10 ,splitText);
		}else{
			this.text(parseInt(props.left),topTmp,props._text+"");
		}		
		
		this.setTextColor(0,0,0);
		this.setFontSize(12);
		return null;
	};

	jsPDFAPI.addTextField = function(props){
		props = $.extend({"_top":0,"type":"textField","id":"tfz121@","textHorizontalAlign":"left","textVerticalAlign":"left","fillColor":"rgb(0,0,0)","fontSize":12,"fontColor":"rgb(0,0,0)","width":0,"height":0,"top":0,"left":0,"text":""},props);
		this.addElement(props);
		this.addTextElement(props);
		return null;
	};	
	jsPDFAPI.addText = function(props){
		props = $.extend({"_top":0,"type":"text","id":"tzww","textHorizontalAlign":"left","textVerticalAlign":"left","fillColor":"rgb(0,0,0)","fontSize":12,"fontColor":"rgb(0,0,0)","width":0,"height":0,"top":0,"left":0,"text":""},props);
		this.addElement(props);
		this.addTextElement(props);
		return null;
	};
	jsPDFAPI.printBand = function (p_dtareport,p_band_index){
		var dtaSetVls = p_dtareport.dataSets[0].itens;
		var tmpLengdtaSet = dtaSetVls.length;
		var bandS = p_dtareport.bands[p_band_index];
		if(tmpLengdtaSet > 0 ){
			/*
			bandS["id"] = bandS.top+"_top";
			bandS["fillColor"] = "#22"+p_band_index+""+p_band_index+"22";
			this.addElement(bandS);	
			*/					
			if(bandS.elements){	
				var bandElements = bandS.elements;
				var tmElements = bandElements.length;
				for(var e = 0 ; e < tmElements ;e++){
					bandElements[e]["height"] = parseInt(bandElements[e]["height"]);
					bandElements[e]["top"] = parseInt(bandElements[e]["top"]);
					bandElements[e]["left"] = parseInt(bandElements[e]["left"]);
					bandElements[e]["width"] = parseInt(bandElements[e]["width"]);
				
				
					bandElements[e]["_top"]  = bandElements[e]["top"]+bandS._top;
					bandElements[e]["_left"] =  bandElements[e]["left"]+bandS.left;
					if(bandElements[e].type=="text"){
						this.addText(bandElements[e]);
					}else if(bandElements[e].type=="textField"){
						bandElements[e]["_text"] = "";
						if(bandElements[e]["text"].indexOf("$F") > -1){
							var strvar = bandElements[e]["text"].match(/\$F\{(.*?)\}/);
							bandElements[e]["_text"] = bandElements[e]["text"].replace(strvar[0],dtaSetVls[0][strvar[1]]);
						}else if(bandElements[e]["text"].indexOf("$V") > -1){
							var strvar = bandElements[e]["text"].match(/\$V\{(.*?)\}/);
							bandElements[e]["_text"] = bandElements[e]["text"].replace(strvar[0],p_dtareport.variables[strvar[1]]);						
						}
						this.addTextField(bandElements[e]);
					}else if(bandElements[e].type=="rect"){
						this.addRect(bandElements[e]);
					}else if(bandElements[e].type=="image"){
						this.addImage2(bandElements[e]);
					}else if(bandElements[e].type=="square"){
						this.addRect(bandElements[e]);
					}else if(bandElements[e].type=="triangle"){
						this.addTriangle(bandElements[e]);
					}
				}
			}
		}
		return null;
	};
	
	
	jsPDFAPI.db2json = function(headerArrayObject){	
		var arrayObjectC = [];
		var incount = 0;
		for(var chave in headerArrayObject){
			var tmlC = headerArrayObject[chave].length;		 
			for(var x = 0;x<tmlC;x++){
				if(arrayObjectC.length == x){
					arrayObjectC[x] = {};
				}			
				arrayObjectC[x][chave] = headerArrayObject[chave][x];
			}	
		}	
		return arrayObjectC;
	};
	
	
	jsPDFAPI.setJereport = function (pdtareport){
		
		
		
		
		
		var dtareport = {"dataSets":[],"bands":[]};
		
		dtareport.bands = this.db2json(pdtareport.bands);
		dtareport.dataSets = pdtareport.dataSets;
		var listaTipos = ["visual_elements","texts","images"];
		for(var z =0;z<3;z++){
			var tmpElements = this.db2json(pdtareport[listaTipos[z]]);
			var tmpL = tmpElements.length;
			for(var x =0;x<tmpL;x++){
				var tmpElement = tmpElements[x];
				var ntm = 0;
				var bandS = dtareport.bands[tmpElement.band];
				if(bandS["elements"]){
					ntm = bandS.elements.length;
				}else{
					bandS.elements = [];
				}
				bandS.elements[ntm] = tmpElement;
			}
		}
		
		
		
		
		
		
		
		
		
		var dtaSetVls = dtareport.dataSets[0].itens;
		var tmpLengdtaSet = dtaSetVls.length;
		var tmbands = dtareport.bands.length;
		var lastItem = 0;
		dtareport.variables = {
						"pageCount":1
						,"pageSum":1
						,"dateTime":0
						,"date":0
						,"rowCount":0
						,"rowSum":tmpLengdtaSet
					};
		dtareport.variables.rowCount = 0;
		dtareport.variables.pageSum = 1;		
		if(tmpLengdtaSet > 0){
			dtareport.bands[0]["_top"] = 0;
			dtareport.bands[0]["left"] = 0;
			dtareport.bands[0]["_left"] = 0;
			dtareport.bands[0]["height"] = parseInt(dtareport.bands[0]["height"]);
			for(var t = 0 ;t<4;t++){
				dtareport.bands[(t+1)]["left"] = 0;
				dtareport.bands[(t+1)]["_left"] = 0;
				dtareport.bands[(t+1)]["_top"] = dtareport.bands[t]["height"]+dtareport.bands[t]["_top"];
				dtareport.bands[(t+1)]["height"] = parseInt(dtareport.bands[(t+1)]["height"]);
			}
			var bandEt = dtareport.bands[2];
			var maxHeight = 0;
			if(bandEt.elements){
			var bandE = bandEt.elements;
			var tmlItens = bandE.length;
				//calcular o a quantidade de paginas
				for(var z = 0;z < tmlItens; z++){
					bandE[z]["height"] = parseInt(bandE[z]["height"]);
					bandE[z]["top"] = parseInt(bandE[z]["top"]);
					bandE[z]["left"] = parseInt(bandE[z]["left"]);
					bandE[z]["width"] = parseInt(bandE[z]["width"]);
					var tmpHeight = bandE[z]["height"]+bandE[z]["top"];
					if(tmpHeight > maxHeight){
						maxHeight = tmpHeight;
					}
				}
			}
			if(maxHeight > 0){
				dtareport.variables.pageSum = parseInt(bandEt.height / maxHeight);
				if(dtareport.variables.pageSum > 0){
					dtareport.variables.pageSum--;
				}
			}		
			
			//dtareport.variables.pageSum = this.internal.getNumberOfPages()+1;	
			//calcular o a quantidade de paginas
			
			
			
			
			
			this.printBand(dtareport,0);
			this.printBand(dtareport,1);
			
			for(var d = lastItem;d < tmpLengdtaSet; d++){
				dtareport.variables.rowCount++;
				for(var x = 0 ; x < tmlItens ;x++){
					if(d < 1){
						bandE[x]["left"] = bandEt.left+bandE[x]["left"];
					}
					if(!bandE[x]["_top"]){
						bandE[x]["_top"]=bandE[x]["top"]+bandEt._top;
					}else{
						bandE[x]["_top"] = parseInt(bandE[x]["_top"])+parseInt(bandE[x]["height"]);
					}
					if((bandE[x]["_top"] + 10) > (bandEt.height+bandEt["_top"]) && bandEt["band"]=="detail"){
					   
						//adicionar summary e footer
						//lastItem = d;
						this.printBand(dtareport,3);
						this.printBand(dtareport,4);
					   
						if(lastItem != d){
							lastItem = d;
							dtareport.variables.pageCount++;
							this.addPage();
							this.printBand(dtareport,0);
							this.printBand(dtareport,1);
						}
						bandE[x]["_top"] = bandE[x]["top"]+bandEt._top;
							//break;
					}//else{
							//if(bandE[x].type=="text" && d < 1){
					if(bandE[x].type=="text"){
						this.addText(bandE[x]);
					}else if(bandE[x].type=="textField"){						
						bandE[x]["_text"] = "";
						if(bandE[x]["text"].indexOf("$F")==0){							
							var strvar = bandE[x]["text"].match(/\$F\{(.*?)\}/);
							bandE[x]["_text"] = bandE[x]["text"].replace(strvar[0],dtaSetVls[d][strvar[1]]);
						}else if(bandE[x]["text"].indexOf("$V")==0){							
							var strvar = bandE[x]["text"].match(/\$V\{(.*?)\}/);
							bandE[x]["_text"] = bandE[x]["text"].replace(strvar[0],dtareport.variables[strvar[1]]);
						}
						this.addTextField(bandE[x]);
					}else if(bandE[x].type=="image"){
						this.addImage2(bandE[x]);
					}else if(bandE[x].type=="rect"){
						this.addRect(bandE[x]);
					}else if(bandE[x].type=="square"){
						this.addRect(bandE[x]);
					}else if(bandE[x].type=="triangle"){
						this.addTriangle(bandE[x]);
					}
					//}
				}
			}				   
			this.printBand(dtareport,3);
			this.printBand(dtareport,4);
			}
		return null;
	}
})(jsPDF.API);