import { apiConnector } from "../apiconnector";
export const friendRequestApi=async(email,setData)=>{
 
    try{
       //todo:
        const response = await apiConnector(
            "GET",
            `http://localhost:4000/getallfriendrequests/${email}`
          );
        //   console.log(response)
          setData(response.data.data);
      
    }
    catch(error){
    console.log("error");
    
    }
    }
export const acceptRequestApi=async(email,id)=>{
 
    try{
       
        const response = await apiConnector(
            "POST",
            "http://localhost:4000/acceptRequest",
            {
                email,
                _id:id
            }
          );
          console.log(response);      
    }
    catch(error){
    console.log("error");
    
    }
    }
export const rejectRequestApi=async(email,id)=>{
 
    try{
       
        const response = await apiConnector(
            "POST",
            "http://localhost:4000/rejectRequest",
            {
                email,
                _id:id
            }
          );
          console.log(response);      
    }
    catch(error){
    console.log("error");
    
    }
    }
