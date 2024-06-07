
import { apiConnector } from "../apiconnector";
import { setToken,setUser } from "../../slices/authSlice";








export const signUpAPI=async(username,email,password,navigate)=>{
 
try{
   
    const response = await apiConnector(
        "POST",
        "http://localhost:4000/signup",
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
       
        const response = await apiConnector(
            "GET",
            "http://localhost:4000/logout",
          );
          if(response.data.success==="false") {
            console.log("error aya ");
            throw new Error("Error");
          }
          localStorage.clear();
          
          dispatch(setUser(null));
          navigate('/');
    }
    catch(error){
    console.log("error");
    
    }    
    }
