const productionModel = require("../models/productionModel")

const addProduction = async(request, response, io) => {
    const productionData = request.body
    const producerData = request.user
    try{
        const existingProduction = await productionModel.findOne({
            product: productionData.product,
            producer: producerData._id,
            productGrade: productionData.productGrade
        });
        if(existingProduction){
            return response.status(409).json({status: "conflict", code: 409, message: "Production already exist"})
        }

        const newProduction = new productionModel({
            ...productionData,
            producer: producerData._id
        })

        const addedProduction = await newProduction.save()
        io.emit("productionAdded", addedProduction)
        return response.status(201).json({status: "success", code: 201, message: "Production added successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getAllProductions = async(request, response) => {
    try{
        const productionsData = await productionModel.find()
            .populate({
                path:'producer', 
                select: '-rating -role -reviews -favourites -cart -createdAt -updatedAt -__v'
            })
            .populate({
                path: 'product',
                select: '-createdAt -updatedAt -__v'
            })
        return response.status(200).send({status: "success", code: 200, productionsData})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getProductionDataById = async(request, response) => {
    const productionId = request.params.productionId
    try{
        const validProduction = await productionModel.findOne({_id: productionId})
        if(!validProduction){
            return response.status(404).json({status: "failure", code: 404, message: "Production not found"})
        }
        return response.status(200).json({status: "success", code: 200, productionData: validProduction})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const updateProduction = async(request, response, io) => {
    const productionId = request.params.productionId
    const productionData = request.body
    const producerData = request.user

    if (!productionId) {
        return response.status(400).json({
            status: "failure",
            code: 400,
            message: "Invalid or missing productionId"
        });
    }
    try{
        const validProduction = await productionModel.findById(productionId)
        if(!validProduction){
            return response.status(404).json({status: "failure", code: 404, message: "Production not found"})
        }
        if(validProduction.producer.equals(producerData._id)){
            const updatedProduction = await productionModel.findOneAndUpdate({_id: productionId}, productionData, {new: true})
            io.emit("productionUpdated", updatedProduction)
            return response.status(200).send({status: "success", code: 200, message: "Production updated successfully"})
        }
        return response.status(401).send({status: "unauthorized", code: 401, message: "Unauthorized access"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}


const deleteProduction = async(request, response, io) => {
    const productionId = request.params.productionId
    const productionData = request.body
    const producerData = request.user
    try{
        const validProduction = await productionModel.findById(productionId)
        if(!validProduction){
            return response.status(404).json({status: "failure", code: 404, message: "Production not found"})
        }
        if(validProduction.producer.equals(producerData._id)){
            const deletedProduction = await productionModel.findOneAndDelete({_id: productionId}, productionData, {new: true})
            io.emit("productionDeleted", deletedProduction)
            return response.status(200).send({status: "success", code: 200, message: "Production deleted successfully"})
        }
        return response.status(401).send({status: "unauthorized", code: 401, message: "Unauthorized access"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

module.exports = {addProduction, getAllProductions, getProductionDataById, updateProduction, deleteProduction}

