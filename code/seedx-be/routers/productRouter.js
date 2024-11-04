const express = require("express")
const {addProduct, getAllProducts} = require("../controllers/productController")

const route = express.Router()

const attachSocketIO = (io) => {

    route.get("/", getAllProducts)

    route.post("/add", (request, response) => addProduct(request, response, io))

    return route
}

module.exports = attachSocketIO