import { server } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (formData, { rejectWithValue }) => {
    console.log("inside request");
    try {
      const response = await axios.post(
        `${server}/api/v1/signup`,
        {
          name: formData.Name,
          email: formData.email,
          password: formData.password,
          role: formData.accountType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = await response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loguser",
  async (formData, { rejectWithValue }) => {
   // console.log("inside login request");
    try {
      const response = await axios.post(
        `${server}/api/v1/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = await response.data;
     // console.log(result, "here");
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const createcertificate = createAsyncThunk(
  "createcert",
  async (formData, { rejectWithValue }) => {
    console.log("inside request");
    try {
      const response = await axios.post(
        `${server}/api/v1/createnew`,
        {
          student: formData.userId,
          certname: formData.Certificate_Name,
          yearOfCourses: formData.yearofCourse,
          AcademicYear: formData.AcademicYear,
          Category: formData.Category,
          googleDriveLink: formData.Googledrivelink,
          student_name:formData.student_name
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = await response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const logoutUser = () => {
  return { type: "auth/logoutUser" };
};

export const getcertificates = createAsyncThunk(
  "getcerts",
  async (iddata, { rejectWithValue }) => {
    console.log("inside request",iddata.studentId);
    const studentId = String(iddata.studentId);

    try {
      const response = await axios.get(`${server}/api/v1/getallcertstudent`, {
       params: { studentId:studentId }, // Use "data" instead of "params" for sending data in the request body
        withCredentials: true,
      });

      const result = await response.data;
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getcertificatesbyyear = createAsyncThunk(
  "getcertsby_year",
  async (yeardata, { rejectWithValue }) => {
    const year=yeardata.year;
    console.log(typeof year); 
    

    try {
      const response = await axios.get(`${server}/api/v1/getbyYear`, {
       params: { Year:year }, // Use "data" instead of "params" for sending data in the request body
        withCredentials: true,
      });

      const result = await response.data;
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getcertificatesbycategory = createAsyncThunk(
  "getcertsby_cat",
  async (categorydata, { rejectWithValue }) => {
    const category=categorydata.category;
    console.log(category);
    

    try {
      const response = await axios.get(`${server}/api/v1/getbycategory`, {
       params: {category:category}, // Use "data" instead of "params" for sending data in the request body
        withCredentials: true,
      });

      const result = await response.data;
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getcertificatesbyAcademic_year = createAsyncThunk(
  "getcertsby_academic_year",
  async (yeardata, { rejectWithValue }) => {
    const acedemic_year=yeardata.year;
    console.log(typeof year); 
    

    try {
      const response = await axios.get(`${server}/api/v1/getbyacademicYear`, {
       params: { AcademicYear:acedemic_year }, // Use "data" instead of "params" for sending data in the request body
        withCredentials: true,
      });

      const result = await response.data;
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getcertificatesadmin = createAsyncThunk(
  "getcertsby_admin",
  async (args, { rejectWithValue }) => {
 
    

    try {
      const response = await axios.get(`${server}/api/v1/getalladmin`, {
       // Use "data" instead of "params" for sending data in the request body
        withCredentials: true,
      });

      const result = await response.data;
      console.log("admib",result.data);
      return result.data;
    } catch (error) {
      console.log("here");

      return rejectWithValue(error.response.data.message);
    }
  }
);



const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    stateerror: null,
    loading: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.stateerror = null;
      state.allmycertificates=null;
      state.yearwisecertificates=null;
      state.categorycerts=null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        console.log("inside loaduser fulfilled",action.payload.user);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.stateerror = null;
        

      })
      .addCase(loadUser.rejected, (state, action) => {
        state.stateerror = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("inside login fulfilled");
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.stateerror = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.stateerror = action.payload;
      })
      .addCase(getcertificates.fulfilled,(state,action)=>{
        state.allmycertificates=action.payload
      })
      .addCase(getcertificates.rejected,(state,action)=>{
        state.stateerror=action.payload
      })
      .addCase(getcertificatesbyyear.fulfilled,(state,action)=>{
        state.yearwisecertificates=action.payload
      })
      .addCase(getcertificatesbyyear.rejected,(state,action)=>{
        state.stateerror=action.payload
      })
      .addCase(getcertificatesbycategory.fulfilled,(state,action)=>{
        state.categorycerts=action.payload
      })
      .addCase(getcertificatesbycategory.rejected,(state,action)=>{
        state.stateerror=action.payload
      })
      .addCase(getcertificatesadmin.fulfilled,(state,action)=>{
        state.allmycertificates=action.payload
      })
      .addCase(getcertificatesadmin.rejected,(state,action)=>{
        state.stateerror=action.payload
      })
      .addCase(getcertificatesbyAcademic_year.fulfilled,(state,action)=>{
        state.academicerts=action.payload
      })
      .addCase(getcertificatesbyAcademic_year.rejected,(state,action)=>{
        state.stateerror=action.payload
      })
  },
});
export default authslice.reducer;
