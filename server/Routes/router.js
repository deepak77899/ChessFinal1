const express = require("express");
const router = express.Router();
const {userLogin, userSignup ,userLogout}=require('../controllers/Auth');
const {searchForFriend,sendFriendRequest,getAllFriendRequests,rejectRequest,acceptRequest,allFriends}=require('../controllers/makeAFriend');
const {auth}=require('../middlewares/auth');

router.post('/login', userLogin);
// router.get('/',(req,res)=>{
//     res.send("test");
// })
router.post('/test',auth,async (req,res)=>{
    console.log("tjb");
    res.send("ti");
})

//todo auth lga do
router.post('/signup', userSignup);
router.get('/logout', userLogout);
router.post('/searchforfriend',auth, searchForFriend);
router.post('/sendfriendrequest',sendFriendRequest);
router.get('/getallfriendrequests/:email',getAllFriendRequests);
router.post('/rejectRequest',rejectRequest);
router.post('/acceptRequest',acceptRequest);
router.post('/allFriends',auth,allFriends);



module.exports = router;