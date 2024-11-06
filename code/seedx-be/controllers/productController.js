const productModel = require("../models/productModel")
const { uploadFiles, getFileUrls, deleteFiles } = require("../services/aws-s3")

const addProduct = async(request, response, io) => {
    const productData = request.body
    const files = request.files
    try{
        const existingProduct = await productModel.findOne({name: productData.name})
        if(existingProduct){
            return response.status(409).json({status: "conflict", code: 409, message: "Product already exist"})
        }

        const newProduct = new productModel({
            name: productData.name,
            category: productData.category,
            bestSeller: productData.bestSeller,
            images: (await uploadFiles(files)).map((file) => file.filename)
        })

        const newProductData = await newProduct.save()

        const addedProduct = newProductData.toObject()
        if(newProductData.images && newProductData.images.length > 0){
            addedProduct.imageUrls = await getFileUrls(newProductData.images)
        }

        io.emit("productAdded", addedProduct)
        return response.status(201).json({status: "success", code: 201, message: "Product added successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}


// todo : update images in products
const updateProduct = async(request, response, io) => {
    const productData = request.body
    const {productId} = request.params
    try{
        const validProduct = await productModel.findById(productId)
        if(!validProduct){
            return response.status(409).json({status: "not found", code: 404, message: "Product not found"})
        }
        const updatedProduct = await productModel.findOneAndUpdate(
            {_id: productId},
            productData,
            {new : true}
        )

        io.emit("productUpdated", updatedProduct)
        return response.status(200).json({status: "success", code: 200, message: "Product updated successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const deleteProduct = async(request, response, io) => {
    const {productId} = request.params
    try{
        const validProduct = await productModel.findById(productId)
        if(!validProduct){
            return response.status(409).json({status: "not found", code: 404, message: "Product not found"})
        }

        await deleteFiles(validProduct.images)
        const deletedProduct = await productModel.findByIdAndDelete({_id: productId})

        io.emit("productDeleted", deletedProduct)
        return response.status(200).json({status: "success", code: 200, message: "Product deleted successfully"})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getAllProducts = async(request, response) => {
    try{
        const productsData = await productModel.find()

        const productsWithImageUrls = await Promise.all(productsData.map((async (product) => {
            const productWithUrls = product.toObject()
            if(product.images && product.images.length > 0){
                productWithUrls.imageUrls = await getFileUrls(product.images)
            }
            return productWithUrls
        })))
        return response.status(200).json({status: "success", code: 200, productsData : productsWithImageUrls})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getProductById = async(request, response) => {
    const {productId} = request.params
    try{
        const validProduct = await productModel.findById(productId)
        if(!validProduct){
            return response.status(404).json({status: "failure", code: 404, message: "Product not found"})
        }

        const productData = validProduct.toObject()
        if(validProduct.images && validProduct.images.length > 0){
            productData.imageUrls = await getFileUrls(validProduct.images)
        }

        return response.status(200).json({status: "success", code: 200, productData})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

const getProductsByCategory = async(request, response) => {
    const {category} = request.params
    
    try{
        const productsData = await productModel.find({category: category})
        if(!productsData || productsData.length <= 0){
            return response.status(404).send({status: "not found", code: 404, message: "No products found provided category"})
        }
        const productsWithImageUrls = await Promise.all(productsData.map((async (product) => {
            const productWithUrls = product.toObject()
            if(product.images && product.images.length > 0){
                productWithUrls.imageUrls = await getFileUrls(product.images)
            }
            return productWithUrls
        })))
        return response.status(200).json({status: "success", code: 200, productsData : productsWithImageUrls})
    }
    catch(error){
        return response.status(500).json({status: "failure", code: 500, message: error.message})
    }
}

module.exports = {addProduct, getAllProducts, updateProduct, deleteProduct, getProductById, getProductsByCategory}