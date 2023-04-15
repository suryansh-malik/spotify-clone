const express = require('express');
const router = express.Router()
const playlistcontroller = require('../controller/playlist')

router.get("/playlist/:playlistid", playlistcontroller.getplaylist)
module.exports = router