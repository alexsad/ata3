var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '/mnt/arquivos/deploy/db/sqlite/ata4.sqlite'
});
process.on("SIGINT", function () {
    console.log("sequelize fechado!");
    sequelize.close();
    process.exit(0);
});
module.exports = sequelize;
