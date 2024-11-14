const express = require("express")
const {addProduction, getAllProductions, getProductionDataById, updateProduction, deleteProduction, getProductionsByCategory, getAllProducers, getProducersByCategory, getProducersByProduct, getProducerById, getProductionsByProducer} = require("../controllers/productionController")
const { authenticate } = require("../middlewares/authenticate")
const multer = require('multer')

const route = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const attachSocketIO = (io) => {

    route.get("/", getAllProductions)
    route.get("/producer", getAllProducers)
    route.get("/:producerId", getProductionsByProducer)
    route.get("/producer/:producerId", getProducerById)
    route.get("/:productionId", getProductionDataById)
    route.get("/category/:category", getProductionsByCategory)
    route.get("/producer/category/:category", getProducersByCategory)
    route.get("/producer/product/:productId", getProducersByProduct)

    route.post("/add", authenticate, upload.array("images", 12), (request, response) => addProduction(request, response, io))

    route.put("/update/:productionId", authenticate, (request, response) => updateProduction(request, response, io))

    route.delete("/delete/:productionId",authenticate, (request, response) => deleteProduction(request, response, io))

    return route
}

module.exports = attachSocketIO