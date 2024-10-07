import React from 'react'
import logo from "../assets/dyplogo.jpg"
import { Link } from 'react-router-dom'
import { toast } from "react-hot-toast";
import { logoutUser } from '../redux/slices/authslice';
import { useDispatch,useSelector } from 'react-redux';


const Navbar = (props) => {
    const dispatch=useDispatch();
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
        <Link to='/'>
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy"/>
        </Link>

        <nav >
            <ul className='flex gap-x-6 text-white'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='#'>Contact</Link>
                </li>
            </ul>
        </nav>

        {/* Buttons */}
        <div className='flex items-center gap-x-4'>
            { !isLoggedIn &&
                <Link to='/login'>
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Login
                    </button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to='/signup'>
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Sign Up
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to='/'>
                    <button
                    className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
                     onClick={() => {
                        dispatch(logoutUser());
                        setIsLoggedIn(false);
                        toast.success("Logged Out");
                    }}>
                        Log Out
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to='/dashboard'>
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Dashboard
                    </button>
                </Link>
            }
        </div>
    </div>
  )
}

export default Navbar;