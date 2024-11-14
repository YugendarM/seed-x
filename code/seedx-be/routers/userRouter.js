const express = require("express")
const { getProducerReviews } = require("../controllers/userController")

const route = express()

route.get("/reviews/:producerId", getProducerReviews)

module.exports = route