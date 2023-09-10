const sequelize = require("sequelize")
const connection = require("../database/databases")

const category = connection.define("categories", {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false
  }
  
})
category.sync({force:false})
module.exports = category;