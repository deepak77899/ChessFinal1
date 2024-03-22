const express = require("express");
const router = express.Router();
const {userLogin, userSignup ,userLogout}=require('../controllers/Auth');
const {searchForFriend,sendFriendRequest}=require('../controllers/makeAFriend');
const {auth}=require('../middlewares/auth');

router.post('/login', userLogin);
router.get('/',(req,res)=>{
    res.send("test");
})
router.post('/test',auth,async (req,res)=>{
    console.log("tjb");
    res.send("ti");
})
router.post('/signup', userSignup);
router.post('/logout', userLogout);
router.post('/searchforfriend', searchForFriend);
router.post('/sendfriendrequest',sendFriendRequest);
module.exports = router;