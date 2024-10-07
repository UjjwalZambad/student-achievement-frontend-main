import React from 'react'
import logo from "../assets/dypclg.jpg"

const About = () => {
  return (
    <div className='flex justify-around mt-12 text-white text-3xl h-[80vh] w-[90vw] mx-auto flex-row gap-12'>
      <div className='flex flex-col gap-12 w-[40%]'>
        <div className='text-5xl'>About Us</div>
        <div className='text-lg'>This is Student's achievement portal where are student will be uploading their certicates related to their co-curricular, extra-currcular and technical achievements and participations.</div>
      </div>
      <img src={logo} alt="Logo" width="600px"  loading="lazy" className='shadow-lg border-2 mb-16 border-white'/>
    </div>
  )
}

export default About