import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import productService from '../api/productService'
import { toast } from 'react-toastify'
import productionService from '../api/productionService'
import ListComponent from '../elements/ListComponent'
import ProductCard from '../components/cards/ProductCard'
import ProducerCard from '../components/cards/ProducerCard'
import ProductsLoadingComponent from '../loaders/ProductsLoadingComponent'
import ProducerLoadingComponent from '../loaders/producerLoadingComponent'
import searchService from '../api/searchService'
import { getSocket, initiateSocketConnection } from '../utils/socketService'

const ProductsPage = () => {

    const [searchParams, setSearchParam] = useSearchParams()

    const [isProductsLoading, setIsProductsLoading] = useState(true)
    const [isProducersLoading, setIsProducersLoading] = useState(true)
    const [isRecommendationLoading, setIsRecommendationLoading] = useState(true)
    const [productResults, setProductResults] = useState([]) 
    const [producerResults, setProducerResults] = useState([])
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [cityResults, setCityResults] = useState([])

    const query = searchParams.get('query') || null
    const category = searchParams.get('category') || null

    const getProductsByCategory = async(category) => {
        setIsProductsLoading(true)
        try{
            const response = await productService.getProductsByCategory(category)
            setProductResults(response?.data?.productsData)
        }
        catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "An error occurred";
        
                if (status === 404) {
                    toast.error(message || "No products found for the category");
                } else if (status === 500) {
                    toast.error(message || "Server error, please try again later");
                } else {
                    toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error("Unexpected error occurred. Please try again later.");
            }
        } 
        finally{
            setIsProductsLoading(false)
        }
    }

    const getAllProducts = async() => {
        setIsProductsLoading(true)
        setIsRecommendationLoading(true)
        try{
            const response = await productService.getAllProducts()
            setProductResults(response?.data?.productsData)
            setRecommendedProducts(response?.data?.productsData)
        }
        catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "An error occurred";
        
                if (status === 404) {
                    toast.error(message || "No products found");
                } else if (status === 500) {
                    toast.error(message || "Server error, please try again later");
                } else {
                    toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error("Unexpected error occurred. Please try again later.");
            }
        } 
        finally{
            setIsProductsLoading(false)
            setIsRecommendationLoading(false)
        }
    }

    const getProducersByCategory = async(category) => {
        setIsProducersLoading(true)
        try{
            const response = await productionService.getProducersByCategory(category)
            setProducerResults(response?.data?.producersData)
        }
        catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "An error occurred";
        
                if (status === 404) {
                    toast.error(message || "No producers found");
                } else if (status === 500) {
                    toast.error(message || "Server error, please try again later");
                } else {
                    toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error("Unexpected error occurred. Please try again later.");
            }
        } 
        finally{
            setIsProducersLoading(false)
        }
    }

    const getAllProducers = async() => {
        setIsProducersLoading(true)
        try{
            const response = await productionService.getAllProducers()
            setProducerResults(response?.data?.producersData)
        }
        catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "An error occurred";
        
                if (status === 404) {
                    toast.error(message || "No producers found");
                } else if (status === 500) {
                    toast.error(message || "Server error, please try again later");
                } else {
                    toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error("Unexpected error occurred. Please try again later.");
            }
        } 
        finally{
            setIsProducersLoading(false)
        }
    }

    const getSearchResults = async(query) => {
        setIsProducersLoading(true)
        setIsProductsLoading(true)
        try{
            const response = await searchService.getSearchResults(query)
            setProducerResults(response?.data?.producersData)
            setProductResults(response?.data?.productsData)
        }
        catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "An error occurred";
        
                if (status === 404) {
                    toast.error(message || "No data found");
                } else if (status === 500) {
                    toast.error(message || "Server error, please try again later");
                } else {
                    toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error("Unexpected error occurred. Please try again later.");
            }
        } 
        finally{
            setIsProducersLoading(false)
            setIsProductsLoading(false)
        }
    }


    useEffect(() => {
        setProductResults([])
        setProducerResults([])
        if(category){
            getProductsByCategory(category)
            getProducersByCategory(category)
        }
        if(!category && !query){
            getAllProducts()
            getAllProducers()
        }
        if(query){
            getSearchResults(query)
        }
    }, [category, query])

    useEffect(() => {
        if(query){
            document.title = `${query} | Seed'X`
        }
        else if(category){
            document.title = `${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()} | Seed'X`
        }
        else{
            document.title = "Products | Seed'X"
        }
    }, [query, category])

    useEffect(() => {
        initiateSocketConnection()
        const socket = getSocket()

        socket.on("productAdded", (addedProduct) => {
            setProductResults((prevState) => [...prevState, addedProduct])
        })

        socket.on("productUpdated", (updatedProduct) => {
            setProductResults((prevState) => {
                return prevState.map(product => 
                    product._id === updatedProduct._id ? updatedProduct : product
                ) 
            }) 
        }) 

        socket.on("productDeleted", (deletedProduct) => {
            setProductResults((prevState) => prevState.filter((product) => product._id !== deletedProduct._id))
        })

        return () => {
            socket.disconnect()
        }
    }, [])

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[1200px] py-5 px-5'>
        <div className='results-container py-3 flex flex-col gap-10'>
            {
                (query || category)
                &&
                    <h2 className='capitalize text-lg font-medium'>Showing results for {query || category}</h2>
            }
            {
                isProductsLoading 
                ?
                <div>
                    <h2 className='text-xl font-medium py-2'>Products</h2>
                    <ProductsLoadingComponent/>
                </div>
                : 
                productResults?.length > 0 
                &&  
                    <div>
                        <h2 className='text-xl font-medium py-2'>Products</h2>
                        <div>
                            <ListComponent 
                                className={'grid md:grid-cols-4 lg:grid-cols-6 gap-6'}
                                data={productResults}
                                renderItem={(product) => (
                                    <ProductCard key={product._id} product={product}/>
                                )}
                            />
                        </div>
                    </div>
                
            }
            {
                isProducersLoading 
                ?
                <div>
                    <h2 className='text-xl font-medium py-2'>Producers</h2>
                    <ProducerLoadingComponent/>
                </div>
                :
                producerResults?.length > 0 
                &&
                    <div>
                        <h2 className='text-xl font-medium py-2'>Producers</h2>
                        <div className=''>
                            <ListComponent 
                                className={"flex flex-col gap-8"}
                                data={producerResults}
                                renderItem={(producer) => (
                                    <ProducerCard key={producer._id} producer={producer}/>
                                )}
                            />
                        </div>
                    </div>
            }
            {
                cityResults?.length > 0
                &&
                    <h2>Results in {"Chennai"}</h2>
                &&
                    <div>

                    </div>
            }
            {
                productResults?.length > 0 || producerResults?.length > 0 ||
                <p className='text-xl font-semibold py-3'>Oops! No results found :(</p>
            }
        </div>

        <div className='recommended container py-10'>
            <h2 className='text-xl font-medium py-5'>Recommended Products</h2>
            {
                isRecommendationLoading
                ?
                    <ProductsLoadingComponent/>
                :
                recommendedProducts?.length > 0 
                ?
                    <ListComponent 
                        className={'grid md:grid-cols-4 lg:grid-cols-6 gap-6'}
                        data={recommendedProducts}
                        renderItem={(product) => (
                            <ProductCard key={product._id} product={product}/>
                        )}
                    />
                :
                    <p className='text-xl font-semibold py-3'>Oops! No Recommendations found :(</p>
            }
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
