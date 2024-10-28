import React, { useState } from 'react'
import signupbg from "../assets/signup-bg.jpg"
import { RiSeedlingFill } from 'react-icons/ri'
import ButtonComponent from '../elements/ButtonComponent'
import LinkComponent from '../elements/LinkComponent'
import FormInputComponent from '../elements/FormInputComponent'
import authService from '../api/authService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

const SignupPage = () => {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [isSignupLoading, setIsSignupLoading] = useState(false)

  const {setIsUserLoggedIn, setUserProfile} = useUserContext()
  const navigate = useNavigate()

  const handleSignup = async(event) => {
    event.preventDefault()
    setIsSignupLoading(true)

    try{
      const response = await authService.signup(userData)
      setIsUserLoggedIn(true)
      setUserProfile(response?.data?.userData)
      navigate("/")
      toast.success("Registered successfully")
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
      setIsSignupLoading(false)
    }
  }

  const handleOnChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className='h-[92vh] w-full relative'>
      <img alt="Seed'X-logo" className='h-full w-full' src={signupbg}/>
      <div className='absolute top-0 right-48 bg-white h-full w-[30%] border px-12 pt-5 flex flex-col justify-center'>
        <h1 className='text-seedxPrimaryGreen text-3xl font-semibold  rounded-sm py-1.5 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-4xl' />Seed'X</h1>
        <p className='text-sm'>Join us in bringing fresh, high-quality produce directly from local farmers to your table. Sign up for a seamless and transparent shopping experience that supports fair pricing and strengthens community connections.</p>
        <form className='pt-5 flex flex-col gap-3' onSubmit={handleSignup}>
            <FormInputComponent required label={"First Name"} name={'firstName'} type='text' onChange={handleOnChange} value={userData?.firstName} />
            <FormInputComponent required label={"Last Name"} name={'lastName'} type='text' onChange={handleOnChange} value={userData?.lastName} />
            <FormInputComponent required label={"Email Address"} name={'email'} type='email' onChange={handleOnChange} value={userData?.email} />
            <FormInputComponent required label={"Password"} type='password' name={'password'} onChange={handleOnChange} value={userData?.password} />
          <div className='w-full my-5'>
            {/* <ButtonComponent type='submit' className='w-full bg-seedxPrimaryGreen border border-seedxPrimaryGreen  text-white py-2 rounded-sm hover:bg-white hover:text-seedxPrimaryGreen hover:border-seedxPrimaryGreen transition'>SignUp</ButtonComponent> */}
            <ButtonComponent 
              type='submit' 
              className='group w-full flex justify-center bg-seedxPrimaryGreen border border-seedxPrimaryGreen  text-white py-2 rounded-sm hover:bg-white hover:text-seedxPrimaryGreen hover:border-seedxPrimaryGreen transition'
            >
              {
                isSignupLoading ? <div className='h-6 w-6 border-2 group-hover:border-seedxPrimaryGreen group-hover:border-t-gray-300 border-white border-t-gray-300 rounded-full animate-spin'></div> : "SignUp"
              }
            </ButtonComponent>
            <p className='text-sm text-center flex justify-center items-center gap-2'>Already have an account?
              <LinkComponent to={"/login"} className='text-seedxPrimaryGreen underline'>Login</LinkComponent>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
