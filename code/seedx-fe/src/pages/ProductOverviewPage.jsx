import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import productService from '../api/productService'
import productionService from '../api/productionService'
import { toast } from 'react-toastify'
import ListComponent from '../elements/ListComponent'
import ProducerCard from '../components/cards/ProducerCard'
import ProducerLoadingComponent from '../loaders/ProducerLoadingComponent'

const ProductOverviewPage = () => {

    const [productData, setProductData] = useState()
    const [producersData, setProducersData] = useState()
    const [isProductLoading, setIsProductLoading] = useState(true)
    const [isProducerLoading, setIsProducerLoading] = useState(true)

    const {productId, productName} = useParams()

    const getProductDetails = async() => {
        setIsProductLoading(true)
        try{
            const response = await productService.getProductById(productId)
            setProductData(response.data.productData)
            console.log(response)
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
            setIsProductLoading(false)
        }
    }

    const getProducerDetails = async() => {
        setIsProducerLoading(true)
        try{
            const response = await productionService.getProducersByProduct(productId)
            setProducersData(response.data.producersData)
            console.log(response)
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
            setIsProducerLoading(false)
        }
    }

    useEffect(() => {
        document.title = `${productName} | Seed'X`
        getProductDetails()
        getProducerDetails()
    }, [])

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[1200px] px-5 flex flex-col gap-5'>
        <div className='h-[450px] w-full'>
            <img 
                alt={productData?.name} 
                src={productData?.imageUrls?.[0]}
                className='h-full w-full object-cover rounded-sm'
            />
        </div>

        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <div className='leading-3'>
                    <h1 className='text-3xl font-medium'>{productData?.name}</h1>
                    <p className='text-gray-400'>{productData?.category}</p>
                </div>
                {
                    productData?.bestSeller 
                    &&
                    <p className='bg-seedxBgGreen rounded-full px-2 py-1 font-medium'>
                        Best Seller
                    </p>
                }
            </div>

            <div>
                <h1 className='text-lg text-gray-600 font-medium'>
                    Market Price: <span className='text-2xl text-black font-semibold'>₹45/kg</span>
                </h1>
                <h3 className='text-lg text-gray-600 font-medium'>
                    Average days of production: <span className='text-2xl text-black font-semibold'>30 days</span>
                </h3>
            </div>
        </div>

        <div className='py-10'>
            <h1 className='text-xl font-medium'>Producers who producer {productData?.name}</h1>
            {
                isProducerLoading
                ?
                <ProducerLoadingComponent/>
                :
                <div>
                    {
                        producersData?.length > 0 
                        ?
                            <ListComponent 
                                className={"flex flex-col gap-8"}
                                data={producersData} 
                                renderItem={(producer) => (
                                    <ProducerCard key={producer._id} producer={producer}/>
                                )}
                            />
                        :
                            <h1>No Producers producing {productData?.name}</h1>
                    }
                </div>
            }
            
        </div>
      </div>
    </div>
  )
}

export default ProductOverviewPage
