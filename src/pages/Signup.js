import React from 'react'
import Template from '../components/Template';
import signupImg from "../assets/dyp.jpg"

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
        title="Join DYP for evergreen growth mindset"
        desc1="Build skills for today, tommorow and beyond"
        desc2="Education to future-proof your career."
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup;