import { Image } from 'antd';
import React, { useState } from 'react'
import ImageLoadingComponent from '../loaders/ImageLoadingComponent';

const ImageComponent = ({ src, alt, className, preview }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true)
    };
  
    return (
      <div className={`${className}`}>
        {!isLoaded && (
            <ImageLoadingComponent/>
        )}

        <Image
            className={`w-full h-full object-cover`}
            src={src}
            alt={alt}
            width={"100%"}
            height={"100%"}
            preview={preview}
            onLoad={handleImageLoad}
        />
      </div>
    );
  };

export default ImageComponent
