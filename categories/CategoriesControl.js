const express = require('express')
const Router = express.Router()
const Category = require("./categories")
Router.get("/admin/categories/new", (req, res)=> {
  res.render("admin/categories/new.ejs")
})

Router.get("/categories/save", (req, res)=> {
  const title = req.body.title
  if(title != undefined){
    Category.create({
      title: title,
      
    })
  }else{
    res.redirect("/admin/categories/new")
  }
})

module.exports = Router;