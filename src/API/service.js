import axios from "axios";

const API_PORT = "http://localhost:8080"

// Registration
export const Register = async(user) =>{

    console.log("port in service is : ",`${API_PORT}`);
    try {
        return await axios.post(`${API_PORT}/api/v1/auth/register`,user)
        .then((response)=> response.data)
    } catch (error) {
        console.log("Error calling Register",error);
    }
}

// LOGIN
export const loginService = async(data) =>{
   try {
    console.log("port in login is : ",API_PORT);
       return await axios.post(`${API_PORT}/api/v1/auth/login`,data)
   } catch (error) {
    console.log("Error calling login ",error);
   }
}

// update - profile
export const updateProfile = async(user)=>{
    try {
        return await axios.patch(`${process.env.API_PORT}/api/v1/update-profile`,user)
    } catch (error) {
        console.log("Error calling updateProfile");
    }
}