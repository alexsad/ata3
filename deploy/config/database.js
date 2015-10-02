var mongoose = require("mongoose");
module.exports = function(uri){
	mongoose.connect(uri);
	mongoose.connection.on("error",function(){
		console.log("erro na conexao:"+erro);
	});
	
	process.on("SIGINT",function(){
			mongoose.connection.close(function(){
					console.log("mongoose fechado!");
					process.exit(0);
			});
	});
}


