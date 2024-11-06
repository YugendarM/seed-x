import React from 'react'

const ProductsLoadingComponent = () => {
  return (
    <div className='grid grid-cols-6 gap-6'>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '></div>
        </div>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '></div>
        </div>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '> </div>
        </div>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '> </div>
        </div>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '> </div>
        </div>
        <div className=" bg-gray-50 px-3 flex flex-col gap-3 items-center rounded-md py-5 animate-pulse">
            <div className='bg-gray-200 rounded-full h-28 w-28'></div>
            <div className='rounded-md bg-gray-300 h-5 w-20 '> </div>
        </div>
    </div>
  )
}

export default ProductsLoadingComponent
