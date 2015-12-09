function ReuniaoView(){
	Box.apply(this,[]);
	//{"idConvite":"124","idMembro":10,"idReuniao":55,"nome":"VANESSA SOARES DE ARAUJO","sexo":"F","tema":"GRATIDAO","tempo":10,"momento":"18-08-2013","fonte":"ALIAHONA DE JUN. PAG 56"}
	var htmlT = '<div class="col-xs-12" style="padding:0px">'+
	'<div class="col-xs-12" style="text-align:center"><h3>'+this.momento+'</h3></div>'+
	'<div class="row">';	
	for(var t =1;t<4;t++){			
		var tt = t*5;
		var tem = false;
		var ttxt = "t"+tt;
		if(this.convite[ttxt]){
			tem = true;
			if(this.convite[ttxt]["linkFonte"].indexOf("http") < 0){
				this.convite[ttxt]["linkFonte"] = "#";
			}
		}
		var dados = $.extend({"idConvite":"0","linkFonte":"#","idMembro":0,"idReuniao":this.idReuniao,"nome":"","sexo":"M","tema":"","tempo":tt,"momento":this.momento,"fonte":""},this.convite[ttxt]);		
		htmlT += '<div style="" class="col-xs-4 boxdiscurso '+((tem)?'':'blocovazio')+'"><div class="thumbnail"><div class="caption">'+
					'<h4><span style="margin-right:4px" class="tempo label label-'+((tem)?'info':'warning')+'">'+dados.tempo+'</span>'+
					'<span class="nome">'+dados.nome.substring(0,12)+'</span></h4>'+
					'<p class="tema"><strong>'+dados.tema+'</strong></p>'+
					'<p class="fonte"><a href="'+dados.linkFonte+'" target="_blank">'+dados.fonte+'</a></p>'+
					'<input type="hidden" class="idMembro" value="'+dados.idMembro+'"/>'+
					'<input type="hidden" class="idDiscurso" value="'+dados.idConvite+'"/>'+
					'<input type="hidden" class="idReuniao" value="'+dados.idReuniao+'"/>'+
					'<input type="hidden" class="momento" value="'+dados.momento+'"/>'+
					'<input type="hidden" class="linkFonte" value="'+dados.linkFonte+'"/>'+
					'</div></div></div>';	
	}						
	htmlT += '</div></div>';	
	this.htmlX.addClass("ReuniaoView col-xs-12").append(htmlT);			
	this.htmlX[0]["dta"] = this;
}


function FastReuniaoView() {	
    this.tbMain = new SimpleToolBar();
       
    this.btByPeriodo = new js.underas.controller.Button("Pesquisar");
    this.btByPeriodo.setIcon("search");
    this.btByPeriodo.htmlX.click($.proxy(this.pesquisar,this));
    
    this.btLimpar = new  Button("Limpar");
    this.btLimpar.htmlX.click(function(){
    	fastreuniaoview.itDtaI.setValue("");
    	fastreuniaoview.itDtaF.setValue("");
    });
    this.btLimpar.setIcon("remove");    
    
    this.btSalvar = new js.underas.controller.Button("Salvar");
    this.btSalvar.setIcon("hdd");
    this.btSalvar.setEnable(false);
    this.btSalvar.htmlX.click($.proxy(this.salvar,this));
    
    
    this.tbMain.addButton(this.btSalvar,false);
    this.tbMain.addButton(this.btByPeriodo,false);
    this.tbMain.addButton(this.btLimpar,false);
    
	
	this.itDtaI = new  DatePicker();
    this.itDtaI.setLabel("inicio:");
    this.itDtaF = new js.underas.controller.DatePicker();
    this.itDtaF.setLabel("fim:");
    this.itDtaF.addDate("month",3);
    //this.lbDados = new  Label("dados");
    this.itNome = new js.underas.controller.TextInput("");
    this.itNome.setLabel("discursante:");
    this.itNome.setEnable(false);
    this.itNome.setSize(7);
    this.itNome.htmlX.hide();
    this.itDtaD = new js.underas.controller.TextInput("");
    this.itDtaD.setLabel("data:");
    this.itDtaD.setEnable(false);
    this.itDtaD.setIcon("calendar");
    this.itDtaD.setSize(3);
    this.itDtaD.htmlX.hide();
    this.itTempo = new js.underas.controller.TextInput(5);
    this.itTempo.setLabel("duracao:");
    this.itTempo.setEnable(false);
    this.itTempo.setIcon("time");
    this.itTempo.setSize(2);
    this.itTempo.htmlX.hide();
    this.itTema = new js.underas.controller.TextInput("");
    this.itTema.setLabel("tema:");
    this.itTema.setSize(12); 
    this.itTema.setMaxLength(120);
    this.itTema.htmlX.hide();
    
    this.itLinkFonte = new js.underas.controller.TextInput("");  
    this.itLinkFonte.setLabel("link:");
    this.itLinkFonte.setSize(12); 
    this.itLinkFonte.setMaxLength(300);
    this.itLinkFonte.htmlX.hide();    
    
    this.taFonte = new js.underas.controller.TextInput("Aliahona pg.");  
    this.taFonte.setLabel("ajuda:");
    this.taFonte.setSize(12); 
    this.taFonte.setMaxLength(120);
    this.taFonte.htmlX.hide();    
	
	FormalWindow.apply(this,["Discursos","*Organizar rapidamente os discursantes."]);
	this._revision = "$Revision: 138 $";	
	this.htmlX.addClass("FastReuniaoView");
	this.htmlX[0]["dta"] = this;
	this.setIcon("send");
	this.setSize(8);
    this.dtgMain = new TileGrid();
    this.dtgMain.setHeight("310");
    this.dtgMain.setRender(ReuniaoView);	
    //this.dtgMain.itemChange = $.proxy(this.changeCurso,this);     
    this.append(this.tbMain);	
    this.append(this.itDtaI);
    this.append(this.itDtaF);    
    this.append(this.itNome);
    this.append(this.itDtaD);
    this.append(this.itTempo);    
    this.append(this.itTema);      
    this.append(this.itLinkFonte); 
    this.append(this.taFonte);
    this.append(this.dtgMain);    
}

FastReuniaoView.prototype = Object.create(FormalWindow.prototype);
FastReuniaoView.prototype.constructor = FastReuniaoView;

FastReuniaoView.prototype.salvar = function(){    
	var elem = this.htmlX.find(".discurso_selecionado");
	if(elem.length>0){
		var idMembro_ = elem.find(".idMembro").val();		
		var tempo_ = elem.find(".tempo").text();		
		var idReuniao_ = elem.find(".idReuniao").val();	
		var idDiscurso_ = elem.find(".idDiscurso").val();
		
		elem.find('.fonte').text(this.taFonte.getValue());	
		elem.find('.tema').text(this.itTema.getValue());
		elem.find('.linkFonte').val(this.itLinkFonte.getValue());
		
	    rm.addRequest({
	    	"puid":"fastreuniaoview",
	        "s":"discurso.business.DiscursoBLL.editar",
	        "idDiscurso":idDiscurso_,
	        "idReuniao":idReuniao_,
	        "tema":this.itTema.getValue(),
	        "linkFonte":this.itLinkFonte.getValue(),	        
	        "fonte":this.taFonte.getValue(),
	        "idMembro":idMembro_,
	        "tempo":tempo_,
	        "onLoad" : function(dta) {
	        	//fastreuniaoview.pesquisar();             		
	        }
	    });  
	}
};
var reunioes = [];
FastReuniaoView.prototype.pesquisar=function(){
    //rm.addRequest({"s":"ConviteBLL.getRecentes","onLoad":function(dta){   
	reunioes=[];
	
	rm.addRequest({"puid":"fastreuniaoview","s":"reuniao.business.ReuniaoBLL.getByPeriodoSemDiscursante","p":[this.itDtaI.getValue(),this.itDtaF.getValue()],"onLoad":function(dta){ 
    	var tml = dta.rs.length;
    	var lidReuniao = 0;
    	for(var x = 0;x<tml;x++){
    		var itemD = dta.rs[x];
    		if(lidReuniao!=itemD["idReuniao"]){
    			lidReuniao = itemD["idReuniao"];
    			var nind = reunioes.length;
    			reunioes[nind] = {"idReuniao":lidReuniao,"momento":itemD["momento"],"convite":{}};	    			    			
    		}
    	};
    	
    	rm.addRequest({"puid":"fastreuniaoview","s":"discurso.business.ConviteBLL.getByPeriodo","p":[fastreuniaoview.itDtaI.getValue(),fastreuniaoview.itDtaF.getValue()],"onLoad":function(dta){
        	var tml = dta.rs.length;
        	var lidReuniao = 0;
        	for(var x = 0;x<tml;x++){
        		var itemD = dta.rs[x];
        		if(lidReuniao!=itemD["idReuniao"]){
        			lidReuniao = itemD["idReuniao"];
        			var nind = reunioes.length;
        			reunioes[nind] = {"idReuniao":lidReuniao,"momento":itemD["momento"],"convite":{}};	    			
        			reunioes[nind]["convite"]["t"+itemD.tempo] = itemD;	    			
        		}else{
        			var nind = reunioes.length-1;
        			reunioes[nind]["convite"]["t"+itemD.tempo] = itemD;
        		}
        	};
        	//fastreuniaoview.dtgMain.setDataProvider(dta.rs);
        	
        	//reunioes.orderAsc("idReuniao");
        	
        	fastreuniaoview.dtgMain.setDataProvider(reunioes);
        	fastreuniaoview.dtgMain;
        	
        	if(reunioes.length>0){
        		
        		
        		fastreuniaoview.itNome.htmlX.show();        	   
        	    fastreuniaoview.itDtaD.htmlX.show();        	   
        	    fastreuniaoview.itTempo.htmlX.show();
        	    fastreuniaoview.itTema.htmlX.show(); 
        	    fastreuniaoview.itLinkFonte.htmlX.show();  
        	    fastreuniaoview.taFonte.htmlX.show();     	         
        	    
        		fastreuniaoview.btSalvar.setEnable(true);
        		
	        	fastreuniaoview.dtgMain.htmlX.find(".boxdiscurso").droppable({
	    		    accept: "tr",
	    		    accept: ":not(.blocovazio)",
	    		    drop: function (event, ui) { 
	    		    	//alert("oi:"+ui.helper.attr('class'));
	    		    	var elem = $(this);
	    		    	elem.removeClass("blocovazio");
	    		    	var idMembro_ = elem.find(".idMembro").val();
	    		    	var tema_ = elem.find('.tema').text();
	    		    	var tempo_ = elem.find(".tempo").text();
	        			var fonte_ = elem.find('.fonte').text();
	        			var linkFonte_ = elem.find('.linkFonte').val();
	        			var nome_ = elem.find(".nome").text();
	        			var idReuniao_ = elem.find(".idReuniao").val();	
	        			var idDiscurso_ = elem.find(".idDiscurso").val();
	        			var ndiscursoR = {"idMembro":0,"tempo":tempo_,"idReuniao":idReuniao_,"tema":tema_,"linkFonte":linkFonte_,"fonte":fonte_,"s":""};
	    		    	var achados = ui.draggable.find("td");
	    		    	elem.find('.label-warning').removeClass('label-warning').addClass('label-info');
	    		    	if(achados.length > 0){
	    		    			//novo discurso ou mudando o discursante		    			
	    		    			var idMembroN = achados[0].innerHTML;
	    		    			elem.find(".idMembro").val(idMembroN);
	    		    			elem.find(".nome").text(achados[1].innerHTML.substring(0,25).toLowerCase());
	    		    			if(idMembro_ == "0"){
	    		    				//novo discursante
	    		    				fastreuniaoview.htmlX.find(".discurso_selecionado").removeClass("discurso_selecionado");
	    		    				elem.addClass("discurso_selecionado");
	    		    				ndiscursoR["s"] = "discurso.business.DiscursoBLL.add";	
	    		    				ndiscursoR["puid"] = "fastreuniaoview";
	    		    				ndiscursoR["idMembro"] = idMembroN;
	    		    				ndiscursoR["onLoad"] = function(dta){		    					
	    		    					fastreuniaoview.htmlX.find(".discurso_selecionado").find(".idDiscurso").val(dta.rs);
	    		    				};
	    		    				rm.addRequest(ndiscursoR);		    			
	    		    			}else if(idMembro_ != idMembroN){
	    		    				//mudar idMembro e salvar
	    		    				ndiscursoR["s"] = "discurso.business.DiscursoBLL.editar";
	    		    				ndiscursoR["puid"] = "fastreuniaoview";
	    		    				ndiscursoR["idMembro"] = idMembroN;
	    		    				ndiscursoR["idDiscurso"] = idDiscurso_;
	    		    				rm.addRequest(ndiscursoR);		    				
	    		    			}
	    		    			
	    		    			//$(ui.draggable).append("<div class='single-item'><input type='text' class='item-title' /><br /><textarea class='item-text'></textarea></div>");
	    	    		}else{
	    	    			//eh transferencia
	    	    			var novoElemento = ui.draggable;
	    	    			var idDiscursoN = novoElemento.find(".idDiscurso").val();
	    	    			var idMembroN = novoElemento.find(".idMembro").val();	    			
	    	    			var nomeN = novoElemento.find(".nome").text().toLowerCase();
	    	    			var temaN = novoElemento.find(".tema").text();	    	    			
	    	    			var linkFonteN = novoElemento.find(".linkFonte").val();
	    	    			var fonteN = novoElemento.find(".fonte").text();
	    	    			ndiscursoR["s"] = "discurso.business.DiscursoBLL.editar";
	    	    			if(idMembro_ == "0"){
	    	    			//simples com bloco vazio
	    		    			elem.find('.label-warning').removeClass('label-warning').addClass('label-info');		    			
	    		    			novoElemento.find(".tema").text("");
	    		    			novoElemento.find(".fonte").text("");
	    		    			novoElemento.find(".linkFonte").val("");
	    		    			novoElemento.find(".nome").text("");	
	    		    			novoElemento.find(".idMembro").val("0");
	    		    			novoElemento.find('.label-info').removeClass('label-info').addClass('label-warning');
	    		    			novoElemento.addClass("blocovazio");	
	    		    			
	    		    			//muda o idReuniao e o tempo	
	    	    				//importa para a reuniao
	    	    				ndiscursoR["idMembro"] = idMembroN;
	    	    				ndiscursoR["idDiscurso"] = idDiscursoN;    				
	    	    				ndiscursoR["fonte"] = fonteN;
	    	    				ndiscursoR["tema"] = temaN;	 
	    	    				ndiscursoR["linkFonte"] = linkFonteN;	 
	    	    				ndiscursoR["idReuniao"] = idReuniao_;
	    	    				ndiscursoR["puid"] = "fastreuniaoview";
	    	    				rm.addRequest(ndiscursoR);
	    	    			}else{	    				   				
	    		    			//mutua com bloco preenchido
	    		    			//muda o idReuniao de ambos
	    		    			//muda o tempo de ambos trocando 
	    		    			//troca os labeis de ambos menos os tempos	
	    	    				
	    	    				novoElemento.find(".tema").text(tema_);	    	    				
	    		    			novoElemento.find(".linkFonte").val(linkFonte_);
	    	    				novoElemento.find(".fonte").text(fonte_);	    		    			
	    		    			novoElemento.find(".nome").text(nome_.toLowerCase());	
	    		    			novoElemento.find(".idMembro").val(idMembro_);
	    		    			novoElemento.find(".idDiscurso").val(idDiscurso_);
	    		    			
	    		    			
	    	    				//exporta para outra reuniao
	    		    			/*
	    	    				ndiscursoR["idMembro"] = idMembro_;
	    	    				ndiscursoR["idDiscurso"] = idDiscurso_; 
	    	    				ndiscursoR["idReuniao"] = novoElemento.find(".idReuniao").val(); 
	    	    				ndiscursoR["s"] = "DiscursoBLL.trocar";
	    	    				*/
	    	    				rm.addRequest({"puid":"fastreuniaoview","s":"discurso.business.DiscursoBLL.trocar","p":[idDiscurso_,idDiscursoN]});
	    	    				
	    	    			}	    			
	    	    			elem.find(".idDiscurso").val(idDiscursoN);
	        				elem.find(".idMembro").val(idMembroN);        				
	    	    			elem.find(".nome").text(nomeN);	
	    	    			elem.find('.tema').text(temaN);	    	    			
	    	    			elem.find('.linkFonte').val(linkFonteN);
	    	    			elem.find('.fonte').text(fonteN);	    				    			
	
	    	    		}
	    	    	}
	    		}).draggable({helper: 'clone'}).click(function(){
	    			var esseS = $(this);
	    			if(!esseS.hasClass("blocovazio")){				
	    				fastreuniaoview.htmlX.find(".discurso_selecionado").removeClass("discurso_selecionado");
	    				esseS.addClass("discurso_selecionado");
	    				fastreuniaoview.itLinkFonte.setValue(esseS.find('.linkFonte').val());	
	    				fastreuniaoview.taFonte.setValue(esseS.find('.fonte').text());	
	    				fastreuniaoview.itTema.setValue(esseS.find('.tema').text());
	    				
	    				fastreuniaoview.itNome.setValue(esseS.find('.nome').text());
	    				fastreuniaoview.itTempo.setValue(esseS.find('.tempo').text());
	    				fastreuniaoview.itDtaD.setValue(esseS.find('.momento').val());
	    			}
	    			
	    		});
	        	//.filter(":not(.blocovazio)")
	        	//.draggable({helper: 'clone'});
        	}	        	
	        }});	
	}});  
};

FastReuniaoView.prototype.getReunioesFastView=function(){
	js.underas.core.Underas.loadModule({"obj":"fastmembro","mod":"br.net.atasacramental.membro.view.FastMembro.js","act":"getMembros","puid":"fastreuniaoview"});
};