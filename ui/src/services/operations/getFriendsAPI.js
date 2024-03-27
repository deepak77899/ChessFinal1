import { apiConnector } from "../apiconnector"


const getFriendsAPI=async(setFriends,user)=>{
try{

    const response = await apiConnector(
        "GET",
        `http://localhost:4000/`
      );

}

catch(error){
    console.log("error")
}

}
