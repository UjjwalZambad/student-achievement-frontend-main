import { server } from '../store';
import axios from "axios";


export const loadUser = (Name,email,Password,accountType) => async (dispatch) => {
    try {
      
        const response = await axios.post(
            `${server}/api/v1/signup`,
            {
              name:Name,
              email:email,
              password:Password,
              role:accountType
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log(response);
          if (!response.ok) {
            dispatch({
              type: "loadUserFail",
              payload: response.data.message,
            });
        }
          dispatch({
            type: "setUser",
            payload: response.data.message,
          });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error recieved");
        dispatch(console.log(error.response.data.message),{
          
            type: "loadUserFail",
            payload: error.response.data.message,
        });
    } else if (error.request) {
        // The request was made but no response was received
        dispatch({
            type: "loadUserFail",
            payload: "No response from the server",
        });
    } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
            type: "loadUserFail",
            payload: "An unexpected error occurred",
        });
    }
    }
  };