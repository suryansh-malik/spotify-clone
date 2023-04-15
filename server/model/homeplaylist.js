const mongoose = require("mongoose");
const playlistschema = mongoose.Schema({
    image: String,
    audios: [
        {
            image: String,
            audiourl: String,
            audioname: String,
            audiodescription:String,
        }
    ]

    
    
});

const playlist = mongoose.model("product", playlistschema);
module.exports = playlist
