
import { useState } from 'react'

import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const { user} = useSelector((state) => state.auth);  
  console.log(user);
    return(
        <div className='flex justify-around mt-12 text-white text-xl h-[80vh] w-[90vw] mx-auto flex-row gap-12'>
      <div className='flex flex-col gap-12 w-[30%]'>
      <Link to="/mycertificates" className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            All Certificates
        </Link>
        {user && user.role === "Admin" && (
        <Link to="/yearcert" className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Certificates by Year
        </Link>)}
        {user && user.role === "Admin" && (
        <Link to="/categorycert" className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Certificates by Category
        </Link>)}
        {user && user.role === "Student" && (
        <Link to="/create"className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
           Upload new certificate
        </Link>)}
        {user && user.role === "Admin" && (
        <Link to="/academicyear"className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
           Certificates by Academic Year
        </Link>)}
     </div>
      <div classsName='w-[30%]'>
        <img src={profile}  className='w-[200px] h-[200px] rounded-md'/>
        <div className='mt-4 text-center uppercase'>{user && user.name}</div>
      </div>
    </div>
    )
   
 }

export default Dashboard;