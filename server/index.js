const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const homeroute = require("./router/home");
const songroute = require("./router/getsong");
const playlistrouter = require("./router/playlist");
const playlistgroup = require("./router/getplaylistgroup");
const userrouter = require("./router/user");
const mongoose = require("mongoose");
app.use(express.json());
mongoose.set("strictQuery", false);
const songs = require("./model/songs");

app.use(homeroute);
app.use(songroute);
app.use(playlistrouter);
app.use(playlistgroup);
app.use(userrouter);


const songadded = {
  audiosmallimage:
    "https://i.scdn.co/image/ab67616d00004851343de887a26f66b5984d5b97",
  audiobigimage:
    "https://i.scdn.co/image/ab67616d00001e02343de887a26f66b5984d5b97",
  audiourl: "https://koshalworld.com/files/download/id/16149",
  audioname: "iktara-lofi",
};
// const song = new songs(songadded)
// song.save()
mongoose
  .connect(
    process.env.MONGODB_ATLAS_KEY
  )
  .then(() => {
    app.listen(process.env.PORT||1330, (req, res) => {
      console.log("server started");
    });
  });
