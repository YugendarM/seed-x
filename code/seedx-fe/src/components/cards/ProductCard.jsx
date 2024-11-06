import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {

  const bg = [
    "bg-blue-200",
    "bg-pink-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-blue-200",
    "bg-pink-200",
    "bg-red-200",
    "bg-green-200",
  ]

  const randomColor = bg[(Math.random()*10).toFixed()]

  return (
    <Link to={"/products"} className={`${randomColor} bg-pink-200  bg-opacity-20 px-3 flex flex-col gap-3 items-center rounded-md py-5`}>
        {
          product?.imageUrls?.length > 0 
          ? 
            <img className='rounded-full h-28 w-28 object-cover' src={product.imageUrls}/>
          :
            <img className='rounded-full h-28 w-28 object-cover' src='https://wiratthungsong.com/wts/assets/img/default.png'/>
        }
      <h1 className='font-medium'>{product.name}</h1>
    </Link>
  )
}

export default ProductCard
