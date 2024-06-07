
import { apiConnector } from "../apiconnector"
import { setToken,setUser } from "../../slices/authSlice";


export const sendReqAPI=async(item,user)=>{
    
try{

  const _id=user._id;
   const friend_id=item._id;
 
    const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/sendfriendrequest`,
        {
            _id,
            friend_id,

        }
      );
    
    
      

}
catch(error){
console.log("error");

}
}