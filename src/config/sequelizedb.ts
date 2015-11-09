//import {SequelizeModule} from "../lib/sequelize";
import Sequelize = require("sequelize");
declare var process: any;

var sequelize: Sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost'
  ,dialect: 'sqlite'
  ,pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  // SQLite only
  ,storage: '/mnt/arquivos/workspace/db/sqlite/ata3.sqlite'
});

process.on("SIGINT", function() {
	sequelize.close();
	console.log("sequelize fechado!");
	process.exit(0);
});

export = sequelize;