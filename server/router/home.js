const express = require('express');
const router = express.Router()
const homecontroller = require('../controller/home')
router.get("/home", homecontroller.homewithoutlogin);

module.exports  = router