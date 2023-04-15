const mongoose = require('mongoose');

const playlistschema = mongoose.Schema({
  playlistnamme: String,
  playlistimage: String,
  playlistcolor: String,
  playlistdescription: String,
  songs: [
    {
      
      songid:String,
      songname: String,
      songsname: String,
      songurl: String,
      songsinger: String,
      songalbum: String,
      songduration: String,
      songsmallimage:String,
      songbigimage:String,
    },
  ],
});

const playlist = mongoose.model("playlist", playlistschema);
module.exports = playlist