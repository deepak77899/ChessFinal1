
import { apiConnector } from "../apiconnector"
import { setToken,setUser } from "../../slices/authSlice";


export const sendReqAPI=async(dispatch,navigate,item,user)=>{
    
try{
  const _id=user._id;
   const friend_id=item._id;
 
    const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/sendfriendrequest`,
        {
            friend_id,

        }
      );

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