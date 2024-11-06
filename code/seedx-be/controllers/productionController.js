const productionModel = require("../models/productionModel")
const userModel = require("../models/userModel")
const { uploadFiles, getFileUrls, deleteFiles } = require("../services/aws-s3")

const addProduction = async(request, response, io) => {
    const productionData = request.body
    const producerData = request.user
    const files = request.files

    if(!producerData.isProducer){
        return response.status(404).json({status: "failure", code: 404, message: "User must be a producer to add production"})
    }
    try{
        const existingProduction = await productionModel.findOne({
            product: productionData.product,
            producer: producerData._id,
            productGrade: productionData.productGrade
        }) 
        if(existingProduction){
            return response.status(409).json({status: "conflict", code: 409, message: "Production already exist"})
        }

        const newProduction = new productionModel({
            ...productionData,
            producer: producerData._id,
            images: (await uploadFiles(files)).map((file) => file.filename)
        })

        const addedProduction = await newProduction.save()
        io.emit("productionAdded", addedProduction)
        return response.status(201).json({status: "success", code: 201, message: "Production added successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

// todo : update images in productions
const updateProduction = async(request, response, io) => {
    const productionId = request.params.productionId
    const productionData = request.body
    const producerData = request.user

    if (!productionId) {
        return response.status(400).json({
            status: "failure",
            code: 400,
            message: "Invalid or missing productionId"
        }) 
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
            await deleteFiles(validProduction.images)
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

        const productionsWithImageUrls = await Promise.all(productionsData.map((async (production) => {
            const productionWithUrls = production.toObject()
            if(production.images && production.images.length > 0){
                productionWithUrls.imageUrls = await getFileUrls(production.images)
            }
            return productionWithUrls
        })))
        return response.status(200).send({status: "success", code: 200, productionsData : productionsWithImageUrls})
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

        const productionData = validProduction.toObject()
        if(validProduction.images && validProduction.images.length > 0){
            productionData.imageUrls = await getFileUrls(validProduction.images)
        }

        return response.status(200).json({status: "success", code: 200, productionData})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getProductionsByCategory = async(request, response) => {
    const {category} = request.params

    try{
        const matchedProductionsData = await productionModel.find()
            .populate({
                path:'producer', 
                select: '-rating -role -reviews -favourites -cart -createdAt -updatedAt -__v'
            })
            .populate({
                path: 'product',
                match: { category: category },
                select: '-createdAt -updatedAt -__v'
            })
            .exec()

        const productionsData = matchedProductionsData.filter(production => production.product != null) 

        const productionsWithImageUrls = await Promise.all(productionsData.map((async (production) => {
            const productionWithUrls = production.toObject()
            if(production.images && production.images.length > 0){
                productionWithUrls.imageUrls = await getFileUrls(production.images)
            }
            return productionWithUrls
        })))
        return response.status(200).send({status: "success", code: 200, productionsData : productionsWithImageUrls})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const mongoose = require("mongoose") 

const getAllProducers = async (request, response) => {
    try {
        const uniqueProducers = await productionModel.aggregate([
            {
                $lookup: {
                    from: 'product', 
                    localField: 'product', 
                    foreignField: '_id', 
                    as: 'productDetails'
                }
            },
            { 
                $unwind: '$productDetails' 
            },
            {
                $lookup: {
                    from: 'user',  
                    localField: 'producer', 
                    foreignField: '_id', 
                    as: 'producerDetails'
                }
            },
            { 
                $unwind: '$producerDetails'
            },
            {
                $group: {
                    _id: '$producerDetails._id',
                    producer: { $first: '$producerDetails' },
                    products: { 
                        $push: {
                            _id: '$productDetails._id',
                            name: '$productDetails.name',
                            category: '$productDetails.category',
                            bestSeller: '$productDetails.bestSeller'
                        } 
                    }
                }
            },
            {
                $project: {
                    'producer.role': 0,
                    'producer.password': 0,
                    'producer.favourites': 0,
                    'producer.cart': 0,
                    'producer.createdAt': 0,
                    'producer.updatedAt': 0,
                    'producer.__v': 0
                }
            }
        ]) 

        const producersWithImageUrls = await Promise.all(uniqueProducers.map(async (entry) => {
            const producer = entry.producer 
            const producerWithUrls = { ...producer, products: entry.products } 
            if (producer.profilePicture && producer.profilePicture.length > 0) {
                producerWithUrls.profilePictureUrls = await getFileUrls(producer.profilePicture) 
            }
            return producerWithUrls 
        })) 

        return response.status(200).json({ status: "success", code: 200, producersData: producersWithImageUrls }) 
    } catch (error) {
        return response.status(500).json({ status: "failure", code: 500, message: error.message }) 
    }
} 



const getProducersByCategory = async(request, response) => {
    const { category } = request.params 

    try {
        const uniqueProducers = await productionModel.aggregate([
            // Lookup to join with the product collection
            {
                $lookup: {
                    from: 'product', 
                    localField: 'product', 
                    foreignField: '_id', 
                    as: 'productDetails'
                }
            },
            { 
                $unwind: '$productDetails' 
            },
            {
                $match: {
                    'productDetails.category': category
                }
            },
            // Lookup to join with the producer collection
            {
                $lookup: {
                    from: 'user', 
                    localField: 'producer', 
                    foreignField: '_id', 
                    as: 'producerDetails'
                }
            },
            {
                $unwind: '$producerDetails'
            },
            // Group by producer ID to ensure unique producers and collect all matching products
            {
                $group: {
                    _id: '$producerDetails._id',
                    producer: { $first: '$producerDetails' },
                    products: { 
                        $push: {
                            _id: '$productDetails._id',
                            name: '$productDetails.name',
                            category: '$productDetails.category',
                            bestSeller: '$productDetails.bestSeller'
                        } } 
                }
            },
            {
                $project: {
                    'producer.role': 0,
                    'producer.password': 0,
                    'producer.favourites': 0,
                    'producer.cart': 0,
                    'producer.createdAt': 0,
                    'producer.updatedAt': 0,
                    'producer.__v': 0
                }
            }
        ]) 

        const producersWithImageUrls = await Promise.all(uniqueProducers.map(async (entry) => {
            const producer = entry.producer 
            const producerWithUrls = { ...producer, products: entry.products } 
            if (producer.profilePicture && producer.profilePicture.length > 0) {
                producerWithUrls.profilePictureUrls = await getFileUrls(producer.profilePicture) 
            }
            return producerWithUrls 
        })) 

        return response.status(200).send({ status: "success", code: 200, producersData: producersWithImageUrls }) 
    } catch (error) {
        return response.status(500).json({ status: "failure", code: 500, message: error.message }) 
    }


}

module.exports = {addProduction, getAllProductions, getProductionDataById, updateProduction, deleteProduction, getProductionsByCategory, getAllProducers, getProducersByCategory}

