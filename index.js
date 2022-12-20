const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/databases')
const category = require('./categories/Categories')
const articles = require('./articles/articles')
const categoriesControll = require('./categories/CategoriesControl')
const articlesControll = require('./articles/ArticlesControl')

// Database

  connection
  .authenticate()
  .then(()=> {
    console.log("Tudo certo!! Vapo skks")
  })
  .catch((erro)=> {
    console.log("Deu pau!! erro: "+ erro)
  })

// Static

app.use(express.static("public"))

// Body parser 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engime", "ejs");

app.use("/", categoriesControll)
app.use("/", articlesControll)
app.get("/", (req, res)=> {
  res.render("index.ejs")
})

const PORT = 8081 || proccess.env.PORT
app.listen(8081, ()=> {
  console.log("Servidor rodando! na porta: "+PORT)
})

