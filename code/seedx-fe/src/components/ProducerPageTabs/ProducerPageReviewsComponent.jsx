import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ListComponent from '../../elements/ListComponent'
import ReviewCard from '../cards/ReviewCard'
import userService from '../../api/userService'
import { toast } from 'react-toastify'
import ReviewLoadingComponent from '../../loaders/ReviewLoadingComponent'

const ProducerPageReviewsComponent = () => {

    const {producerId} = useParams()

    const [reviewsData, setReviewsData] = useState([])
    const [isReviewsLoading, setIsReviewsLoading] = useState(true)

    const getProducerReviews = async() => {
        setIsReviewsLoading(true)
        try{
            const response = await userService.getProducerReviws(producerId)
            setReviewsData(response.data.reviewsData)
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
            setIsReviewsLoading(false)
        }
    }

    useEffect(() => {
        getProducerReviews()
    }, [])

  return (
    //todo : add users profile in the reviews
    
    <div>
        {
            isReviewsLoading 
            &&
            <ReviewLoadingComponent/>
        }
      {
        reviewsData?.length > 0
        ?
        <ListComponent 
            data={reviewsData}
            renderItem={(review, index)=> (
                <ReviewCard review={review} key={index}/>
            )}
        />
        :
        !isReviewsLoading 
        && 
        <p>No Reviews yet</p>
      }
    </div>
  )
}

export default ProducerPageReviewsComponent
