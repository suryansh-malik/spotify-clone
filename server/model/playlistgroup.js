const mongoose = require('mongoose');

const playlistgroupschema = mongoose.Schema({
  playlistgroupname: String,
  playlists: [
    {
      playlistname: String,
      playlistimage:String,
      playlistdescription:String,
      playlistid: String
    },
  ],
});

const playlistgroup = mongoose.model("playlistgroup", playlistgroupschema)
module.exports = playlistgroup;