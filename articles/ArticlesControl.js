const express = require('express')
const Router = express.Router()
const categories = require("../categories/Categories")
const articles = require("./articles")
const Slugify = require("slugify")
const adminAuth = require("../middleware/adminAuth")

Router.get("/admin/articles",adminAuth, (req, res)=> {
  articles.findAll({
    include:[{
      model:categories
    }]
  }).then((article)=> {
    
    res.render("admin/articles/index.ejs", {
      articles:article
    })
  })
  
})
Router.get("/admin/articles/new", adminAuth, (req, res)=> {
  categories.findAll().then((category)=> {
    res.render("admin/articles/new.ejs", {
    categories: category
  })
  })
})
Router.post("/article/save", adminAuth, (req, res)=> {
  const title = req.body.title
  const body = req.body.body
  const categoryId = req.body.categoryId
  
  if(title != undefined && body != undefined && categoryId != undefined){
  
  
  articles.create({
    title: title,
    body: body,
    slug: Slugify(title, {
      lower: true
    }),
    categoryId: categoryId
  }).then(()=> {
    res.redirect("/admin/articles")
  })
  }else{
    res.redirect("/admin/articles/new")
  }
  
})
Router.post("/article/delete", adminAuth, (req, res)=> {
  const id = req.body.id
  if(id != undefined){ // se n for vazio
    if(!isNaN(id)){
      articles.destroy({
        where: {
          id: id
        }
      }).then(()=> {
        res.redirect("/admin/articles")
      })
    }else{
      res.redirect("/admin/articles")
    }
  }else{
    res.redirect("/admin/articles")
  }
})
Router.get("/admin/article/edit/:id", adminAuth, (req, res)=> {
  const id = req.params.id
  articles.findByPk(id).then((article)=> {
    if(article!=undefined){
      categories.findAll().then((Categories)=> {
        res.render("admin/articles/edit.ejs", {
        article:article,
        categories:Categories
      })
      })
      
    }else{
      res.redirect("/admin/articles")
    }
  }).catch(()=> {
    res.redirect("/admin/articles")
  })
  
})
Router.post("/article/update", adminAuth, (req, res)=> {
  const title = req.body.title 
  const id = req.body.id
  const body = req.body.body
  const categoryId = req.body.categoryId
  if(title != undefined ){
    articles.update({
      title: title,
      slug: Slugify(title, {
        lower: true
      }),
      body: body,
      categoryId: categoryId
    }, {
      where:{
        id:id
      }
    }).then(()=> {
      res.redirect("/admin/articles")
    })
  }else{
    res.redirect("/admin/article/edit/"+id)
  }
})
Router.get("/articles/page/:num", (req, res)=> {
  const num = req.params.num
  const offset = (num-1)*4
  var next
  if(!isNaN(num)){
  articles.findAndCountAll({
    limit: 4,
    offset: offset,
    order:[['id', 'DESC']]
  }).then((page)=> {
    if(offset+4 >= page.count){
      next = false
    }else{
      next = true
    }
    var result = {
      next:next,
      page:page,
      num: num
    }
    categories.findAll().then((Categories)=> {
      res.render("admin/articles/page.ejs", {
        categories: Categories,
        result:result
      })
    })
    
  })}else{
    res.redirect("/")
  }
})
module.exports = Router;