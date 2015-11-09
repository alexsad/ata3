var Sequelize = require("sequelize");
var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '/mnt/arquivos/workspace/db/sqlite/ata3.sqlite'
});
process.on("SIGINT", function () {
    sequelize.close();
    console.log("sequelize fechado!");
    process.exit(0);
});
module.exports = sequelize;
