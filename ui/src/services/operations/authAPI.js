
import { apiConnector } from "../apiconnector";
import { setToken,setUser } from "../../slices/authSlice";


export const signUpAPI=async(username,email,password,navigate)=>{
 
try{
   
    const response = await apiConnector(
        "POST",
        "http://localhost:4000/Signup",
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
            "http://localhost:4000/login",
            {
        
              email,
              password
          
            }
          );
    console.log(response.data.success);
          if(response.data.success==="false") {
            console.log("error aya ");
            throw new Error("Error");
          }
          localStorage.setItem("User", JSON.stringify(response.data.User))
          dispatch(setUser(response.data.User));
          navigate('/');
          
    
    }
    catch(error){
    console.log("error");
    
    }
    
    
    
    }