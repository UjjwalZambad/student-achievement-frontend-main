import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import CreateCertificate from "./pages/CreateCertificate";
import Mycertificates from "./pages/Mycertificates";
import { useEffect, useState } from 'react'
import PrivateRoute from "./components/PrivateRoute";
import Categorycertificate from "./pages/categorycertificate";
import Yearcertificate from "./pages/yearcertificate";
import AcademicYearcertificate from "./pages/Academic_year";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className="w-[100%] h-full bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>

        <Route path="/" element= {<Home/>} />
        <Route path="/about" element = {<About/>} />
        <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create" element={<CreateCertificate />} />
       
        <Route path="/dashboard" element = {
          
          <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
        </PrivateRoute>
          
        } />
        <Route path="/mycertificates" element={<Mycertificates/>}/>
        <Route path="/categorycert" element={<Categorycertificate/>}/>
        <Route path="/yearcert" element={<Yearcertificate/>}/>
        <Route path="/academicyear" element={<AcademicYearcertificate/>}/>

      </Routes>

    </div>
    )
}
export default App;
