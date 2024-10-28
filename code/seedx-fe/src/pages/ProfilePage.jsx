import React, { useState } from 'react'
import ButtonComponent from '../elements/ButtonComponent'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import authService from '../api/authService'

const ProfilePage = () => {

  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const navigate = useNavigate()
  const {setIsUserLoggedIn, setUserProfile} = useUserContext()

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
    <div>
      ProfilePage

      <ButtonComponent onClick={handleLogout} >
        {
          isLogoutLoading ? <div className='border border-seedxPrimaryGreen border-t-gray-300 rounded-full animate-spin'/> : "Logout"
        }
      </ButtonComponent>
    </div>
  )
}

export default ProfilePage
