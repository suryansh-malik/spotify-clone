const user = require("../model/user");
var jwt = require("jsonwebtoken");
exports.adduser = async (req, res) => {
    // console.log(req.user)
    const adduser = await new user(req.user)
    adduser.save()
    // console.log()
    res.status(200).json("user created successfully")
};
exports.getuser = (req,res) => {
    const findeduser = req.user
    const data = {
        userid: findeduser._id,
        email: findeduser.email,
        name: findeduser.name,
        likedsongs:findeduser.likedsongs
    }
    // console.log(findeduser)
    const token = jwt.sign(data, process.env.SPOTIFY_TOKEN_KEY, {
        // 
    })
    res.status(200).json({token,findeduser})
}

exports.songliked = async(req,res) => {
    const userdata = req.data
    const body = req.body
    
    const findeduser = await user.updateOne({_id:userdata.userid},{$push:{likedsongs:body.songdata}})
    // findeduser.save()
    res.status(201).json()
}
exports.songdisliked = async (req, res) => {
  const userdata = req.data;
    const body = req.body
    console.log(body.songdata.songid)
    // console.log(userdata)
console.log("dis")
  const findeduser = await user.updateOne(
    { _id: userdata.userid },
    {$pull: { likedsongs:{ songid:body.songdata.songid} } }
  );
//   findeduser.save()56666667789km
  res.status(201).json();
};


exports.likedsongs = async(req,res) => {
    const data = req.data
    const userid = data.userid
    const findeduser = await user.findById(userid)
    const likedsongs = findeduser.likedsongs
    // console.log(likedsongs);
    res.status(200).json(likedsongs)

}
exports.likeplaylist = async (req, res) => {
  const userdata = req.userdata
  const likedplaylist = req.body.likecurrentplaylist;
  console.log(likedplaylist)
  const updateuser = user.updateOne({ _id: userdata.userid }, { $push: { likedplaylist: likedplaylist } }, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.status(201).json("playlist liked successfully");

    } 
  })
  
} 
exports.dislikeplaylist = async (req, res) => {
  const userdata = req.userdata;
  const dislikedplaylist = req.body.likecurrentplaylist.playlistid;
  console.log(dislikedplaylist);
  const updateuser = user.updateOne(
    { _id: userdata.userid },
    { $pull: { likedplaylist: { playlistid: dislikedplaylist } } },
    (err, result) => {
      if (err) {
        console.log("err");
      } else {
        res.status(201).json("playlist liked successfully");
      }
    }
  );
}; 