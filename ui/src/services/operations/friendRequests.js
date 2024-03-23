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
        // const config={
        //       withCredentials: true
        //     };
        // axios.get("http://localhost:4000/getallfriendrequests/deepak1@gmail.com",config)
        // .then(res=>{console.log(res.data.data);
        //     setData(res.data.data);
        // })
        // .catch(err=>{console.log(err);});   
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
