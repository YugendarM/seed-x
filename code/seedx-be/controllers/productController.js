const productModel = require("../models/productModel")

const addProduct = async(request, response, io) => {
    const productData = request.body
    try{
        const existingProduct = await productModel.findOne({name: productData.name})
        if(existingProduct){
            return response.status(409).json({status: "Conflict", code: 409, message: "Product already exist"})
        }
        const addedProduct = await productModel.create(productData)
        io.emit("productAdded", addedProduct)
        return response.status(201).json({status: "success", code: 201, message: "Product added successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getAllProducts = async(request, response) => {
    try{
        const productsData = await productModel.find()
        return response.send(productsData)
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

module.exports = {addProduct, getAllProducts}