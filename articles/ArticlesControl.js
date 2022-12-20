const express = require('express')
const Router = express.Router()


Router.get("/articles", (req, res)=> {
  res.send("Rota de articles")
})
Router.get("/admin/articles", (req, res)=> {
  res.send("Rota de articles para admins")
})
Router.get("/admin/articles/new", (req, res)=> {
  res.send("Rota de articles para admins")
})
module.exports = Router;