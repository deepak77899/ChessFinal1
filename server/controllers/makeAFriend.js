const user=require("../Models/User");
const searchForFriend=async (req,res)=>{
    try {
        const {usernameRegx}=req.body;
        console.log("backend k andar");
        console.log(usernameRegx);
        const users = await user.find({ username: { $regex: usernameRegx, $options: 'i' } });
        if (!users || users.length === 0) {
            return res.status(404).json({success:false,message:"No users found matching the search criteria."});
        }
        //todo remove sensitive info
        return res.status(200).json({success:true,users});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false,error});
    }
}
const sendFriendRequest=async (req,res)=>{
    try {
        //my id,friend id
        const {_id,friend_id}=req.body;
        const friend = await user.findOne({ _id:friend_id});

        // Check if both users exist
        if (!friend) {
            throw new Error(' user not found');
        }
        if(!friend.friends.includes(_id)){
            if(!friend.requests.includes(_id))
            friend.requests.push(_id);
            else{
                return res.status(401).json({success:true,messgae:"request already sent"});
            }
        }else{
            return res.status(401).json({success:true,messgae:"already a friend"});
        }

        // Save the updated user documents
        await friend.save();
        return res.status(200).json({success:true,message:"request sent successfully"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false,error});
    }
};
const getAllFriendRequests=async (req,res)=>{
    try {
        //my id,friend id
        const email=req.body.email;
        const requests = await user.findOne({email},{
            select:'requests'
        }).populate({
            path:'requests',
            select:'username email'
        });
        return res.status(200).json({success:true,data:requests.requests});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false,error});
    }
};
const acceptRequest=async(req,res)=>{
  try {

    const {email, req_id}=req.body;
    const _id=req_idn5u
    console.log("id dekhlo",_id)
    console.log(email);
    const me=await user.findOne({email});  
    const index=me.requests.indexOf(_id);
    if(index > -1){
       me.requests.splice(index, 1);
       me.friends.push(_id);
       const friend=await user.findOne({_id:_id});
       friend.friends.push(me._id);
       me.save();
       friend.save();
    }
    return res.status(200).json({success:true, message:"accepted successfully"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({sucess:false,error});
  }
}
const rejectRequest=async(req,res)=>{
    try {
        const {email, req_id}=req.body;
        const _id=req_idn5u
    const me=await user.findOne({email});  
    const index=me.requests.indexOf(_id);
    if(index > -1){
       me.requests.splice(index, 1);
       me.save();
    }
    return res.status(200).json({success:true, message:"rejected successfully"});
    } catch (error) {
        return res.status(400).json({sucess:false,error});
    }
}

const allFriends=async(req,res)=>{
    try {
        const {email}=req.body;
        const result = await user.findOne({email}).populate({
            path:'friends',
            select:'username email'
        });  

const friends=result.friends;
    return res.status(200).json({success:true, friends});
    } catch (error) {
        return res.status(400).json({sucess:false,error});
    }
}
module.exports ={searchForFriend,sendFriendRequest,getAllFriendRequests,acceptRequest,rejectRequest,allFriends};