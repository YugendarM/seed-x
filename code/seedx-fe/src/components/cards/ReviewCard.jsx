import React from 'react'
import { FaStar } from 'react-icons/fa'

const ReviewCard = ({review}) => {
  return (
    <div className='flex border-b py-5 justify-between'>
      <p className='font-medium text-lg'>{review.comment}</p>
      <p 
        className={`flex items-center gap-1 text-white rounded-sm justify-center font-medium px-2 py-0.5
        ${
          review?.rating >= 3.5 ? "bg-green-500" 
          : 
          review?.rating >= 2 && review?.rating < 3.5 ? "bg-yellow-400" 
          :
          review?.rating < 2 ? "bg-red-500"
          :
          "bg-red-500"
        }
        `}
      >
        {review?.rating} 
        <FaStar className='text-lg text-white'/>
      </p>
    </div>
  )
}

export default ReviewCard
