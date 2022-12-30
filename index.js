const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session= require("express-session")


const connection = require('./database/databases')
const category = require('./categories/Categories')
const users = require("./user/User.js")
const articles = require('./articles/articles')
const categoriesControll = require('./categories/CategoriesControl')
const articlesControll = require('./articles/ArticlesControl')
const userControll = require("./user/UserControl.js")

// Database

  connection
  .authenticate()
  .then(()=> {
    console.log("Tudo certo!! Vapo skks")
  })
  .catch((erro)=> {
    console.log("Deu pau!! erro: "+ erro)
  })
 //session
 app.use(session({
   secret: "duidisy0nsnsisk28sh826ja62jal29jdk",
   cookie: {
     maxAge: 30000
   }
 }))
// Static

app.use(express.static("public"))



// Body parser 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engime", "ejs");

app.use("/", categoriesControll)
app.use("/", articlesControll)
app.use("/", userControll)
app.get("/", (req, res)=> {
  articles.findAndCountAll({
    order: [['id', 'DESC']],
    limit: 4
  }).then((article) => {
    
    category.findAll({
      
    }).then((categories)=> {
      
      res.render("index.ejs", {
      articles: article,
      categories: categories
    })
    })
    
  })
  
})
app.get("/:slug", (req, res)=> {
  const slug = req.params.slug
  
  articles.findOne({
    where:{
      slug:slug
    }
  }).then((article)=> {
    if(article != undefined){
      category.findAll().then((categories)=> {
      res.render("article.ejs", {
      article: article,
      categories: categories
    })
    })
    }else{
      res.redirect("/")
    }
    
  }).catch(()=> {
    res.redirect("/")
  })
  
  
})
app.get("/category/:slug", (req, res)=> {
  const slug = req.params.slug
  category.findOne({
    where:{
      slug:slug
    },
    include:[{model: articles}]
  }).then((Category)=> {
    if(Category != undefined){
      category.findAll().then((categories)=> {
        res.render("filter.ejs", {
          categories: categories,
          articles: Category.Articles,
          
        })
      })
    }else{
      res.redirect("/")
    }
  }).catch(()=> {
    res.redirect("/")
  })
})
const PORT = 8081 || proccess.env.PORT
app.listen(8081, ()=> {
  console.log("Servidor rodando! na porta: "+PORT)
})

