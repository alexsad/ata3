

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
  // SQLite only
  ,storage: '/mnt/arquivos/deploy/db/sqlite/ata4.sqlite'
  //,storage: 'C:\\sistemas\\db\\sqlite\\ata3.sqlite'
  //,storage: 'C:\\sistemas\\db\\sqlite\\ata5.sqlite'
});
//criar base automagicamente
//sequelize.sync({force:true});
process.on("SIGINT", function() {
	console.log("sequelize fechado!");
  sequelize.close();
	process.exit(0);
});

export = sequelize;
