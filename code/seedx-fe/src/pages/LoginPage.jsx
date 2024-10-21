import React, { useState } from 'react'
import loginbg from "../assets/login-bg.jpg"
import { RiSeedlingFill } from 'react-icons/ri'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className='h-[92vh] w-full relative'>
      <img className='h-full w-full' src={loginbg}/>
      <div className='absolute top-0 right-48 bg-white h-full w-[30%] border px-12 py-20'>
        <h1 className='text-seedxPrimaryGreen text-3xl font-semibold  rounded-sm py-1.5 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-4xl' />Seed'X</h1>
        <h2 className='text-4xl font-semibold text-green-900'>Welcome Back!</h2>
        <p className='text-sm'>We connect you with local farmers to provide fresh, high-quality produce, offering a seamless, transparent, and fair shopping experience from farm to table.</p>

        <form className='py-10 flex flex-col gap-6'>
          <div className='flex flex-col gap-2 text-sm'>
            <label className=''>Enter Email Address</label>
            <input name='email' className='rounded-sm border border-green-800 focus:outline-none py-2 px-3'/>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label className=''>Enter Password</label>
            <div className='w-full border border-green-800 flex items-center px-3'><input name='password' type={isPasswordVisible ? "text" : "password"}  className='rounded-sm  focus:outline-none py-2  w-full'/>{isPasswordVisible? <BiHide onClick={handlePasswordVisibility} className='text-2xl cursor-pointer'/> : <BiShow onClick={handlePasswordVisibility} className='text-2xl cursor-pointer'/>}</div>
            <a className='text-end text-xs underline'>Forgot password?</a>
          </div>

          <div className='w-full my-5'>
            <button type='submit' className='w-full bg-seedxPrimaryGreen border border-seedxPrimaryGreen  text-white py-2 rounded-sm hover:bg-white hover:text-seedxPrimaryGreen hover:border-seedxPrimaryGreen transition'>Login</button>
            <p className='text-sm text-center'>Don't have an account? <Link to={"/signup"} className='text-seedxPrimaryGreen underline'>Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
