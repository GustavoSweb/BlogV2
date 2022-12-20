const sequelize= require("sequelize")

const connection = new sequelize ('blog', 'u0_a682', '123456',{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;