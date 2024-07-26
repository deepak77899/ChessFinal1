import { apiConnector } from "../apiconnector";
import {  toast } from "react-toastify";
export const friendRequestApi=async(email,setData)=>{
 
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
        toast.error("error in friend request");
        console.log("error");
        
    }
}
export const acceptRequestApi=async(email,id)=>{
    
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
        toast.error("error in friend request");
        console.log("error");
        
    }
    }
export const rejectRequestApi=async(email,id)=>{
 
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
        toast.error("error in friend request");
    console.log("error");
    
    }
    }
