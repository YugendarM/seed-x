import React from 'react'

const ProducerLoadingComponent = () => {
  return (
    <div>
        <div className='flex gap-6 animate-pulse'>
            <div className='py-3 w-[10%] flex justify-center'>
                <div className='rounded-full h-24 w-24 bg-gray-200'></div>
            </div>

            <div className='py-6 w-[15%] flex flex-col gap-1'>
                <div className='h-5 w-24 bg-gray-200 rounded-md'></div>
                <div className='h-4 w-32 bg-gray-200 rounded-md'></div>
                <div className='h-4 w-16 bg-gray-200 rounded-md'></div>
            </div>
            
            <div className='py-6 w-[20%] flex flex-col gap-1'>
                <div className='h-5 w-16 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-40 bg-gray-200 rounded-md'></div>
            </div>

            <div className='py-6 w-[25%] flex flex-col gap-1'>
                <div className='h-5 w-20 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-44 bg-gray-200 rounded-md'></div>
            </div>

            <div className='py-6 flex gap-2 items-start justify-end w-[20%]'>
                <div className='h-5 w-10 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-20 bg-gray-200 rounded-md'></div>
            </div>
        </div>

        <div className='flex gap-6 animate-pulse'>
            <div className='py-3 w-[10%] flex justify-center'>
                <div className='rounded-full h-24 w-24 bg-gray-200'></div>
            </div>

            <div className='py-6 w-[15%] flex flex-col gap-1'>
                <div className='h-5 w-24 bg-gray-200 rounded-md'></div>
                <div className='h-4 w-32 bg-gray-200 rounded-md'></div>
                <div className='h-4 w-16 bg-gray-200 rounded-md'></div>
            </div>
            
            <div className='py-6 w-[20%] flex flex-col gap-1'>
                <div className='h-5 w-16 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-40 bg-gray-200 rounded-md'></div>
            </div>

            <div className='py-6 w-[25%] flex flex-col gap-1'>
                <div className='h-5 w-20 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-44 bg-gray-200 rounded-md'></div>
            </div>

            <div className='py-6 flex gap-2 items-start justify-end w-[20%]'>
                <div className='h-5 w-10 bg-gray-200 rounded-md'></div>
                <div className='h-5 w-20 bg-gray-200 rounded-md'></div>
            </div>
        </div>

    </div>
  )
}

export default ProducerLoadingComponent
