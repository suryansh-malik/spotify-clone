const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name: String,
    
    email: String,
    password: String,
    likedsongs: [
        {
            songid: String,
            songname: String,
            songimage: String,
            songduration: String,
            songsinger: String,
            songalbum:String
        }
    ],
    likedplaylist: [
        {
            playlistname: String,
            playlistid: String,
            playlistimage: String,
            playlistdescription:String
        }
    ]
})

const user = mongoose.model("users", userschema)
module.exports = user