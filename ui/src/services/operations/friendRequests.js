import { apiConnector } from "../apiconnector";

export const friendRequestApi=async(dispatch,navigate,email,setData)=>{
 
    try{
       //todo:
        const response = await apiConnector(
            "GET",
            `${process.env.REACT_APP_BASE_URL}/getallfriendrequests/`
          );
        //   console.log(response)
          setData(response.data.data);
      
    }
    catch(error){
        if (error.response) {
     if(error.response.status==401){
        localStorage.clear();
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate('/login');
        
     }
          }

    console.log("error");
    
    }
    }
export const acceptRequestApi=async(dispatch,navigate,email,id)=>{
 
    try{
       
        const response = await apiConnector(
            "POST",
            `${process.env.REACT_APP_BASE_URL}/acceptRequest`,
            {
                req_id:id
            }
          );
          console.log(response);      
    }
    catch(error){
        if (error.response) {
            if(error.response.status==401){
               localStorage.clear();
               dispatch(setUser(null));
               dispatch(setToken(null));
               navigate('/login');
               
            }
                 }
       
           console.log("error");
    
    }
    }
export const rejectRequestApi=async(dispatch,navigate,email,id)=>{
 
    try{
       
        const response = await apiConnector(
            "POST",
            `${process.env.REACT_APP_BASE_URL}/rejectRequest`,
            {
                req_id:id
            }
          );
          console.log(response);      
    }
    catch(error){
        
        if (error.response) {
            if(error.response.status==401){
               localStorage.clear();
               dispatch(setUser(null));
               dispatch(setToken(null));
               navigate('/login');
               
            }
                 }
       
           console.log("error");
    
    }
    }
