const songs = require('../model/songs')

exports.getsongs = async (req, res) => {
    const params = req.params
    // console.log(params.songid)
    const song = await songs.findById(params.songid);
    res.json(song)
}
exports.searchsong = async (req, res) => {
    const song = await songs.find()
    // console.log(song)
    res.status(200).json(song)

}

