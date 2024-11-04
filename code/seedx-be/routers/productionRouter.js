const express = require("express")
const {addProduction, getAllProductions, getProductionDataById, updateProduction, deleteProduction} = require("../controllers/productionController")
const { authenticate } = require("../middlewares/authenticate")

const route = express.Router()

const attachSocketIO = (io) => {

    route.get("/", getAllProductions)

    route.post("/add", authenticate, (request, response) => addProduction(request, response, io))

    route.put("/update/:productionId", authenticate, (request, response) => updateProduction(request, response, io))

    route.delete("/delete/:productionId",authenticate, (request, response) => deleteProduction(request, response, io))

    return route
}

module.exports = attachSocketIO