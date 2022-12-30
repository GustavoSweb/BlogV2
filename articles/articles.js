const sequelize = require("sequelize")
const connection = require("../database/databases")
const Categorie = require("../categories/Categories")

const Article = connection.define("Articles", {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false
  }
})
Categorie.hasMany(Article) // uma categoria tem muitos artigos 1-p-M
Article.belongsTo(Categorie) // um artigo tem uma categoria 1-p-1


module.exports = Article;