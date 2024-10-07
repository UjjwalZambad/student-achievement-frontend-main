import { AiOutlineLink } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getcertificatesbycategory } from "../redux/slices/authslice";

const Categorycertificate = () => {
  const dispatch=useDispatch();
  const {categorycerts,loading,stateerror,user}=useSelector((state) => state.auth);
  const [Category, setCategory] = useState();
  function submitHandler(event) {
    event.preventDefault();
    dispatch(getcertificatesbycategory({category:Category}))
.then((result) => {
    console.log('Async Action Result:', result);

    if (result && result.type === getcertificatesbycategory.fulfilled.type) {
    
      toast.success('Fetched certificates');
    
    } else if (result && result.type === getcertificatesbycategory.rejected.type) {
      toast.error(result.payload);
    }
  });
    

  }
  function changeHandler(event) {
    setCategory(event.target.value);
  }
  return (
    <div className="flex flex-col text-white text-xl h-screen w-[90%] mx-auto mt-12">
      <form onSubmit={submitHandler}>
        <div className="flex justify-between mb-6">
          <label className="flex gap-6 ml-6">
            <p className=" text-richblack-5 mb-1 text-2xl leading-[1.375rem]">
              Category<sup className="text-pink-200">*</sup>
            </p>
            <select
              required
              type="text"
              name="Category"
              onChange={changeHandler}
              placeholder="enter category"
              value={Category}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200px] p-[8px] border-b-2 text-sm"
            >
              <option value="Co-curricular">Co-curricular</option>
              <option value="Extra-curricular">Extra-Curricular</option>
            </select>
          </label>

          <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]">
            Submit
          </button>
        </div>
      </form>
      {categorycerts && categorycerts.length === 0 ? (
        <p className="text-xl text-richblack-5 mx-auto mt-8">No certificates to display</p>
      ) : (<table className="w-full mx-auto flex flex-col gap-12 mt-12">
      <thead>
        <tr className="flex justify-between gap-12 w-full mx-auto text-2xl text-amber-200">
        {user && user.role === "Admin" && (
                <td>Student</td>
        )}
          <th >Certificate_Name</th>
          <th>Year of Course</th>
          <th>AcademicYear</th>
         
          <th>Link</th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
      { 
      categorycerts && categorycerts.map((certificate) => (
          <tr key={certificate._id} className="flex justify-between w-full mx-auto text-xl border px-2 py-2 items-center">
            {user && user.role === "Admin" && (
                <td className="uppercase">{certificate.student_name}</td>
        )}
              
            <td className="uppercase justify-left">{certificate.certname}</td>
            <td className="justify-left">{certificate.yearOfCourses}</td>
            <td className="justify-left">{certificate.AcademicYear}</td>
            
            <td>
            <a href={certificate.googleDriveLink} target="_blank" rel="noopener noreferrer">
<AiOutlineLink />
</a>

            </td>
          </tr>
        ))}
      </tbody>
    </table>

      )}
      
    </div>
  );
};
export default Categorycertificate;
