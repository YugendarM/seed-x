import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import defaultProfile from "../assets/default_profile.png"
import verified from "../assets/verified.png"
import productionService from '../api/productionService'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'
import { Tooltip } from 'antd'
import ButtonComponent from '../elements/ButtonComponent'
import ListComponent from '../elements/ListComponent'
import LinkComponent from '../elements/LinkComponent'
import ProducerRouter from '../routes/ProducerRouter'
import ImageComponent from '../elements/ImageComponent'

const ProducerOverviewPage = () => {

  const {producerId, producerName, ...rest} = useParams()
  const tabContext = rest['*']

  const [producerData, setProducerData] = useState({})
  const [isProducerLoading, setIsProducerLoading] = useState(true)

  const tabContextData = ["products", "photos", "reviews", "proofs"] 

  const getProducerData = async() => {
    setIsProducerLoading(true)
        try{
            const response = await productionService.getProducerById(producerId)
            setProducerData(response.data.producerData)
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
    document.title = `${producerName} | Seed'X`
    getProducerData()
  }, [])

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[1200px] px-5 py-5'>

        <div className='flex gap-10 producer_display_container'>

          <div className='w-[400px]'>
            <ImageComponent
              alt={`${producerData?.firstName}_${producerData?.lastName}_profile`} 
              src={defaultProfile}
              className=' rounded-full'
              preview={false}
            />
          </div>

          <div className='py-6 flex flex-col w-full producer_data_display_container'>
            <div className=' flex justify-between w-full producer_data_display_container_1st_row'>

              <div className='producer_basic_details_container'>
                <h1 
                  className='text-4xl font-semibold flex items-start gap-2'
                >
                  {producerData?.firstName} {producerData?.lastName}
                  {
                    producerData?.isVerifiedProducer 
                    ||
                    <Tooltip title="Verified Producer">
                      <div>
                        <ImageComponent
                          preview={false} 
                          src={verified}
                          alt='verified'
                          className='h-6'
                        />
                      </div>
                    </Tooltip>
                  }
                </h1>
                <p className='text-gray-500'>{producerData?.city}, {producerData?.state}</p>
                <p className='text-lg font-medium py-3'>{producerData?.age} years</p>
              </div>

              <div className='producer_reviews_details_container flex flex-col gap-4'>
                <div className='flex gap-2 items-start'>
                  {
                    producerData?.rating > 0 
                    &&
                      <p 
                        className={`flex items-center gap-1 text-white rounded-sm justify-center font-medium px-2 py-0.5
                        ${
                          producerData?.rating >= 3.5 ? "bg-green-500" 
                          : 
                          producerData?.rating >= 2 && producerData?.rating < 3.5 ? "bg-yellow-400" 
                          :
                          producerData?.rating < 2 ? "bg-red-500"
                          :
                          "bg-red-500"
                        }
                        `}
                    >
                      {producerData?.rating} 
                      <FaStar className='text-lg text-white'/>
                    </p>
                  }
                  <p className='text-seedxTextGreen font-medium'>{producerData?.reviews?.length} Reviews</p>
                </div>

                <p className='text-end text-xl font-medium'>{producerData?.orders} Orders</p>
              </div>
                
            </div>

            <div className='w-full producer_data_display_container_1st_row'>
              <p className='pb-3'>
                {
                  producerData?.products?.map((product) => product.name).join(" | ")
                }
              </p>
              <p className='text-gray-500'>Farm Size: <span className='text-black font-medium text-2xl'>{producerData?.farmSize} Acres</span></p>
              <p>{producerData?.experience} years of experience in farming</p>
            </div>
          </div>  

        </div>

        <div className='py-10'>
          <div className='tabs_container border-b-2 border-b-gray-200 relative'>
            <ListComponent 
              className={"flex gap-8"}
              data={tabContextData}
              renderItem={(context, index) => (
                <LinkComponent
                  to={`/producer/${producerName}/${producerId}/${context}`} 
                  state={
                    context === "photos" ? producerData?.fieldImageUrls 
                    : context === "reviews" ? producerData?.reviews
                    : producerData?.fieldImageUrls
                  }
                  key={index}
                  className={`py-4 px-4 text-xl font-medium relative transition capitalize ${
                    context === tabContext 
                      ? "text-seedxPrimaryGreen border-b-2 border-seedxPrimaryGreen -mb-0.5"
                      : "text-gray-500 bg-white"
                  }`}
                >
                  {context}
                </LinkComponent>
              )}
            />
          </div>

          <ProducerRouter/>
        </div>

      </div>
    </div>
  )
}

export default ProducerOverviewPage
