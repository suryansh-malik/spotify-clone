const express = require("express");
const router = express.Router();
const songcontroller = require("../controller/songs");

router.get("/song/:songid", songcontroller.getsongs);
router.get("/searchsong", songcontroller.searchsong);
module.exports = router;
