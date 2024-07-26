
import { apiConnector } from "../apiconnector";
import { setToken,setUser } from "../../slices/authSlice";

import {  toast } from "react-toastify";




export const signUpAPI=async(username,email,password,navigate)=>{
 
try{
   
    const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/signup`,
        {
         username,
          email,
          password
      
        }
      );

      if (!response.data.success) {
        throw new Error("Error");
      }
      navigate('/Login');
      

}
catch(error){
console.log("error");
}
}

export const loginAPI=async(email,password,navigate,dispatch)=>{
 
    try{
       
        const response = await apiConnector(
            "POST",
            `${process.env.REACT_APP_BASE_URL}/login`,
            {
              email,
              password
            }
          );
    console.log("ye hai loginAPI k andar response",response);
          if(response.data.success==="false") {
            console.log("error aya ");
            throw new Error("Error");
          }
 
          localStorage.setItem("User", JSON.stringify(response.data.User))
          localStorage.setItem("token", JSON.stringify(response.data.token))
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.User)); 

          navigate('/');
          
    
    }
    catch(error){
    console.log("error");
    
    }
    
    
    }
export const logOutApi=async(navigate,dispatch)=>{
 
    try{
        const response =  await apiConnector(
            "GET",
            `${process.env.REACT_APP_BASE_URL}/logout`,
          );
    }
    catch(error){
      toast.error("error in logout api");

    console.log("error");
    }   
    finally{
      localStorage.clear();
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate('/');
    }
   

    
    }
