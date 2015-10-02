var usuarios = null;
$(function(){
	var login = new Login();
	$("body").append(login.htmlX);  
    var evento = new Evento();		
    $("body").append(evento.htmlX);  
    var org = new Organizacao();		
    $("body").append(org.htmlX); 
    usuarios = new Usuario();
    $("body").append(usuarios.htmlX); 
    usuario.tbMain.reload();
    
        
});