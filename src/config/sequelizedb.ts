/// <reference path="../lib/sequelize/sequelize.d.ts" />
var Model = require('../node_modules/sequelize/lib/model');
Model.prototype.findByIdAssoc = function(p_id:number,p_handler_success:Function,p_onErro:Function) {
	this.findOne({
		include: [{
			all: true
			, nested: false				
			, required: false
		}]
		,where:[{
			id:p_id
		}]
	}).then(p_handler_success).catch(p_onErro);
}

interface IOptionConfig{
    include?:{}[];
}
Model.prototype.findAllAssoc=function(p_options?:IOptionConfig){
    var obj_options:IOptionConfig = p_options || {};
    if(!obj_options.include){
          obj_options.include = [
            {
                all: true
                ,nested: false
                ,required: false
           }
        ];  
    }
    return this.findAll(obj_options);
}

var Sequelize = require('sequelize');
declare var process: any;

var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost'
  ,dialect: 'sqlite'
  ,pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  // SQLite onlyo
  //,storage: '/mnt/arquivos/deploy/db/sqlite/ata4.sqlite'
  //,storage: 'C:\\sistemas\\db\\sqlite\\ata3.sqlite'
  ,storage: 'C:\\sistemas\\db\\sqlite\\ata4.sqlite'
});
//criar base automagicamente
//sequelize.sync({force:true});
process.on("SIGINT", function() {
	console.log("sequelize fechado!");
  sequelize.close();
	process.exit(0);
});

console.log(sequelize.define);

export = sequelize;
