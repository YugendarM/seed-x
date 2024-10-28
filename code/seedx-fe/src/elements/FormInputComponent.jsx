import React, { useState } from 'react'
import InputComponent from './InputComponent'
import { BiHide, BiShow } from 'react-icons/bi'
import ButtonComponent from './ButtonComponent'
import { useLocation } from 'react-router-dom'

const FormInputComponent = ({
    label,
    type = "text",
    onChange,
    name,
    value,
    error,
    placeholder,
    required
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const {pathname} = useLocation() 

  return (
    <div className='flex flex-col gap-2 text-sm'>
        <label className=''>Enter {label}</label>
        <div className='w-full border border-green-800 flex items-center  rounded-sm'>
            <InputComponent 
                value={value}
                required={required}
                onChange={onChange} 
                name={name} 
                type={type === 'password' ? isPasswordVisible ? 'text' : 'password' : type} 
                className='rounded-sm  focus:outline-none py-2  w-full px-3'
                placeholder={placeholder}
            />
            {
                type === 'password' &&
                <ButtonComponent type='button' onClick={handlePasswordVisibility}  className='text-2xl cursor-pointer mr-3'>
                    {
                        isPasswordVisible? <BiHide/> : <BiShow/>
                    }
                </ButtonComponent>
            }
        </div>
        {
            error &&
            <p className='text-red-500'>
                *{error}
            </p>
        }
        {
            pathname.includes("login") && type === 'password' && <a className='text-end text-xs underline'>Forgot password?</a>
        }
    </div>
  )
}

export default FormInputComponent
