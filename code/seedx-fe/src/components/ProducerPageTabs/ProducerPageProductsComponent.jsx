import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productionService from '../../api/productionService'
import { toast } from 'react-toastify'
import ListComponent from '../../elements/ListComponent'
import ProductionCard from '../cards/ProductionCard'

const ProducerPageProductsComponent = () => {

    const {producerId} = useParams()

    const [productionsData, setProductionsData] = useState([])
    const [isProductionsLoading, setIsProductionsLoading] = useState(true)

    const getProductionsData = async() => {
        setIsProductionsLoading(true)
            try{
                const response = await productionService.getProductionsByProducer(producerId)
                setProductionsData(response?.data?.productionsData)
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
                    toast.error("Unexpected error occurred. Please try again later." + error);
                }
            } 
            finally{
              setIsProductionsLoading(false)
            }
      }

      useEffect(() => {
        getProductionsData()
      }, [])


  return (
    <div>
      <ListComponent
        className={"flex flex-col"}
        data={productionsData}
        renderItem={(production) => (
            <ProductionCard 
                production={production}
                key={production._id}
            />
        )}
      />
    </div>
  )
}

export default ProducerPageProductsComponent
