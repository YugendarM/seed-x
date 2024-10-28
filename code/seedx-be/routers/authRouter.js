const express = require("express")
const { signupUser, loginUser, logout } = require("../controllers/authController")

const route = express()

route.post("/signup", signupUser)
route.post("/login", loginUser)
route.post("/logout", logout)

module.exports = route