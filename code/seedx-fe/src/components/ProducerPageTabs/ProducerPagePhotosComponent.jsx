import React from 'react'
import { useLocation } from 'react-router-dom'
import ListComponent from '../../elements/ListComponent'
import ImageComponent from '../../elements/ImageComponent'

const ProducerPagePhotosComponent = () => {

    const location = useLocation()
    const fieldImageUrls = location.state
    
  return (
    <div className='py-5'>
        {
            fieldImageUrls?.length > 0
            ?
            <ListComponent 
                data={fieldImageUrls}
                className={"grid grid-cols-6 gap-6"}
                renderItem={(image, index) => (
                    <div className='overflow-hidden rounded-md' key={index}>
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
            <p>No Photos Available</p>
        }
    </div>
  )
}

export default ProducerPagePhotosComponent
