import React, { useState } from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const CartPage = () => {

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0, // Adjust if you want decimals
    }).format(amount);
  };

  const [cartData, setCartData] = useState([
    {
      name: "Tomato",
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?cs=srgb&dl=tomato-lot-1327838.jpg&fm=jpg",
      producer: "Mariyappan M",
      quantity: "10",
      deliveryBy: "Feb 24",
      price: "34",
      totalAmount: "340",
      bestSeller: true
    },
    {
      name: "Thoor Dhal",
      image: "https://5.imimg.com/data5/VU/FW/MY-17256771/toor-dal.jpg",
      producer: "Sankar Sankar",
      quantity: "14",
      deliveryBy: "Mar 02",
      price: "84",
      totalAmount: "1176",
    },

    {
      name: "Carrot",
      image: "http://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png",
      producer: "Selvaraj S",
      quantity: "10",
      deliveryBy: "Dec 12",
      price: "65",
      totalAmount: "650",
    },
    
    {
      name: "Rice",
      image: "https://tse1.mm.bing.net/th?id=OIP.ag8a43MsHWHJja5dqDSgygHaE8&pid=Api&P=0&h=180",
      producer: "Mariyappan M",
      quantity: "12",
      deliveryBy: "Apr 24",
      price: "45",
      totalAmount: "540",
      bestSeller: true
    },
    
  ])

  return (
    <React.Fragment>
      <div className='px-5 md:px-20 lg:px-56 py-14'>
        <h1 className='text-2xl font-semibold'>Your Cart</h1>
        
        <div className='flex pt-10 pb-5'>
          <h3 className='w-[60%] text-lg font-medium'>Product</h3>
          <h3 className='w-[10%] text-lg font-medium text-center'>Price</h3>
          <h3 className='w-[20%] text-lg font-medium text-center'>Quantity</h3>
          <h3 className='w-[10%] text-lg font-medium text-center'>Total</h3>
        </div>
        <div className='flex flex-col gap-5 pb-24'>
          {
            cartData?.length > 0 && 
            cartData?.map((item, index) => (
              <div className='flex items-center' key={index}>
                <div className='w-[60%] flex justify-between'>
                  <div className='flex gap-5'>
                    <img className=' h-24 w-24 object-cover' src={item.image}/>
                    <div className=''> 
                      <p className='font-medium text-lg'>{item.name}</p>
                      <p>Producer: <span className='text-seedxPrimaryGreen underline'>{item.producer}</span></p>
                      <p className='text-sm py-3'>Delivery by {item.deliveryBy}</p>
                    </div>
                  </div>

                  <div className='flex flex-col justify-between items-end  px-10 py-5'>
                    
                    {item.bestSeller && <p className=' text-xs rounded-full px-4 py-1 bg-seedxBgGreen '>BestSeller</p> }
                    <button className=' text-seedxPrimaryGreen font-medium'>REMOVE</button>
                  </div>
                </div>
                <p className='w-[10%] text-center'>{formatRupees(item.price)}/kg</p>
                <p className='w-[20%] text-center flex gap-3 justify-center items-center'>
                  <button><CiCircleMinus  className='text-2xl'/></button>
                  {item.quantity} kg
                  <button><CiCirclePlus className='text-2xl'/></button>
                </p>
                <p className='w-[10%] text-center'>{formatRupees(item.totalAmount)}</p>
              </div>
            ))
          }
        </div>

      </div>

      <div className='bg-white z-30 fixed bottom-0 py-6 shadow-custom-medium w-full flex flex-col gap-4 items-end px-5 md:px-20 lg:px-56'>
        <h2 className='text-xl font-medium flex gap-3 items-end'>Sub total:<span className='font-semibold text-3xl'>{formatRupees(2706)}</span></h2>
        <button className='bg-seedxPrimaryGreen text-white py-2 px-12 rounded-sm'>Checkout</button>
      </div>
    </React.Fragment>
  )
}

export default CartPage



