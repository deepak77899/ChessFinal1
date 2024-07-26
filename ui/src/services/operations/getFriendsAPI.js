import { apiConnector } from "../apiconnector"
import { setToken,setUser } from "../../slices/authSlice";

export const getFriendsAPI=async(dispatch,navigate,setFriends,user)=>{
try{

    const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/allFriends`,
        {email:user.email}
      );
      console.log("resojbjbk");
      setFriends(response.data.friends);

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
