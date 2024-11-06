import axiosInstance from "../utils/axiosInstance";

const productionService = {
    getAllProductions : async() => {
        const response = await axiosInstance.get("/production/")
        return response
    },
    
    getProductionById : async(productionId) => {
        const response = await axiosInstance.get(`/production/${productionId}`)
        return response
    }, 

    getProductionsByCategory : async(category) => {
        const response = await axiosInstance.get(`/production/category/${category}`)
        return response
    },

    getProducersByCategory : async(category) => {
        const response = await axiosInstance.get(`/production/producer/category/${category}`)
        return response
    },

    getAllProducers : async() => {
        const response = await axiosInstance.get("/production/producer")
        return response
    }
}

export default productionService