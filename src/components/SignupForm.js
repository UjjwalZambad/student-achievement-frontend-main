import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser ,loginUser} from "../redux/slices/authslice.js";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

 const SignupForm = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");
  const { message, stateerror } = useSelector((state) => state.auth);
  

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function accountonclick(){
    setFormData((prevData) => ({ ...prevData, accountType: "Student" }));
    setAccountType("Student");
  }
  function accountonclickadmin(){
    setFormData((prevData) => ({ ...prevData, accountType: "Admin" }));
    setAccountType("Admin");
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("Before dispatching loadUser action");
    setFormData((prevData) => ({
      ...prevData,
      accountType, // Updating accountType in the state
    }));
    console.log(formData);
   dispatch(loadUser(formData))
.then((result) => {
    console.log('Async Action Result:', result);

    if (result && result.type === loadUser.fulfilled.type) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
      setIsLoggedIn(true); 
      toast.success('Account Created');
     navigate('/dashboard');
    } else if (result && result.type === loadUser.rejected.type) {
      toast.error(result.payload);
    }
  });

}



  return (
    <div>
      <div className="flex bg-richblack-800 gap-x-1 my-6 rounded-full max-w-max p-1">
        <button
          className={`${
            accountType === "Student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={accountonclick}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "Admin"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={accountonclickadmin}
        >
          Admin
        </button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex justify-between mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="Name"
              onChange={changeHandler}
              placeholder="Enter Name"
              value={formData.Name}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />
          </label>
        </div>

        <div className="mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              value={formData.email}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <label className="relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={FormData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              name="password"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye font-size={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              value={FormData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              name="confirmPassword"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible font-size={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye font-size={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
