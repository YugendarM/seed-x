import React from 'react'
import LinkComponent from "../../elements/LinkComponent"
import { FaStar } from 'react-icons/fa'
import defaultProfile from "../../assets/default_profile.png"

const ProducerCard = ({producer}) => {
  return (
    <LinkComponent to={`/producer/${producer.firstName}_${producer.lastName}/${producer._id}`} className='border-b border-b-gray-300 flex gap-6 hover:shadow-md transition'>
      <div className='py-3 w-[10%] flex justify-center'>
        {
          producer.image 
          ?
            <img className='rounded-full h-24 w-24 object-cover' alt={`${producer.firstName}_${producer.lastName}_profile`} src={producer.imageUrls[0]}/>
          :
            <img className='rounded-full h-24 w-24 object-cover' alt="default profile" src={defaultProfile}/>
        }
      </div>

      <div className='py-6 w-[15%]'>
        <h1 className='font-semibold text-lg'>{producer.firstName} {producer.lastName}</h1>
        <p className='text-sm font-light'>{producer?.city}, {producer?.state}</p>
        <p className='text-sm font-light'>Age: <span className='font-medium'>{producer?.age}</span></p>
      </div>
      
      <div className='py-6 w-[20%]'>
        <p>{producer?.farmSize} Acres</p>
        <p className='text-sm'>{producer?.products?.map((product) => product.name).join("|")}</p>
      </div>

      <div className='py-6 w-[25%]'>
        <p>{producer?.orders} Orders</p>
        <p className=''><span className='font-medium text-base'>{producer?.experience} years</span> of experience in farming</p>
      </div>

      <div className='py-6 flex gap-2 items-start justify-end w-[20%]'>
          {
          producer?.rating > 0 
          &&
            <p 
              className={`flex items-center gap-1 text-white rounded-sm justify-center w-10 font-medium
                ${
                  producer?.rating >= 3.5 ? "bg-green-500" 
                  : 
                    producer?.rating >= 2 && producer?.rating < 3.5 ? "bg-yellow-400" 
                  :
                    producer?.rating < 2 ? "bg-red-500"
                  :
                   "bg-red-500"
                }
                `}
            >
              {producer?.rating} 
              <FaStar className='text-lg text-white'/>
            </p>
        }
        <p className='text-seedxTextGreen font-medium'>{producer?.reviews.length} Reviews</p>
      </div>

    </LinkComponent>
  )
}

export default ProducerCard
