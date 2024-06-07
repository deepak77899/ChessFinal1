import { apiConnector } from "../apiconnector"


export const getFriendsAPI=async(setFriends,user)=>{
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
    console.log("error")
}

}
