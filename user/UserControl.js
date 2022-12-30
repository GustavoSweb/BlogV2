const express = require("express")
const router = express.Router()
const bcryptjs= require("bcryptjs")
const users = require("./User")

router.get("/admin/users",(req,res)=> {
  users.findAll().then((user)=> {
    res.render("admin/users/index.ejs", {
      users: user
    })
  })
  
})
router.get("/admin/user/create", (req, res)=> {
  res.render("admin/users/create.ejs")
})
router.post("/users/create", (req, res)=> {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const salt = bcryptjs.genSaltSync(10)
  const hash = bcryptjs.hashSync(password, salt)
  
  users.findOne({
    where:{
      email:email
    }
  }).then((user)=> {
    if (user == undefined) {
      users.create({
      name: name,
      email: email,
      password: hash
    }).then(()=> {
      res.redirect("/")
    }).catch((err)=> {
      console.log(err)
      res.redirect("/admin/user/create")
    })
    }else{
      res.redirect("/admin/user/create")
    }
  })
  
  
})
router.get("/login", (req, res)=> {
  res.render("admin/users/login.ejs")
})
router.post("/authenticate", (req, res)=> {
  const email = req.body.email
  const password = req.body.password
  
  users.findOne({
    where:{
      email:email
    }
  }).then((user)=> {
    console.log(password+""+user.password)
    if(user != undefined){
      var correct = bcryptjs.compareSync(password, user.password)
      if(correct){
        req.session.user = {
          name: user.name,
          id: user.id,
          email: user.email
        }
        res.redirect("/admin/articles")
      }else{
        res.redirect("/login")
      }
    }else{
      res.redirect("/login")
    }
  })
  
})
router.get("/logout", (req, res)=> {
  req.session.user = undefined
  res.redirect("/")
})

module.exports = router