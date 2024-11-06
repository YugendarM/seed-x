const productModel = require("../models/productModel")
const productionModel = require("../models/productionModel")
const { getFileUrls } = require("../services/aws-s3")

const getSearchResults = async (request, response) => {
    const { query } = request.params 

    try {

        const matchedProducts = await productModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        })

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
                $match: {
                    $or: [
                        { 'productDetails.name': { $regex: query, $options: 'i' } }, 
                        { 'productDetails.category': { $regex: query, $options: 'i' } }, 
                        { 'producerDetails.firstName': { $regex: query, $options: 'i' } }, 
                        { 'producerDetails.lastName': { $regex: query, $options: 'i' } }, 
                        { 'producerDetails.city': { $regex: query, $options: 'i' } }  
                    ]
                }
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

        const productsWithImageUrls = await Promise.all(matchedProducts.map(async (product) => {
            const productWithUrls = { ...product.toObject() } 
            if (product.images && product.images.length > 0) {
                productWithUrls.imageUrls = await getFileUrls(product.images) 
            }
            return productWithUrls 
        })) 

        return response.status(200).json({ status: "success", code: 200, producersData: producersWithImageUrls, productsData: productsWithImageUrls }) 
    } catch (error) {
        return response.status(500).json({ status: "failure", code: 500, message: error.message }) 
    }
} 

module.exports = { getSearchResults } 
