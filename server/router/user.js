const express = require("express")
const router = express.Router();
const usercontroller = require("../controller/user")
const auth = require("../auth/auth")
router.post("/signup",auth.signupauth,usercontroller.adduser)
router.post("/login",auth.loginauth, usercontroller.getuser);
router.post("/songliked", auth.songliked, usercontroller.songliked);
router.post("/songdisliked", auth.songliked, usercontroller.songdisliked);
router.get("/likedsongs", auth.likedsongs, usercontroller.likedsongs);
router.post("/likeplaylist", auth.likeplaylist, usercontroller.likeplaylist);
router.post("/dislikeplaylist", auth.likeplaylist, usercontroller.dislikeplaylist);

module.exports = router;