const express = require('express')
const Router = express.Router()
const Category = require("./Categories")
const Slugify = require("slugify")
const adminAuth = require("../middleware/adminAuth")
Router.get("/admin/categories/new",adminAuth, (req, res)=> {
  res.render("admin/categories/new.ejs")
})

Router.post("/categories/save",adminAuth, (req, res)=> {
  const title = req.body.title
  if(title != undefined){
    Category.create({
      title: title,
      slug: Slugify(title, {
        lower: true
      })
    }).then(()=> {
      res.redirect("/admin/categories")
    })
  }else{
    res.redirect("/admin/categories/new")
  }
})

Router.get("/admin/categories",adminAuth, (req, res)=> {
  
  Category.findAll().then((categories)=> {
    res.render("admin/categories/index.ejs", {
      categories: categories
    })
  })
  
  
})
Router.post("/categories/delete",adminAuth, (req, res)=> {
  const id = req.body.id
  if(id != undefined){ // se n for vazio
    if(!isNaN(id)){
      Category.destroy({
        where: {
          id: id
        }
      }).then(()=> {
        res.redirect("/admin/categories")
      })
    }else{
      res.redirect("/admin/categories")
    }
  }else{
    res.redirect("/admin/categories")
  }
})
Router.get("/admin/categories/edit/:id",adminAuth, (req, res)=> {
  const id = req.params.id
  if(isNaN(id)){
    res.redirect("/admin/categories")
  }else{
  Category.findByPk(id).then(category => {
    if(category != undefined){
    res.render("admin/categories/edit.ejs", {
      category: category
    })
    }else{
      res.redirect("/admin/categories")
    }
  }).catch(()=> {
    res.redirect("/admin/categories")
  })
  }
})
Router.post("/categories/update",adminAuth, (req, res)=> {
  const title = req.body.title 
  const id = req.body.id
  if(title != undefined ){
    Category.update({
      title: title,
      slug: Slugify(title, {
        lower: true
      })
    }, {
      where:{
        id:id
      }
    }).then(()=> {
      res.redirect("/admin/categories")
    })
  }else{
    res.redirect("/admin/categories/edit/"+id)
  }
})
module.exports = Router;
