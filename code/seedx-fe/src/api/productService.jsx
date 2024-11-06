import axiosInstance from "../utils/axiosInstance";

const productService = {
    getAllProducts : async() => {
        const response = await axiosInstance.get("/product/")
        return response
    },
    
    getProductById : async(productId) => {
        const response = await axiosInstance.get(`/product/${productId}`)
        return response
    }, 

    getProductsByCategory : async(category) => {
        const response = await axiosInstance.get(`/product/category/${category}`)
        return response
    }
}

export default productService