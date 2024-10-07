import { configureStore } from '@reduxjs/toolkit';
import authreducer from "./slices/authslice.js"



const store = configureStore({
  reducer: {
    auth: authreducer,
  },
  
});



export default store;
export const server="http://localhost:4000";
//export const server="https://student-achievement-backend.onrender.com";
