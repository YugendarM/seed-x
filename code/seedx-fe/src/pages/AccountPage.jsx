import React, { useEffect, useState } from 'react'
import ButtonComponent from '../elements/ButtonComponent'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import authService from '../api/authService'
import LinkComponent from '../elements/LinkComponent'
import { IoPower } from 'react-icons/io5'
import { BiSolidHeart, BiSolidPackage, BiSolidUser } from 'react-icons/bi'
import AccountRouter from '../routes/AccountRouter'

const AccountPage = () => {

  const {isUserLoggedIn, userProfile} = useUserContext()

  const [isLogoutLoading, setIsLogoutLoading] = useState(false)

  const navigate = useNavigate()
  const {setIsUserLoggedIn, setUserProfile} = useUserContext()

  const {pathname} = useLocation()

  const handleLogout = async(event) => {
    event.preventDefault()
    setIsLogoutLoading(true)

    try{
      const response = await authService.logout()
      setIsUserLoggedIn(false)
      setUserProfile(null)
      navigate("/")
      toast.success("Logged out successfully")
    }
    catch (error) {
      if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || "An error occurred";

          if (status === 401) {
              toast.error(message || "Unauthorized access");
          } else if (status === 500) {
              toast.error(message || "Server error, please try again later");
          } else {
              toast.error(`Error ${status}: ${message}`);
          }
      } else if (error.request) {
          toast.error("Network error. Please check your connection and try again.");
      } else {
          toast.error("Unexpected error occurred. Please try again later");
      }
    } 
    finally{
      setIsLogoutLoading(false)
    }
  }

  return (
    <div className='w-full flex justify-center bg-[#F1F3F6] h-[92vh]'>
      <div className='w-full max-w-[1200px] py-5 px-5 flex gap-[3%]'>
        <div className='w-[25%] flex flex-col gap-5 '>

          <div className='bg-white w-full flex items-center gap-3 px-3 py-2 shadow-custom-light'>
            <img className='h-14 w-14 object-cover rounded-full' w src={userProfile?.imageUrl ? userProfile.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"}/>
            <div>
              <p className='text-sm'>Hello,</p>
              <p className='font-semibold'>{userProfile?.firstName} {userProfile?.lastName}</p>
            </div>
          </div>

          <div className='bg-white w-full shadow-custom-light h-[100%] flex flex-col'>
            <LinkComponent className={`flex items-center gap-3 font-medium px-4 py-3 w-full transition ${pathname.includes("profile") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10"}`} to={"/account/profile"}>
              <BiSolidUser  className={`rounded-full text-2xl ${pathname.includes("profile") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10 text-seedxPrimaryGreen"}`}/>
              Profile
            </LinkComponent>
            <LinkComponent className={`flex items-center gap-3 font-medium px-4 py-3 w-full transition ${pathname.includes("orders") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10"}`} to={"/account/orders"}>
              <BiSolidPackage  className={`rounded-full text-2xl ${pathname.includes("orders") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10 text-seedxPrimaryGreen"}`}/>
              My Orders
            </LinkComponent>
            <LinkComponent className={`flex items-center gap-3 font-medium px-4 py-3 w-full transition ${pathname.includes("wishlist") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10"}`} to={"/account/wishlist"}>
              <BiSolidHeart  className={`rounded-full text-2xl ${pathname.includes("wishlist") ? "bg-seedxPrimaryGreen text-white" : "hover:bg-seedxTextGreen hover:bg-opacity-10 text-seedxPrimaryGreen"}`}/>
              My Wishlist
            </LinkComponent>

            {
              !userProfile.isProducer
              &&
              <div className='border-t'>
                <LinkComponent className="font-semibold text-lg px-4 py-3 hover:bg-seedxTextGreen hover:bg-opacity-10 hover:text-seedxPrimaryGreen w-full transition flex justify-center">
                  Become a Producer
                </LinkComponent>
              </div>
            }
            <div className='border-y'>
              <ButtonComponent onClick={handleLogout} className="font-semibold text-lg px-4 py-3 hover:bg-seedxTextGreen hover:bg-opacity-10 hover:text-seedxPrimaryGreen w-full transition flex justify-center">
                {
                  isLogoutLoading 
                  ? 
                    <div className='h-6 w-6 border-2 border-seedxPrimaryGreen border-t-gray-300 rounded-full animate-spin transition'/> 
                  : 
                    <p className='flex items-center gap-3 justify-center'>
                      Logout 
                      <IoPower className='text-2xl'/>
                    </p>
                }
              </ButtonComponent>
            </div>
          </div>

        </div>

        <div className='w-[72%] bg-white shadow-custom-light overflow-y-scroll'>
          <div className='h-[200vh]'>
            <AccountRouter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
