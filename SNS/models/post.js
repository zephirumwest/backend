const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type:Sequelize.STRING(200),
                allowNull:false
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true
            }
        },{
            sequelize,
            timestamps:true,
            modelName:'Post',
            tableName:'posts',
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User)
    }
}