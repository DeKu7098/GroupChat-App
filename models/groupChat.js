const Sequelize = require("sequelize");
const sequelize = require('../connect');
const groupChat = sequelize.define("groupChat",
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupid:{
        type:Sequelize.STRING
    },
    massage:{
        type:Sequelize.STRING(5000)
    },
    name:{
        type:Sequelize.STRING
    },
    type:{
        type:Sequelize.STRING
    }
}
)
module.exports = groupChat;