const playlist = require("../model/playlist");
exports.getplaylist = async (req, res) => {
  const params = req.params;
  
    try {
        const findplaylist = await playlist.findById(params.playlistid);
        return res.status(200).json(findplaylist);
    } catch (error) {
        return res.status(404).json("something went wrong");
        
    }

};

