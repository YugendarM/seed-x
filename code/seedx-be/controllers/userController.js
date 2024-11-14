const userModel = require("../models/userModel")

const registerUserAsProducer = async(request, response, io) => {
    const user = request.user
    
}

const getProducerReviews = async(request, response) => {
    const {producerId} = request.params
    try{
        const existingProducer = await userModel.findById(producerId)
        if(!existingProducer || !existingProducer.isProducer){
            return response.status(404).json({status: "not found", code: 404, message: "Producer not found"})
        }
        return response.status(200).json({status: "success", code: 200, reviewsData: existingProducer.reviews })
    }
    catch (error) {
        return response.status(500).json({ status: "failure", code: 500, message: error.message }) 
    }
}

module.exports = {getProducerReviews}