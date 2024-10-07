import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import store from "../redux/store";
import { createcertificate } from "../redux/slices/authslice";

const CreateCertificate = () => {
  const dispatch=useDispatch();
  const { user} = useSelector((state) => state.auth);  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Certificate_Name: "",
    yearofCourse: "",
    AcademicYear: "",
    Category: "",
    Googledrivelink: "",
  });
  function submitHandler(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      userId: user._id, 
      student_name:user.name// Assuming user object has an id property
    };
    dispatch(createcertificate(updatedFormData))
    .then((result) => {
        console.log('Async Action Result:', result);
    
        if (result && result.type === createcertificate.fulfilled.type) {
             
          toast.success('Certificate submitted successfully');
          navigate('/dashboard');
        } else if (result && result.type === createcertificate.rejected.type) {
          toast.error(result.payload);
        }
      });


  }
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="flex justify-center items-center gap-4 text-white mx-auto h-screen">
      <form onSubmit={submitHandler} className="flex flex-col gap-5"> 
        <div className="flex justify-between mt-4 w-[100%]">
          <label className="min-w-[700px]">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              {" "}
              Certificate Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="Certificate_Name"
              onChange={changeHandler}
              placeholder="Enter Certificate Name"
              value={formData.Certificate_Name}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 "
            />
          </label>
        </div>

        <div className="mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Year of certificate<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="yearofCourse"
              onChange={changeHandler}
              placeholder="Enter Year of certificate completion"
              value={formData.yearofCourse}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />
          </label>
        </div>

        <div className="mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Academic year<sup className="text-pink-200">*</sup>
            </p>
            <select
              required
              type="text"
              name="AcademicYear"
              onChange={changeHandler}
              placeholder="enter academic year"
              value={formData.AcademicYear}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            >
              <option value="">Select Academic Year</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
              <option value="SE">SE</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Category<sup className="text-pink-200">*</sup>
            </p>
            <select
              required
              type="text"
              name="Category"
              onChange={changeHandler}
              placeholder="Enter category"
              value={formData.Category}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            >
              <option value="">Select Category</option>
              <option value="Co-curricular">Co-curricular</option>
              <option value="Extra-curricular">Extra-Curricular</option>

            </select>
          </label>
        </div>

        <div className="mt-4">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Google drive link<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="Googledrivelink"
              onChange={changeHandler}
              placeholder="Enter google drive link"
              value={formData.Googledrivelink}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2"
            />
          </label>
        </div>

        <div className="flex justify-between mt-4"></div>
        <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCertificate;
