var Model = require('../../node_modules/sequelize/lib/model');
Model.prototype.findByIdAssoc = function(p_id) {
    return this.findOne({
        include: [{
            all: true
            , nested: false
            , required: true
        }]
        ,where:[{
            id:p_id
        }]
    });
}

Model.prototype.findAllAssoc=function(p_options){
    var obj_options = p_options || {};
    if(!obj_options.include){
          obj_options.include = [
            {
                all: true
                ,nested: false
                ,required: true
           }
        ];
    }
    return this.findAll(obj_options);
}

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
