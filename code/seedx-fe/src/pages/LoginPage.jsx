import React, { useState } from 'react'
import loginbg from "../assets/login-bg.jpg"
import { RiSeedlingFill } from 'react-icons/ri'
import ButtonComponent from '../elements/ButtonComponent'
import LinkComponent from '../elements/LinkComponent'
import FormInputComponent from '../elements/FormInputComponent'

const LoginPage = () => {

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  })

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(userCredentials)
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
      <div className='absolute top-0 right-48 bg-white h-full w-[30%] border px-12 py-20'>
        <h1 className='text-seedxPrimaryGreen text-3xl font-semibold  rounded-sm py-1.5 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-4xl' />Seed'X</h1>
        <h2 className='text-4xl font-semibold text-green-900'>Welcome Back!</h2>
        <p className='text-sm'>We connect you with local farmers to provide fresh, high-quality produce, offering a seamless, transparent, and fair shopping experience from farm to table.</p>

        <form className='py-10 flex flex-col gap-6' onSubmit={handleLogin}>
            <FormInputComponent label={"Email Address"} name={'email'} type='email' onChange={handleOnChange} value={userCredentials.email} />
            <FormInputComponent label={"Password"} type='password' name={'password'} onChange={handleOnChange} value={userCredentials?.password} />
          <div className='w-full my-5'>
            <ButtonComponent type='submit' className='w-full bg-seedxPrimaryGreen border border-seedxPrimaryGreen  text-white py-2 rounded-sm hover:bg-white hover:text-seedxPrimaryGreen hover:border-seedxPrimaryGreen transition'>Login</ButtonComponent>
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
