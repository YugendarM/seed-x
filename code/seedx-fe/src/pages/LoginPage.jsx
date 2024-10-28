import React, { useState } from 'react'
import loginbg from "../assets/login-bg.jpg"
import { RiSeedlingFill } from 'react-icons/ri'
import ButtonComponent from '../elements/ButtonComponent'
import LinkComponent from '../elements/LinkComponent'
import FormInputComponent from '../elements/FormInputComponent'
import authService from '../api/authService'
import useUserContext from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  })
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const {setIsUserLoggedIn, setUserProfile} = useUserContext()
  const navigate = useNavigate()

  const handleLogin = async(event) => {
    event.preventDefault()
    setIsLoginLoading(true)

    try{
      const response = await authService.login(userCredentials)
      setIsUserLoggedIn(true)
      setUserProfile(response?.data?.userData)
      navigate("/")
      toast.success("Logged in successfully")
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
          toast.error("Unexpected error occurred. Please try again later.");
      }
    } 
    finally{
      setIsLoginLoading(false)
    }
  }

  const handleOnChange = (event) => {
    setUserCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className='h-[92vh] w-full relative'>
      <img alt="Seed'X-logo" className='h-full w-full' src={loginbg}/>
      <div className='absolute top-0 right-48 bg-white h-full w-[30%] border px-12 py-20 flex flex-col justify-center'>
        <h1 className='text-seedxPrimaryGreen text-3xl font-semibold  rounded-sm py-1.5 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-4xl' />Seed'X</h1>
        <h2 className='text-4xl font-semibold text-green-900'>Welcome Back!</h2>
        <p className='text-sm'>We connect you with local farmers to provide fresh, high-quality produce, offering a seamless, transparent, and fair shopping experience from farm to table.</p>

        <form className='py-10 flex flex-col gap-6' onSubmit={handleLogin}>
            <FormInputComponent required label={"Email Address"} name={'email'} type='email' onChange={handleOnChange} value={userCredentials.email} />
            <FormInputComponent required label={"Password"} type='password' name={'password'} onChange={handleOnChange} value={userCredentials?.password} />
          <div className='w-full my-5'>
            <ButtonComponent 
              type='submit' 
              className='group w-full flex justify-center bg-seedxPrimaryGreen border border-seedxPrimaryGreen  text-white py-2 rounded-sm hover:bg-white hover:text-seedxPrimaryGreen hover:border-seedxPrimaryGreen transition'
            >
              {
                isLoginLoading ? <div className='h-6 w-6 border-2 group-hover:border-seedxPrimaryGreen group-hover:border-t-gray-300 border-white border-t-gray-300 rounded-full animate-spin'></div> : "Login"
              }
            </ButtonComponent>
            <p className='text-sm text-center flex justify-center items-center gap-2'>Don't have an account?
              <LinkComponent to={"/signup"} className='text-seedxPrimaryGreen underline'>Signup</LinkComponent>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
