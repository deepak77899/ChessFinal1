const user=require("../Models/User");
const searchForFriend=async (req,res)=>{
    try {
        const {usernameRegx}=req.body;
        console.log(usernameRegx);
        const users = await user.find({ username: { $regex: usernameRegx, $options: 'i' } });
        if (!users || users.length === 0) {
            return res.status(404).send("No users found matching the search criteria.");
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
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
        if(!friend.requests.includes(_id))
        friend.requests.push(_id);
        else{
            return res.status(401).send("request already sent");
        }

        // Save the updated user documents
        await friend.save();
        return res.status(200).send("request sent successfully");
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
};
module.exports ={searchForFriend,sendFriendRequest};