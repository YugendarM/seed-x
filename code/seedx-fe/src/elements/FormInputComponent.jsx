import React, { useState } from 'react'
import InputComponent from './InputComponent'
import { BiHide, BiShow } from 'react-icons/bi'
import ButtonComponent from './ButtonComponent'

const FormInputComponent = ({
    label,
    type = "text",
    onChange,
    name,
    value,
    error,
    placeholder
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

  return (
    <div className='flex flex-col gap-2 text-sm'>
        <label className=''>Enter {label}</label>
        <div className='w-full border border-green-800 flex items-center px-3'>
            <InputComponent 
                value={value}
                required 
                onChange={onChange} 
                name={name} 
                type={type === 'password' ? isPasswordVisible ? 'text' : 'password' : type} 
                className='rounded-sm  focus:outline-none py-2  w-full'
                placeholder={placeholder}
            />
            {
                type === 'password' &&
                <ButtonComponent>
                    {
                        isPasswordVisible? <BiHide onClick={handlePasswordVisibility} className='text-2xl cursor-pointer'/> : <BiShow onClick={handlePasswordVisibility} className='text-2xl cursor-pointer'/>
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
            type === 'password' && <a className='text-end text-xs underline'>Forgot password?</a>
        }
    </div>
  )
}

export default FormInputComponent
