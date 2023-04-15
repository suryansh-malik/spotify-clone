const express = require('express');
const router = express.Router()
const groupcontroller = require("../controller/playlistgroup")


router.get("/section/:playlistgroupid", groupcontroller.getplaylistgroup)
module.exports = router
