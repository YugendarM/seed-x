import axiosInstance from "../utils/axiosInstance"

const authService = {
    login: async ({email, password}) => {
        const response = await axiosInstance.post("/auth/login", {email, password})
        return response
    },

    signup: async (userData) => {
        const response = await axiosInstance.post("/auth/signup", userData)
        return response
    },

    logout: async () => {
        const response = await axiosInstance.post("/auth/logout")
        return response
    },
    
} 

export default authService