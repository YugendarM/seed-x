import React, { useState } from 'react'
import ButtonComponent from '../../elements/ButtonComponent'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { RiInformation2Line } from 'react-icons/ri'
import { Image, Tooltip } from 'antd'
import ListComponent from '../../elements/ListComponent'
import ImageComponent from '../../elements/ImageComponent'

const ProductionCard = ({production}) => {

    const [isImagePalleteVisible, setIsImagePalleteVisible] = useState(false)

    const getFutureDate = (numberOfDays) => {
        const today = new Date()
        today.setDate(today.getDate() + numberOfDays)
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    const toggleImagePallete = () => {
        setIsImagePalleteVisible(prev => !prev) 
    }

  return (
    <div className='py-5 flex flex-col gap-5 border-b'>
      <div className='flex gap-5'>
        <div className='h-24 w-28'>
            <ImageComponent 
                alt={production?.product?.name} 
                src={production?.product?.imageUrls[0]}
                className='h-full w-full object-cover rounded-sm'
                preview={false}
            />
        </div>

        <div className='flex flex-col h-full w-[30%] py-2'>
            <h1 className='font-medium'>{production?.product?.name}</h1>
            <p className='text-sm text-gray-500'>Grade: {production?.productGrade}</p>
            <p className='text-sm text-seedxPrimaryGreen pt-5'>Delivery By {getFutureDate(production?.availableWithin)}</p>
        </div>

        <div className='w-[30%] flex flex-col justify-center'>
            <p className='text-sm'>Minimum Purchase Quantity: <span className='font-medium'>{production?.minimumQuantity} Kgs</span></p>
            <p className='text-sm'>Maximum Purchase Quantity: <span className='font-medium'>{production?.maximumQuantity} Kgs</span></p>
            <p className='text-sm py-3 flex gap-1'>
                Local Limit: 
                <span className='font-medium flex items-center gap-2'>
                    {production?.localLimit} Kgs 
                    <Tooltip title="Exceeding the limit requires document submission for 'Stock Verification' to confirm that the purchase is for some occasions. This is part of our 'Stock Verification' process to prevent stock accumulation for extra commission.">
                        <RiInformation2Line className='text-seedxPrimaryGreen text-lg' />
                    </Tooltip>
                </span>
            </p>
        </div>

        <div className='flex flex-col justify-center items-end w-[20%]'>
            {
                production?.product?.bestSeller 
                &&
                <p className='bg-seedxBgGreen rounded-full text-sm px-2 py-0.5'>Best Seller</p>
            }
            <p className='text-sm flex items-center gap-1 text-gray-500 '>Price: <span className='text-base text-black font-medium'>₹{production?.pricePerUnit}/kg</span></p>
            <p className='text-sm flex items-center gap-1 text-gray-500 '>Delivery Charge: <span className='text-base text-black font-medium'>₹{production?.deliveryChargePerUnit}/kg</span></p>
        </div>

        <div className='flex flex-col justify-center gap-1 items-end w-[20%]'>
            <ButtonComponent
                className={`text-white bg-seedxPrimaryGreen border border-seedxPrimaryGreen rounded-sm px-2 py-1 transition hover:text-seedxPrimaryGreen hover:bg-white hover:border-seedxPrimaryGreen`} 
            >
                Add to Cart
            </ButtonComponent>
            <ButtonComponent
                onClick={toggleImagePallete}
                className={"text-sm text-seedxPrimaryGreen flex items-center gap-1"}
            >
                View Images {isImagePalleteVisible ? <IoChevronUp/>: <IoChevronDown/>}
            </ButtonComponent>
        </div>
      </div>

      {
        isImagePalleteVisible && 
        <div className=''>
            {
                production?.imageUrls?.length > 0 
                ?
                <ListComponent
                    className={"grid grid-cols-6 gap-5"}
                    data={production?.imageUrls}
                    renderItem={(image) => (
                        <div className='overflow-hidden rounded-md'>
                            <div className='rounded-md h-44 w-44 hover:scale-105 transition'>
                                <ImageComponent
                                    className='h-full w-full object-cover '
                                    alt='production images' 
                                    src={image}
                                />
                            </div>
                        </div>
                    )}
                />
                :
                <p>No Images available</p>
            }
        </div>
      }
    </div>
  )
}

export default ProductionCard
