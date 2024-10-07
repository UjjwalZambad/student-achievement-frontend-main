import React from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authslice';

const LoginForm = ({setIsLoggedIn}) => {
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        email:"", password:""
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }

    function submitHandler(event) {
        event.preventDefault();
        
        dispatch(loginUser(formData))
.then((result) => {
    console.log('Async Action Result:', result);

    if (result && result.type === loginUser.fulfilled.type) {
        setIsLoggedIn(true); 
      toast.success('User logged in');
      navigate('/dashboard');
    } else if (result && result.type === loginUser.rejected.type) {
      toast.error(result.payload);
    }
  });
       
        
    }
  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6 '>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type="email"
                value= {FormData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name="email"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2'
            />
        </label>

        <label className='relative w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type={showPassword ? ("text") : ("password")}
                value= {FormData.password}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick = {() => setShowPassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible font-size={24} fill="#AFB2BF"/>): (<AiOutlineEye font-size={24} fill="#AFB2BF"/>)}
            </span>

            <Link to='#'>
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto '>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            sign in
        </button>
    </form>
  )
}

export default LoginForm