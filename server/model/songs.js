const mongoose = require("mongoose");

const songsschema = mongoose.Schema({
  songname: String,
  songurl: String,
  songsinger: String,
  songalbum: String,
  songduration: String,
  songsmallimage: String,
  songbigimage: String,
});
const songs = mongoose.model("songs", songsschema);
module.exports = songs;
