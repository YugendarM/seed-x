import React, { useState } from 'react'
import lander from "../assets/lander-bg-1.png"
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const HomePage = () => {

  const [categoryData, setCategoryData] = useState([
    {
      image: "https://3.bp.blogspot.com/-flHhaY9mSaw/VONbmMbuy7I/AAAAAAAAB5I/w4lIPW8M6qI/s1600/fruits4.png",
      category: "Fruits",
      bg: "bg-pink-50",
      items: 30
    },
    {
      image: "https://clipart-library.com/image_gallery2/Vegetable-PNG.png",
      category: "Vegetables",
      bg: "bg-blue-50",
      items: 30
    },
    {
      image: "https://www.aywadeal.com/wp-content/uploads/2018/12/pulses-png-8.png",
      category: "Pulses",
      bg: "bg-red-50",
      items: 30
    },
    {
      image: "https://tse3.mm.bing.net/th?id=OIP.9lXZIsfSiPA4MAdmti1GYgAAAA&pid=Api&P=0&h=180",
      category: "Cereals",
      bg: "bg-green-50",
      items: 30
    },
    {
      image: "https://png.pngtree.com/png-clipart/20231120/original/pngtree-selection-of-spices-for-christmas-and-thanksgiving-png-image_13664384.png",
      category: "Spices",
      bg: "bg-yellow-50",
      items: 30
    },
    {
      image: "https://www.pngall.com/wp-content/uploads/5/Food-Mixed-Nuts-PNG-Image.png",
      category: "Nuts",
      bg: "bg-orange-50",
      items: 30
    },
    
  ]) 
  return (
    <React.Fragment>
      <div className='w-full relative'>
        <img src={lander} className='w-full'/>
        <div className='absolute top-32 px-5 md:px-20 lg:px-56 z-20 flex flex-col gap-4 '>
          <h1 className='text-6xl font-bold max-w-[600px] '>Where Fair Prices Meet Fresh Produce</h1>
          <p className='text-2xl font-light'>Your One-Stop Marketplace for Fresh Farm Goods</p>
          <Link className='flex items-center gap-3 text-xl font-medium text-white bg-seedxPrimaryGreen w-40 justify-center rounded-full py-2 hover:bg-white hover:text-seedxPrimaryGreen transition'>Explore <FaArrowRight className='text-lg'/></Link>
        </div>
      </div>

      <div className='px-5 md:px-20 lg:px-56 py-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Explore Categories</h1>

          <div className={`grid grid-cols-6 gap-6 py-5`}>
            {
              categoryData?.length>0 && 
              categoryData?.map((category) => (
                <div className={`${category.bg} bg-pink-50 flex flex-col items-center rounded-sm py-2 px-2`}>
                  <img className='h-32 object-contain' src={category.image}/>
                  <h2 className='text-lg font-semibold text-center'>{category.category}</h2>
                  <p className='text-sm text-center'>{category.items} items</p>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default HomePage
