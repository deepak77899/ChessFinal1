const user=require("../Models/User");
const searchForFriend=async (req,res)=>{
    try {
        const {usernameRegx}=req.body;
        console.log(usernameRegx);
        const users = await user.find({ username: { $regex: usernameRegx, $options: 'i' } });
        if (!users || users.length === 0) {
            return res.status(404).json({sucess:false,message:"No users found matching the search criteria."});
        }
        //todo remove sensitive info
        return res.status(200).json({sucess:true,users});
    } catch (error) {
        console.log(error);
        return res.status(401).json({sucess:false,error});
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
                return res.status(401).json({sucess:true,messgae:"request already sent"});
            }
        }else{
            return res.status(401).json({sucess:true,messgae:"already a friend"});
        }

        // Save the updated user documents
        await friend.save();
        return res.status(200).json({sucess:true,message:"request sent successfully"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({sucess:false,error});
    }
};
const getAllFriendRequests=async (req,res)=>{
    try {
        //my id,friend id
        const email=req.params.email;
        const requests = await user.findOne({email},{
            select:'requests'
        }).populate({
            path:'requests',
            select:'username email'
        });
        return res.status(200).json({sucess:true,data:requests.requests});
    } catch (error) {
        console.log(error);
        return res.status(401).json({sucess:false,error});
    }
};
const acceptRequest=async(req,res)=>{
  try {
    const {email,_id}=req.body;
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
        const {email,_id}=req.body;
    const me=await user.findOne({email});  
    const index=me.requests.indexOf(_id);
    console.log(index);
    if(index > -1){
       me.requests.splice(index, 1);
       me.save();
    }
    return res.status(200).json({success:true, message:"rejected successfully"});
    } catch (error) {
        return res.status(400).json({sucess:false,error});
    }
}
module.exports ={searchForFriend,sendFriendRequest,getAllFriendRequests,acceptRequest,rejectRequest};