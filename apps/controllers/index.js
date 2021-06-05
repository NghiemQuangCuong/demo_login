const express = require('express');
const router = express.Router();

router.get('/', require("./home"));
router.use('/admin', require("./admin"));
router.use('/blog', require('./blog'));

module.exports = router;