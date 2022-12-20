const express = require('express')
const Router = express.Router()

Router.get("/admin/categories/new", (req, res)=> {
  res.render("admin/categories/new.ejs")
})

Router.get("/categories/save", (req, res)=> {
  const title = req.body.title
  if(title != undefined){
    
  }else{
    res.redirect("/admin/categories/new")
  }
})

module.exports = Router;