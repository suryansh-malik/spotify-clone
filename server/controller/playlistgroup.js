const playlistgroup = require('../model/playlistgroup')
exports.getplaylistgroup = async(req, res) => { 
    const params = req.params
    // console.log(params.playlistgroupid);
    const group = await playlistgroup.findById(params.playlistgroupid);
    // console.log(group)
    res.json(group);
}
