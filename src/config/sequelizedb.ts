

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
  //,storage: '/mnt/arquivos/workspace/db/sqlite/ata3.sqlite'
  ,storage: 'C:\\sistemas\\db\\sqlite\\ata3.sqlite'
});

process.on("SIGINT", function() {
	sequelize.close();
	console.log("sequelize fechado!");
	process.exit(0);
});

export = sequelize;
