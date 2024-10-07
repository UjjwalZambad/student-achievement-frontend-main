import React from 'react'
import logo from "../assets/dypclg.jpg"

const Home = ({isLoggedIn}) => {
  return (
    <div className='flex items-center mt-12 text-white text-3xl h-[90vh] flex-col gap-12'>
      <div >Students Achievement Portal</div>
      <img src={logo} alt="Logo" width={900} height={100} loading="lazy" className='shadow-lg border-2 border-white'/>
    </div>
    
  )
}

export default Home;