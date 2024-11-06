const express = require("express")
const {addProduct, getAllProducts, updateProduct, deleteProduct, getProductById, getProductsByCategory} = require("../controllers/productController")
const multer = require("multer")

const route = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const attachSocketIO = (io) => {

    route.get("/", getAllProducts)
    route.get("/:productId", getProductById)
    route.get("/category/:category", getProductsByCategory)

    route.post("/add", upload.array('image', 12), (request, response) => addProduct(request, response, io))

    route.put("/update/:productId", (request, response) => updateProduct(request, response, io))

    route.delete("/delete/:productId", (request, response) => deleteProduct(request, response, io))

    return route
}

module.exports = attachSocketIO