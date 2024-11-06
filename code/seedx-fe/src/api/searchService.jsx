import axiosInstance from "../utils/axiosInstance"

const searchService = {
    getSearchResults: async (query) => {
        const response = await axiosInstance.get(`/search/${query}`)
        return response
    }
} 

export default searchService