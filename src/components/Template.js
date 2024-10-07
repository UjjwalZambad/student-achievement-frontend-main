import React from 'react'
import frameImage from "../assets/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from "react-icons/fc"

const Template = ({title,desc1,desc2,image,formtype,setIsLoggedIn}) => {
  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 justify-between h-screen '>
        <div className='max-w-[450px] w-full'>
            <h1
            className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'
            >{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                <span className='text-richblack-100'>{desc1}</span><br/>
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === "signup" ?
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

        

           
        </div>

        <div className='relative w-11/12 max-w-[450px] mt-6'>
            {/* <img src={frameImage}
                alt="Pattern"
                width={558}
                height={200}
                loading="lazy"
            /> */}

            <img src={image}
                alt="Students"
                width={558}
                height = {490}
                loading="lazy"
                className='absolute -top-4 right-4 '
                />
        </div>
    </div>
  )
}

export default Template