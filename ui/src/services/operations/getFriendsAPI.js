import { apiConnector } from "../apiconnector"


export const getFriendsAPI=async(setFriends,user)=>{
try{

    const response = await apiConnector(
        "POST",
        `http://localhost:4000/allFriends`,
        {email:user.email}
      );
      console.log("resojbjbk");
      setFriends(response.data.friends);

}

catch(error){
    console.log("error")
}

}
