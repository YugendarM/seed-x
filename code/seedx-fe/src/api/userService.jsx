import axiosInstance from "../utils/axiosInstance"

const userService = {
    getProducerReviws: async (producerId) => {
        const response = await axiosInstance.get(`/user/reviews/${producerId}`)
        return response
    },

    
} 

export default userService